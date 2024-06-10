import sql from 'better-sqlite3'

const db = sql('users.db')

// export async function getUsers() {
//     // await new Promise((resolve) => setTimeout(resolve, 2000))
//     return db.prepare(`
//     SELECT users.username, rewards.store_name, rewards.reward_points
//     FROM users
//     LEFT JOIN rewards ON users.id = rewards.user_id
//   `).all()
// }

export async function getUsersWithRewards() {
    const query = `
      SELECT users.id, users.username, rewards.store_name, rewards.reward_points
      FROM users
      LEFT JOIN rewards ON users.id = rewards.user_id
    `;
  
    const rows = db.prepare(query).all();
    
    // Process data to group rewards by user
    const usersWithRewards = rows.reduce((acc, row) => {
      const user = acc.find(user => user.id === row.id);
      if (user) {
        user.rewards[row.store_name] = row.reward_points;
      } else {
        acc.push({
          id: row.id,
          username: row.username,
          rewards: { [row.store_name]: row.reward_points }
        });
      }
      return acc;
    }, []);
  
    return usersWithRewards;
  }