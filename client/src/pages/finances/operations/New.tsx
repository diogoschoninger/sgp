import { FormEvent, useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

import { getToken, getUser, setLogout } from '../../../services/auth';

export default () => {
  const [isAuth, setIsAuth] = useState(true);
  const [user, setUser] = useState<any>();

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
    fetch(`${process.env.REACT_APP_SERVER_URL}/finances/operations/payments`, {
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

        setPayments(res);
      })
      .catch((err) => console.error(err));
  }

  function listGroups() {
    fetch(`${process.env.REACT_APP_SERVER_URL}/finances/operations/groups`, {
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

        setGroups(res);
      })
      .catch((err) => console.error(err));
  }

  function listSides() {
    fetch(`${process.env.REACT_APP_SERVER_URL}/finances/operations/sides`, {
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
        Authorization: `Bearer ${getToken()}`,
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
        if (res.statusCode) {
          if (res.statusCode === 401) {
            setLogout();
            setIsAuth(false);
            return;
          }

          return alert(res.message)
        }
        alert('Movimentação cadastrada com sucesso!');
      })
      .catch((err) => alert(err.message));
  }

  useEffect(() => {
    listPayments();
    listGroups();
    listSides();

    setUser(JSON.parse(getUser() as string));
  }, []);

  return (
    <>
      {!isAuth ? <Navigate to="/login" /> : null}

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

        <button type="submit">Cadastrar</button>
      </form>
    </>
  );
};
