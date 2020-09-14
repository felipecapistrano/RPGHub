import sqlite3
from flask import jsonify

class Note():
    def __init__(self):
        pass

    def get_notes(self, c, request):
        try:
            game_id, user_id  =  request['game_id'], request['user_id']
            c.execute('SELECT text FROM Notes WHERE game_id = ? AND user_id = ?', (game_id, user_id,))
            notes = c.fetchone()
            return jsonify(notes[0])
        except:
            return jsonify("It was not possible to get the notes"), 400

    def save_notes(self, c, request):
        try:
            game_id, user_id, text  =  request['game_id'], request['user_id'], request['text']
            c.execute('SELECT * FROM Notes WHERE game_id = ? AND user_id = ?', (game_id, user_id,))
            if c.fetchone():
                c.execute('UPDATE Notes SET text = ? WHERE game_id = ? AND user_id = ?', (text, game_id, user_id,))
            else:
                c.execute('INSERT INTO Notes VALUES (NULL, ?, ?, ?, 0)', (game_id, user_id, text,))
            return jsonify(True)
        except:
            return jsonify("It was not possible to save the notes"), 400