import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

import Header from '../components/Header';
import { getLoggedUser, setLogout } from '../services/auth';
import numberToBRL from '../services/numberToBRL';

export default () => {
  const [user, setUser] = useState<any>(JSON.parse(getLoggedUser() as string));

  const [finOperations, setFinOperations] = useState<any>([]);
  const [operationsLoading, setOperationsLoading] = useState<boolean>(true);

  async function listFinOperations() {
    setOperationsLoading(true);

    if (!user) return;

    await fetch(`${process.env.REACT_APP_SERVER_URL}/finances/operations`, {
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

    setOperationsLoading(false);
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

        <table>
          <thead>
            <tr>
              <th>Dia</th>
              <th>Descrição</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {operationsLoading ? (
              <tr>
                <td colSpan={3}>Carregando movimentações...</td>
              </tr>
            ) : finOperations.length < 1 ? (
              <tr>
                <td colSpan={3}>Nenhuma movimentação cadastrada</td>
              </tr>
            ) : (
              finOperations.map((op: any) => (
                <tr key={op.id}>
                  <td>{op.date}</td>
                  <td>{op.description}</td>
                  <td>{numberToBRL(op.value)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    </>
  );
};
