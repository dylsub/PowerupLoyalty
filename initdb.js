const sql = require('better-sqlite3');

const db = sql('users.db');




const users = [
  { username: "Dylan", rewards: { "Store A": 100, "Store B": 150 } },
  { username: "Ziad", rewards: { "Store A": 200 } },
  { username: "Dhruv", rewards: { "Store C": 250 } },
  { username: "Nick", rewards: { "Store A": 300 } },
  { username: "Sash", rewards: { "Store B": 400 } }
];


db.prepare('DROP TABLE IF EXISTS rewards').run();

db.prepare('DROP TABLE IF EXISTS users').run();


// db.prepare(`
//    CREATE TABLE IF NOT EXISTS users (
//        id INTEGER PRIMARY KEY AUTOINCREMENT,
//        username TEXT NOT NULL,
//        age INTEGER NOT NULL
//     );
// `).run();

// db.prepare(`
//     CREATE TABLE IF NOT EXISTS rewards (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       user_id INTEGER NOT NULL,
//       store_name TEXT NOT NULL,
//       reward_points INTEGER NOT NULL,
//       FOREIGN KEY (user_id) REFERENCES users (id)
//     );
//   `).run();


// async function initData() {i
//   const stmt = db.prepare(`
//       INSERT INTO users VALUES (
//          null,
//          @username,
//          @age
//       )
//    `);

//   for (const user of users) {
//     stmt.run(user);
//   }
// }

// initData();

db.prepare(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL
    );
  `).run();

  // Create rewards table
  db.prepare(`
    CREATE TABLE IF NOT EXISTS rewards (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      store_name TEXT NOT NULL,
      reward_points INTEGER NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users (id)
    );
  `).run();

  // Prepare statements
  const userStmt = db.prepare('INSERT INTO users (username) VALUES (?)');
  const rewardStmt = db.prepare('INSERT INTO rewards (user_id, store_name, reward_points) VALUES (?, ?, ?)');

  // Insert data into users and rewards table
  users.forEach(user => {
    const result = userStmt.run(user.username);
    const userId = result.lastInsertRowid;

    for (const [store, points] of Object.entries(user.rewards)) {
      rewardStmt.run(userId, store, points);
    }
  });

  console.log('Database initialized with sample data.');
