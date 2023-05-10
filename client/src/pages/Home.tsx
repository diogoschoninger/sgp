import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

import Header from '../components/Header';
import { getLoggedUser, setLogout } from '../services/auth';

export default () => {
  const [user, setUser] = useState<any>(JSON.parse(getLoggedUser() as string));

  const [finOperations, setFinOperations] = useState<any>([]);

  function listFinOperations() {
    if (!user) return;

    fetch(`${process.env.REACT_APP_SERVER_URL}/finances/operations`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) return setUser(null);

        setFinOperations(res);
      })
      .catch((err) => alert(err.message));
  }

  useEffect(() => {
    listFinOperations();
  }, []);

  return (
    <>
      {!user ? (
        <>
          {setLogout()}
          <Navigate to="/login" />
        </>
      ) : null}

      <Header />

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
              <tr>
                <td colSpan={3}>Nenhuma movimentação cadastrada</td>
              </tr>
            ) : (
              finOperations.map((op: any) => (
                <tr key={op.id}>
                  <td>{op.date}</td>
                  <td>{op.description}</td>
                  <td>{op.value}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    </>
  );
};
