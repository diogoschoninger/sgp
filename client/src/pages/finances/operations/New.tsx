import { FormEvent, useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

import Error from '../../../components/Error';
import Header from '../../../components/Header';
import { getLoggedUser, setLogout } from '../../../services/auth';

export default () => {
  const [user, setUser] = useState<any>(JSON.parse(getLoggedUser() as string));

  const [error, setError] = useState<any>(null);

  const [formDate, setFormDate] = useState<any>();
  const [formDescription, setFormDescription] = useState<any>();
  const [formValue, setFormValue] = useState<any>();
  const [formPayment, setFormPayment] = useState<any>();
  const [formGroup, setFormGroup] = useState<any>();
  const [formSide, setFormSide] = useState<any>();

  const [payments, setPayments] = useState<any>();
  const [groups, setGroups] = useState<any>();
  const [sides, setSides] = useState<any>();

  function listPayments() {
    if (!user) return;

    fetch(`${process.env.REACT_APP_SERVER_URL}/finances/operations/payments`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) return setUser(null);

        setPayments(res);
      })
      .catch((err) => console.error(err));
  }

  function listGroups() {
    if (!user) return;

    fetch(`${process.env.REACT_APP_SERVER_URL}/finances/operations/groups`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) return setUser(null);

        setGroups(res);
      })
      .catch((err) => console.error(err));
  }

  function listSides() {
    if (!user) return;

    fetch(`${process.env.REACT_APP_SERVER_URL}/finances/operations/sides`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) return setUser(null);

        setSides(res);
      })
      .catch((err) => console.error(err));
  }

  function registerFinanceOperation(event: FormEvent) {
    event.preventDefault();

    fetch(`${process.env.REACT_APP_SERVER_URL}/finances/operations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        description: formDescription,
        value: formValue,
        date: formDate,
        user_owner: user.id,
        payment: Number(formPayment),
        group: Number(formGroup),
        side: Number(formSide),
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          setError(res);
          return;
        }

        alert('Movimentação cadastrada com sucesso!');
        setError(null);
      })
      .catch((err) => {
        alert('Ocorreu um erro, tente novamente');
        console.error(err);
      });
  }

  useEffect(() => {
    listPayments();
    listGroups();
    listSides();
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

      <Link to="/">Página inicial</Link>

      <form onSubmit={(e) => registerFinanceOperation(e)}>
        <div>
          <label htmlFor="date">Data</label>
          <input
            type="date"
            id="date"
            required
            onChange={(e) => setFormDate(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="description">Descrição</label>
          <input
            type="text"
            id="description"
            required
            onChange={(e) => setFormDescription(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="value">Valor</label>
          <input
            type="text"
            id="value"
            required
            onChange={(e) => setFormValue(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="payment">Forma de pagamento</label>
          <select
            id="payment"
            required
            onChange={(e) => setFormPayment(e.target.value)}
          >
            <option value="">- Selecione -</option>
            {payments?.map((payment: any) => (
              <option key={payment.id} value={payment.id}>
                {payment.description}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="group">Grupo</label>
          <select
            id="group"
            required
            onChange={(e) => setFormGroup(e.target.value)}
          >
            <option value="">- Selecione -</option>
            {groups?.map((group: any) => (
              <option key={group.id} value={group.id}>
                {group.description}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="side">Lado</label>
          <select
            id="side"
            required
            onChange={(e) => setFormSide(e.target.value)}
          >
            <option value="">- Selecione -</option>
            {sides?.map((side: any) => (
              <option key={side.id} value={side.id}>
                {side.description}
              </option>
            ))}
          </select>
        </div>

        {error ? <Error error={error} /> : null}

        <button type="submit">Cadastrar</button>
      </form>
    </>
  );
};
