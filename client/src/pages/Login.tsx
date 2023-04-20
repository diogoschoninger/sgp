import { FormEvent, useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

import { setLogin } from '../services/auth';
import headers from '../services/headers';

const Login = () => {
  const [isAuth, setIsAuth] = useState<Boolean>(false);

  const [loginError, setLoginError] = useState<String | null>(null);

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
        if (res.error) {
          switch (res.error) {
            case 'ValidationError':
              setLoginError(res.message);
              break;
            case 'AuthenticationError':
              setLoginError(res.cause);
              break;
          }
          return;
        }

        setLoginError(null);

        setLogin(res.token, res.user);
        setIsAuth(true);
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

      {loginError ? (
        <div style={{ border: '1px solid red' }}>{loginError}</div>
      ) : null}

      <form onSubmit={(e) => login(e)}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
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
