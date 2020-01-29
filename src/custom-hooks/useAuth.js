import React from 'react';
import { getFromDatabase, saveToDatabase } from '../database';

const useAuth = () => {
  const [userId, setUserId] = React.useState(null);
  const [users, setUsers] = React.useState(null);

  React.useEffect(() => {
    getUsers();
  }, []);

  const connect = (username) => {
    saveToDatabase(`/users/${username}`, true);
    setUserId(username);
  }

  const getUsers = () => {
    getFromDatabase('/users', res => {
      setUsers(Object.keys(res))
    })
  }

  return [userId, users, connect];
}

export default useAuth;


