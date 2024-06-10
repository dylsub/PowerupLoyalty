import { getUsers } from "../../lib/users";


export default async function Home() {

 const users = await getUsers()

  return (
    <main>
      <h1>I'm a nonchalant dreadhead</h1>
      <h2>Ziad is a bum</h2>
      {users.map((user) => {
        return <h2>{user.username} - {user.id} - {user.age}</h2>
      })}
    </main>
  );
}

