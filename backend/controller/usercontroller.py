import sqlite3
from flask import jsonify
import json

class User():
    def __init__(self):
        pass
    
    def create_user(self, c, request):
        try:
            username, password = request['username'], request['password']
            c.execute('INSERT INTO Users VALUES (NULL, ?, ?)', (username, password))
            c.execute('SELECT id FROM Users WHERE username = ? AND password = ?', (username, password))
            select = c.fetchone()
            response = select[0]
            return jsonify(response)
        except:
            return jsonify("Username already taken"), 400

    def get_usernames(self, c, request):
        try:
            users = []
            for id in request['ids']:
                c.execute('SELECT username FROM Users WHERE id = ?', (id,))
                select = c.fetchone()
                users.append(select[0])
            return jsonify(users)
        except:
            return jsonify("There is an id that doesn't exist in the array"), 400
    
    def login(self, c, request):
        try:
            username = request['username']
            password = request['password']
            c.execute('SELECT id FROM Users WHERE username = ? AND password = ?', (username, password))
            select = c.fetchone()
            response = select[0]
            return jsonify(response)
        except:
            return jsonify("Username and/or password are incorrect"), 400
