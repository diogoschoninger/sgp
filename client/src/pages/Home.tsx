import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

import { getToken, getUser, setLogout } from '../services/auth';

const Home = () => {
  const [isAuth, setIsAuth] = useState(true);

  const [user, setUser] = useState<any>({});
  const [finOperations, setFinOperations] = useState<any>([]);

  async function listFinOperations() {

    fetch(`${process.env.REACT_APP_SERVER_URL}/finances/operations/list`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({
        user_id: JSON.parse(getUser() as string).id
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.statusCode) {
          if (res.statusCode === 401) {
            setLogout();
            setIsAuth(false);
            return;
          }

          return alert(res.message)
        }

        setFinOperations(res);
      })
      .catch((err) => alert(err.message));
  }

  useEffect(() => {
    setUser(JSON.parse(getUser() as string))
    listFinOperations();
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
          <tbody>
            {finOperations.length < 1 ? (
              <tr><td colSpan={3}>Nenhuma movimentação cadastrada</td></tr>
            ) : (finOperations.map((op: any) => (
              <tr key={op.id}>
                <td>{op.date}</td>
                <td>{op.description}</td>
                <td>{op.value}</td>
              </tr>
            )))}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default Home;
