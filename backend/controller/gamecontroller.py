import sqlite3
from flask import jsonify
import json
import random

class Game():
    def __init__(self):
        pass
    
    def __generate_id(self):
        chars = 'abcdefghijklmnopqrstuvwxyz1234567890'
        game_id = ''
        for i in range(7):
            game_id += random.choice(chars)
        return game_id

    def add_user(self, c, request):
        try:
            game_id, user_id  =  request['game_id'], request['user_id']
            c.execute('INSERT INTO GamePermissions VALUES (NULL, ?, ?)', (game_id, user_id,))
            return jsonify(True)
        except:
            return jsonify("It was not possible to join the game"), 400

    def create_game(self, c, request):
        try:
            self.__generate_id()
            owner_id, gamename, description, image = request['owner_id'], request['gamename'], request['description'], request['image']
            c.execute('INSERT INTO Games VALUES (?, ?, ?, ?, ?)', (self.__generate_id(), owner_id, gamename, image, description))
            c.execute('SELECT max(id) FROM Games')
            created = c.fetchone()
            c.execute('INSERT INTO GamePermissions VALUES(NULL, ?, ?)', (created[0], owner_id,))
            return jsonify(True)
        except:
            return jsonify("It was not possible to create the game"), 400

    def game_info(self, c, id):
        try:
            players = []
            c.execute('SELECT * FROM Games WHERE id = ?', (id,))
            select = c.fetchone()
            if select == None:
                return jsonify("Game doesn't exist"), 400
            for row in c.execute('''SELECT user_id
            FROM GamePermissions
            WHERE game_id=?''', (id,)):
                players.append(row[0])
            response = {
                'id': select[0], 
                'owner_id': select[1], 
                'gamename': select[2], 
                'image': select[3], 
                'description': select[4],
                'players': players
            }
            return jsonify(response)
        except:
            return jsonify("Game doesn't exist"), 400

    def user_games(self, c, id):
        try:
            response = []
            for row in c.execute('''SELECT * 
            FROM Games
            WHERE owner_id = ?''', (id,)):
                response.append({'id': row[0],'owner_id': row[1], 'gamename': row[2], 'image': row[3], 'description': row[4]})
            for row in c.execute('''SELECT * 
            FROM Games  
            INNER JOIN GamePermissions ON games.id=GamePermissions.game_id 
            WHERE GamePermissions.user_id = ? AND games.owner_id <> ?''', (id, id,)):
                response.append({'id': row[0],'owner_id': row[1], 'gamename': row[2], 'image': row[3], 'description': row[4]})
            return jsonify(response)
        except:
            return jsonify("The user doesn't exist"), 400