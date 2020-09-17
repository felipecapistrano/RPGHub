import sqlite3
from flask import jsonify

class Character():
    def __init__(self):
        pass

    def get_character(self, c, request):
        response = {"fields": []}
        id = ""
        game_id, user_id  =  request['game_id'], request['user_id']
        c.execute('SELECT name, image FROM Characters WHERE game_id = ? AND user_id = ? AND erased = 0', (game_id, user_id,))
        character = c.fetchone()
        if character:
            response["name"], response["image"] = character[0], character[1] 
        else:
            response["name"], response["image"] = "", ""
        c.execute('SELECT id, name, type FROM SheetFields WHERE game_id = ? AND erased = 0', (game_id,))
        fields = c.fetchall()
        for field in fields:
            id = field[0]
            c.execute('SELECT value FROM CharacterFields WHERE sheet_id = ? AND user_id = ?', (field[0], user_id))
            value = c.fetchone()
            if value != None:
                value = value[0]
            else:
                value = ""
            response['fields'].append({'sheet_id': field[0],'name': field[1], 'type': field[2], 'value': value})
        return jsonify(response)

    def save_character(self, c, request):
        try:
            game_id, user_id, name, image, fields  =  request['game_id'], request['user_id'], request['name'], request['image'], request['fields']
            c.execute('SELECT * FROM Characters WHERE game_id = ? AND user_id = ? AND erased = 0', (game_id, user_id,))
            character = c.fetchone()
            if character != None:
                c.execute('UPDATE Characters SET name = ?, image = ? WHERE game_id = ? AND user_id = ?', (name, image, game_id, user_id,))
            else:
                c.execute('INSERT INTO Characters VALUES(NULL, ?, ?, ?, ?, 0)', (game_id, user_id, name, image,))

            for field in fields:
                c.execute('UPDATE CharacterFields SET erased = 1 WHERE sheet_id = ?', (field['sheet_id'],))
                c.execute('INSERT INTO CharacterFields VALUES (NULL, ?, ?, ?, 0)', (field['sheet_id'], user_id, field['value'],))
            return jsonify(True)
        except:
            return jsonify("It was not possible to save the notes"), 400