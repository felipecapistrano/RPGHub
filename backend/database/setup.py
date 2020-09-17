import sqlite3

conn = sqlite3.connect('RPGHub.db')
c = conn.cursor()

c.execute('pragma foreign_keys = on')

c.execute('''
    CREATE TABLE Users (
        id INTEGER NOT NULL,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        erased INTEGER NOT NULL,
        PRIMARY KEY (id)
    )
''')

c.execute('''
    CREATE TABLE Games(
        id TEXT NOT NULL UNIQUE,
        owner_id INTEGER NOT NULL,
        gamename TEXT NOT NULL,
        genre TEXT,
        image TEXT,
        description TEXT,
        erased INTEGER NOT NULL,
        PRIMARY KEY (id)
        FOREIGN KEY(owner_id) REFERENCES Users(id)
    )
''')

c.execute('''
    CREATE TABLE GamePermissions(
        id INTEGER NOT NULL,
        game_id INTEGER NOT NULL,
        user_id INTEGER NOT NULL,
        PRIMARY KEY (id)
        FOREIGN KEY(user_id) REFERENCES Users(id)
        FOREIGN KEY(game_id) REFERENCES Games(id)
    )
''')

c.execute('''
    CREATE TABLE SheetFields(
        id INTEGER NOT NULL,
        game_id INTEGER NOT NULL,
        type TEXT NOT NULL,
        name TEXT NOT NULL,
        erased INTEGER NOT NULL,
        PRIMARY KEY (id)
        FOREIGN KEY(game_id) REFERENCES Games(id)
    )
''')

c.execute('''
    CREATE TABLE Resources(
        id INTEGER NOT NULL,
        game_id INTEGER NOT NULL,
        name TEXT NOT NULL,
        link TEXT NOT NULL,
        erased INTEGER NOT NULL,
        PRIMARY KEY (id)
        FOREIGN KEY(game_id) REFERENCES Games(id)
    )
''')

c.execute('''
    CREATE TABLE Notes(
        id INTEGER NOT NULL,
        game_id INTEGER NOT NULL,
        user_id TEXT NOT NULL,
        text TEXT NOT NULL,
        erased INTEGER NOT NULL,
        PRIMARY KEY (id)
        FOREIGN KEY(game_id) REFERENCES Games(id)
        FOREIGN KEY(user_id) REFERENCES Users(id)
    )
''')

c.execute('''
    CREATE TABLE Characters(
        id INTEGER NOT NULL,
        game_id INTEGER NOT NULL,
        user_id TEXT NOT NULL,
        name TEXT NOT NULL,
        image TEXT NOT NULL,
        erased INTEGER NOT NULL,
        PRIMARY KEY (id)
        FOREIGN KEY(game_id) REFERENCES Games(id)
        FOREIGN KEY(user_id) REFERENCES Users(id)
    )
''')

c.execute('''
    CREATE TABLE CharacterFields(
        id INTEGER NOT NULL,
        sheet_id INTEGER NOT NULL,
        user_id TEXT NOT NULL,
        value TEXT,
        erased INTEGER NOT NULL,
        PRIMARY KEY (id)
        FOREIGN KEY(sheet_id) REFERENCES SheetFields(id)
        FOREIGN KEY(user_id) REFERENCES Users(id)
    )
''')

conn.commit()
c.close()