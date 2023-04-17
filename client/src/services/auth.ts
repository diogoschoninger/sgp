export const getToken = () => localStorage.getItem('sgp_token');

export const setLogin = (token: string, user: any) => {
  localStorage.setItem('sgp_token', token);
  localStorage.setItem('sgp_user', JSON.stringify(user));
  localStorage.setItem('sgp_is_authenticated', 'true');
};

export const setLogout = () => {
  localStorage.removeItem('sgp_token');
  localStorage.removeItem('sgp_user');
  localStorage.removeItem('sgp_is_authenticated');
};

export const getUser = () => localStorage.getItem('sgp_user');
