import sqlite3

conn = sqlite3.connect('RPGHub.db')
c = conn.cursor()

c.execute('pragma foreign_keys = on')

c.execute('''
    CREATE TABLE Users (
        id INTEGER NOT NULL,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        PRIMARY KEY (id)
    )
''')

c.execute('''
    CREATE TABLE Games(
        id INTEGER NOT NULL,
        owner_id INTEGER NOT NULL,
        gamename TEXT NOT NULL,
        image TEXT,
        description TEXT,
        PRIMARY KEY (id)
        FOREIGN KEY(owner_id) REFERENCES Users(id)
    )
''')

c.execute('''
    CREATE TABLE GamePermissions(
        id INTEGER NOT NULL,
        game_id INTEGER NOT NULL,
        user_id INTEGER NOT NULL,
        owner INTEGER NOT NULL,
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
        value TEXT NOT NULL,
        PRIMARY KEY (id)
        FOREIGN KEY(game_id) REFERENCES Games(id)
    )
''')

conn.commit()
c.close()