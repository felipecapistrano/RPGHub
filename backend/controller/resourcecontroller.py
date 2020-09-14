import sqlite3
from flask import jsonify

class Resource():
    def __init__(self):
        pass

    def add_resource(self, c, request):
        try:
            game_id, name, value  =  request['game_id'], request['name'], request['value']
            c.execute('INSERT INTO Resources VALUES (NULL, ?, ?, ?, 0)', (game_id, name, value,))
            return jsonify(True)
        except:
            return jsonify("It was not possible to create the resource"), 400
            
    def get_resources(self, c, id):
        try:
            resources = []
            for row in c.execute('SELECT id, name, link FROM Resources WHERE game_id = ? AND erased = 0', (id,)):
                resources.append(
                    {'id': row[0],
                     'name':row[1],
                     'link': row[2]
                    })
            return jsonify(resources)
        except:
            return jsonify('It was not possible to get the resources'), 400

    def remove_resource(self, c, request):
        try:
            id = request['id']
            c.execute('UPDATE Resources SET erased = 1 WHERE id = ?', (id,))
            return jsonify(True)
        except:
            return jsonify('An error ocurred upon trying to delete the resource.')