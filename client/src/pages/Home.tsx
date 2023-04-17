import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import { getToken, getUser, setLogout } from '../services/auth';

const Home = () => {
  const [isAuth, setIsAuth] = useState(true);

  const [user, setUser] = useState({} as any);

  async function testSession() {
    await fetch(`${process.env.REACT_APP_SERVER_URL}/private-route`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.statusCode === 401) {
          setLogout();
          setIsAuth(false);
          return;
        }
        setUser(JSON.parse(getUser() as string) ?? {});
        setIsAuth(true);
      });
  }

  useEffect(() => {
    testSession();
  }, []);

  return (
    <>
      {!isAuth ? <Navigate to="/login" /> : null}

      <h1>Hello</h1>

      <h2>Usuário logado</h2>
      <ul>
        <li>Nome: {user.name}</li>
        <li>Email: {user.email}</li>
      </ul>

      <button
        onClick={() => {
          setLogout();
          setIsAuth(false);
        }}
      >
        Sair
      </button>
    </>
  );
};

export default Home;
