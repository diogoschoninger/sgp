import { FormEvent, useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

import { setLogin } from '../services/auth';
import headers from '../services/headers';

const Login = () => {
  const [isAuth, setIsAuth] = useState<Boolean>(false);

  const [email, setEmail] = useState<String>('');
  const [password, setPassword] = useState<String>('');

  function login(event: FormEvent) {
    event.preventDefault();

    fetch(`${process.env.REACT_APP_SERVER_URL}/login`, {
      method: 'post',
      headers,
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) return alert(JSON.stringify(res));

        setLogin(res.token, res.user[0]);
        setIsAuth(true);
        alert('Usuário autenticado!');
      });
  }

  useEffect(() => {
    if (localStorage.getItem('sgp_is_authenticated') === 'true')
      setIsAuth(true);
  }, []);

  return (
    <>
      {isAuth ? <Navigate to="/" /> : null}

      <h1>Login</h1>

      <form onSubmit={(e) => login(e)}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
            required
          />
        </div>
        <div>
          <label htmlFor="password">Senha</label>
          <input
            id="password"
            type="password"
            minLength={5}
            maxLength={255}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <input type="submit" value="Acessar" />
        </div>
      </form>

      <Link to="/register">Cadastre-se</Link>
    </>
  );
};

export default Login;
