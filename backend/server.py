import sqlite3
from flask import Flask, request, g
from flask_cors import CORS

from controller.usercontroller import User
from controller.gamecontroller import Game


app = Flask(__name__)
CORS(app)
DATABASE = 'database/RPGHub.db'

user = User()
game = Game()


def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    return db

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()


#TABLE - USERS
@app.route('/register', methods=['POST'])
def create_user():
    c = get_db().cursor()
    response = user.create_user(c, request.json)
    get_db().commit()
    return response

@app.route('/usernames', methods=['POST'])
def get_users():
    c = get_db().cursor()
    response = user.get_usernames(c, request.json)
    return response

@app.route('/login', methods=['POST'])
def login():
    c = get_db().cursor()
    return user.login(c, request.json)


#TABLE - GAMES
@app.route('/games/addresource', methods=['POST'])
def add_resource():
    c = get_db().cursor()
    response = game.add_resource(c, request.json)
    get_db().commit()
    return response

@app.route('/games/adduser', methods=['POST'])
def add_user():
    c = get_db().cursor()
    response = game.add_user(c, request.json)
    get_db().commit()
    return response

@app.route('/games/create', methods=['POST'])
def create_game():
    c = get_db().cursor()
    response = game.create_game(c, request.json)
    get_db().commit()
    return response

@app.route('/<game_id>', methods=['GET'])
def game_info(game_id):
    c = get_db().cursor()
    return game.game_info(c, game_id)

@app.route('/games/<user_id>', methods=['GET'])
def user_games(user_id):
    c = get_db().cursor()
    return game.user_games(c, user_id)