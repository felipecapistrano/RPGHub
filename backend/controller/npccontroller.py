import sqlite3
from flask import jsonify

class Npc():
    def __init__(self):
        pass

    def get_npcs(self, c, request):
        response = []
        counter = 0
        game_id = request['game_id']
        c.execute('SELECT id, name, image FROM Npcs WHERE game_id = ? AND erased = 0', (game_id,))
        npcs = c.fetchall()
        for npc in npcs:
            print(counter)
            response.append({'game_id': game_id,'id': npc[0],'name': npc[1], 'image': npc[2], 'fields': []})
            c.execute('SELECT id, name, type FROM SheetFields WHERE game_id = ? AND erased = 0', (game_id,))
            fields = c.fetchall()
            for field in fields:
                c.execute('SELECT value FROM NpcFields WHERE sheet_id = ? AND npc_id = ?', (field[0], npc[0]))
                value = c.fetchone()
                if value != None:
                    value = value[0]
                else:
                    value = ""
                response[counter]['fields'].append({'sheet_id': field[0],'name': field[1], 'type': field[2], 'value': value})
            counter += 1
        return jsonify(response)

    def save_npc(self, c, request):
        id, game_id, name, image, fields  =  request['id'], request['game_id'], request['name'], request['image'], request['fields']
        c.execute('SELECT * FROM Npcs WHERE id = ? AND erased = 0', (id,))
        character = c.fetchone()
        if character != None:
            c.execute('UPDATE Npcs SET name = ?, image = ? WHERE id = ?', (name, image, id, ))
        else:
            c.execute('INSERT INTO Npcs VALUES(NULL, ?, ?, ?, 0)', (game_id, name, image,))
            c.execute('SELECT id FROM Npcs WHERE id = (SELECT MAX(id) FROM Npcs)')
            new_id = c.fetchone()
            id = new_id[0]

        for field in fields:
            print(id)
            c.execute('UPDATE NpcFields SET erased = 1 WHERE sheet_id = ?', (field['sheet_id'],))
            c.execute('INSERT INTO NpcFields VALUES (NULL, ?, ?, ?, 0)', (field['sheet_id'], id, field['value'],))
        return jsonify(True)
