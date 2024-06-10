import sql from 'better-sqlite3'

const db = sql('users.db')

export async function getUsers() {
    // await new Promise((resolve) => setTimeout(resolve, 2000))
    return db.prepare('SELECT * from users').all()
}
