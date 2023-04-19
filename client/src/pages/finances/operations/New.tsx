import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import { getToken, setLogout } from '../../../services/auth';

const New = () => {
  const [isAuth, setIsAuth] = useState(true);

  const [groups, setGroups] = useState<any>();

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

  useEffect(() => {
    listGroups();
  }, []);

  return (
    <>
      {!isAuth ? <Navigate to="/login" /> : null}

      <form>
        <div>
          <label htmlFor="date">Data</label>
          <input type="date" id="date" />
        </div>

        <div>
          <label htmlFor="description">Descrição</label>
          <input type="text" id="description" />
        </div>

        <div>
          <label htmlFor="value">Valor</label>
          <input type="text" id="value" />
        </div>

        <div>
          <label htmlFor="group">Grupo</label>
          <select id="group">
            {groups?.map((group: any) => (
              <option key={group.id} value={group.description}>
                {group.description}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="side">Lado</label>
          <input type="text" id="side" />
        </div>
      </form>
    </>
  );
};

export default New;
