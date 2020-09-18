import sqlite3
from flask import jsonify

class Sheet():
    def __init__(self):
        pass

    def get_sheet(self, c, id):
        try:
            sheet = []
            for row in c.execute('SELECT id, name, type FROM SheetFields WHERE game_id = ? AND erased = 0', (id,)):
                sheet.append({'sheet_id': row[0],'name': row[1], 'type': row[2]})
            return jsonify(sheet)
        except:
            return jsonify("It was not possible to get the sheet"), 400

    def save_sheet(self, c, request):
        try:
            game_id = request['game_id']
            fields = {}
            c.execute('UPDATE SheetFields SET erased = 1 WHERE game_id = ?', (game_id,))
            for field in request['fields']:
                c.execute('INSERT INTO SheetFields VALUES (NULL, ?, ?, ?, 0)', (game_id, field['type'], field['name'],))
            return jsonify(True)
        except:
            return jsonify("It was not possible to save the fields"), 400