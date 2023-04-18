import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';

import headers from '../services/headers';

const Register = () => {
  const [name, setName] = useState<String>('');
  const [email, setEmail] = useState<String>('');
  const [password, setPassword] = useState<String>('');
  const [confirmPassword, setConfirmPassword] = useState<String>('');

  const [formSuccess, setFormSuccess] = useState<String | null>(null);
  const [formError, setFormError] = useState<String | null>(null);

  function register(event: FormEvent) {
    event.preventDefault();

    if (password !== confirmPassword)
      return setFormError('As senhas não coincidem');

    fetch(`${process.env.REACT_APP_SERVER_URL}/register`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ name, email, password }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          setFormSuccess(null);

          switch (res.error) {
            case 'ConflictError':
              setFormError('Este email já está sendo utilizado, tente outro');
              break;
            default:
              setFormError('Ocorreu um erro, tente novamente');
              console.error(res);
              break;
          }

          return;
        }

        setFormError(null);

        setFormSuccess(`Cadastro realizado`);
      })
      .catch((err) => {
        setFormSuccess(null);
        setFormError('Ocorreu um erro, tente novamente');
        console.error(err);
      });
  }
  return (
    <>
      <h1>Cadastro</h1>

      {formError ? (
        <span style={{ border: '1px solid red' }}>{formError}</span>
      ) : null}

      {formSuccess ? (
        <span style={{ border: '1px solid green' }}>
          {formSuccess as String}
        </span>
      ) : null}

      <form onSubmit={(e) => register(e)}>
        <div>
          <label htmlFor="name">Nome completo</label>
          <input
            type="text"
            id="name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirme a senha</label>
          <input
            type="password"
            id="confirmPassword"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Cadastrar</button>
        </div>
      </form>

      <Link to="/login">Fazer login</Link>
    </>
  );
};

export default Register;
