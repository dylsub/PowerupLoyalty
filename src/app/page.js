import { getUsersWithRewards } from "../../lib/users";

export default async function Home() {
  const usersWithRewards = await getUsersWithRewards();
//  const users = await getUsers()

  // return (
  //   <main>
  //     <h1>I'm a nonchalant dreadhead</h1>
  //     <h2>Ziad is a bum</h2>
  //     {users.map((user) => {
  //       return <h2>{user.username} - {user.id} - {user.age}</h2>
  //     })}
  //   </main>
  // );
  return (
    <main>
      <h1>I'm a nonchalant dreadhead</h1>
      <h2>Ziad is a bum</h2>
      {usersWithRewards.map((user) => (
        <div key={user.id}>
          <h2>{user.username} -</h2>
          <ul>
            {Object.entries(user.rewards).map(([store, points]) => (
              <li key={store}>{store}: {points} points</li>
            ))}
          </ul>
        </div>
      ))}
    </main>
  );

}

