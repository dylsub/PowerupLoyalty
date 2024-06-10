const sql = require('better-sqlite3');
const db = sql('users.db');

const users = [
  {
   id: 1,
   username: "Dylan",
   age: 19
  },
  {
   id: 2,
   username: "Ziad",
   age: 20
  },
  {
   id: 3,
   username: "Dhruv",
   age: 21
  },
  {
   id: 4,
   username: "Pedro",
   age: 21
  },
  {
   id: 5,
   username: "Sash",
   age: 21
  }


];

db.prepare(`
   CREATE TABLE IF NOT EXISTS users (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       username TEXT NOT NULL,
       age INTEGER NOT NULL
    )
`).run();

async function initData() {
  const stmt = db.prepare(`
      INSERT INTO users VALUES (
         null,
         @username,
         @age
      )
   `);

  for (const user of users) {
    stmt.run(user);
  }
}

initData();
