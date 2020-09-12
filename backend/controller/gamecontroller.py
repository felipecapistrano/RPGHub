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

    def add_resource(self, c, request):
        try:
            game_id, name, value  =  request['game_id'], request['name'], request['value']
            c.execute('INSERT INTO Resources VALUES (NULL, ?, ?, ?)', (game_id, name, value,))
            return jsonify(True)
        except:
            return jsonify("It was not possible to create the resource"), 400

    def create_game(self, c, request):
        try:
            id = self.__generate_id()
            owner_id, gamename, genre, description, image = request['owner_id'], request['gamename'], request['genre'], request['description'], request['image']
            c.execute('INSERT INTO Games VALUES (?, ?, ?, ?, ?, ?)', (id, owner_id, gamename, genre, image, description))
            c.execute('INSERT INTO GamePermissions VALUES(NULL, ?, ?)', (id, owner_id,))
            return jsonify(True)
        except:
            return jsonify("It was not possible to create the game"), 400

    def game_info(self, c, id):
        try:
            player_ids = []
            player_names = []
            resources = {}
            c.execute('SELECT * FROM Games WHERE id = ?', (id,))
            info = c.fetchone()

            if info == None:
                return jsonify("Game doesn't exist"), 400

            for row in c.execute('SELECT name, value FROM Resources WHERE game_id = ?', (id,)):
                resources[row[0]] = row[1]

            for row in c.execute('''SELECT Users.id, Users.username
            FROM Users
            INNER JOIN GamePermissions ON Users.id=GamePermissions.user_id
            WHERE game_id=?''', (id,)):
                player_ids.append(row[0])
                player_names.append(row[1])

            response = {
                'id': info[0], 
                'owner_id': info[1], 
                'gamename': info[2], 
                'genre': info[3],
                'image': info[4], 
                'description': info[5],
                'resources': resources,
                'player_ids': player_ids,
                'player_names': player_names
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
                response.append({'id': row[0],'owner_id': row[1], 'gamename': row[2], 'genre': row[3], 'image': row[4], 'description': row[5]})
            for row in c.execute('''SELECT * 
            FROM Games  
            INNER JOIN GamePermissions ON games.id=GamePermissions.game_id 
            WHERE GamePermissions.user_id = ? AND games.owner_id <> ?''', (id, id,)):
                response.append({'id': row[0],'owner_id': row[1], 'gamename': row[2], 'genre': row[3], 'image': row[4], 'description': row[5]})
            return jsonify(response)
        except:
            return jsonify("The user doesn't exist"), 400