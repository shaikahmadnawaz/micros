import { useEffect, useState } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_USERS_SERVER_URL}/api/users`)
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <div>
      <h2>This is users microfrontend</h2>
      <ul>
        <li>This data is from users microservice</li>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
