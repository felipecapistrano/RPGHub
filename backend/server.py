import sqlite3
from flask import Flask, request, g
from flask_cors import CORS

from controller.usercontroller import User
from controller.resourcecontroller import Resource
from controller.notecontroller import Note
from controller.sheetcontroller import Sheet
from controller.charactercontroller import Character
from controller.gamecontroller import Game


app = Flask(__name__)
CORS(app)
DATABASE = 'database/RPGHub.db'

user = User()
game = Game()
resource = Resource()
note = Note()
sheet = Sheet()
character = Character()

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


#TABLE - RESOURCES
@app.route('/games/addresource', methods=['POST'])
def add_resource():
    c = get_db().cursor()
    response = resource.add_resource(c, request.json)
    get_db().commit()
    return response

@app.route('/games/resources/<game_id>', methods=['GET'])
def get_resources(game_id):
    c = get_db().cursor()
    return resource.get_resources(c, game_id)

@app.route('/games/removeresource', methods=['POST'])
def remove_resource():
    c = get_db().cursor()
    response = resource.remove_resource(c, request.json)
    get_db().commit()
    return response

#TABLE - NOTES
@app.route('/games/getnotes', methods=['POST'])
def get_notes():
    c = get_db().cursor()
    response = note.get_notes(c, request.json)
    get_db().commit()
    return response

@app.route('/games/savenotes', methods=['POST'])
def save_notes():
    c = get_db().cursor()
    response = note.save_notes(c, request.json)
    get_db().commit()
    return response

#TABLE - SHEETS
@app.route('/games/sheet/<game_id>', methods=['GET'])
def get_sheet(game_id):
    c = get_db().cursor()
    return sheet.get_sheet(c, game_id)

@app.route('/games/savesheet', methods=['POST'])
def save_sheet():
    c = get_db().cursor()
    response = sheet.save_sheet(c, request.json)
    get_db().commit()
    return response


#TABLE - CHARACTERS
@app.route('/games/getcharacter', methods=['POST'])
def get_character():
    c = get_db().cursor()
    response = character.get_character(c, request.json)
    get_db().commit()
    return response

@app.route('/games/savecharacter', methods=['POST'])
def save_character():
    c = get_db().cursor()
    response = character.save_character(c, request.json)
    get_db().commit()
    return response

#TABLE - GAMES
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