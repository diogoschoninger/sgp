import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

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

      <header style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1>SGP</h1>

        <div style={{ display: 'flex' }}>
          <div>
            <li>Nome: {user.name}</li>
            <li>Email: {user.email}</li>
          </div>

          <button
            onClick={() => {
              setLogout();
              setIsAuth(false);
            }}
          >
            Sair
          </button>
        </div>
      </header>

      <section>
        <h2>Extrato</h2>

        <div>
          <Link to="/finances/operations/new">Nova movimentação</Link>
        </div>

        <table>
          <thead>
            <tr>
              <th>Dia</th>
              <th>Descrição</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </section>
    </>
  );
};

export default Home;
