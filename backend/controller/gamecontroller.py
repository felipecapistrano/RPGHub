import sqlite3
from flask import jsonify
import json

class Game():
    def __init__(self):
        pass
    
    def create_game(self, c, request):
        try:
            owner_id, gamename = request['owner_id'], request['gamename']
            c.execute('INSERT INTO Games VALUES (NULL, ?, ?)', (owner_id, gamename))
            return jsonify(True)
        except:
            return jsonify("It was not possible to create the game"), 400

    def game_info(self, c, id):
        try:
            c.execute('SELECT * FROM Games WHERE id = ?', (id,))
            select = c.fetchone()
            response = {'id': select[0], 'owner_id': select[1], 'gamename': select[2]}
            return jsonify(response)
        except:
            return jsonify("Game doesn't exist"), 400

    def user_games(self, c, id):
        try:
            response = []
            for row in c.execute('''SELECT games.owner_id, games.gamename, games.image, games.description
            FROM Games  
            INNER JOIN GamePermissions ON games.id=GamePermissions.game_id 
            WHERE GamePermissions.user_id = ?''', (id,)):
                response.append({'owner_id': row[0], 'gamename': row[1], 'image': row[2], 'description': row[3]})
            return jsonify(response)
        except:
            return jsonify("The user doesn't exist"), 400