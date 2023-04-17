import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import { setLogin } from '../services/auth';

const Login = () => {
  const [isAuth, setIsAuth] = useState(Boolean);

  const [loginError, setLoginError] = useState(String);

  const [email, setEmail] = useState(String);
  const [password, setPassword] = useState(String);

  function login() {
    fetch(`${process.env.REACT_APP_SERVER_URL}/login`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) return setLoginError(res.message);

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

      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Senha</label>
          <input
            id="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <input type="submit" value="Acessar" onClick={() => login()} />
        </div>
      </form>
    </>
  );
};

export default Login;
