// SERVIÇOS DE VERIFICAÇÃO DE AUTENTICAÇÃO
export const TOKEN_KEY = 'user-token'
export const ID_KEY = 'user-id'

// Obtém as chaves de autenticação armazenadas no navegador
export const getLoggedUserToken = () => {
  return localStorage.getItem(TOKEN_KEY)
}

export const getLoggedUserId = () => {
  return localStorage.getItem(ID_KEY)
}

// Adiciona o token de autenticação e o email do usuário ao armazenamento local do navegador
export const setLogin = user => {
  localStorage.setItem(TOKEN_KEY, user.token)
  localStorage.setItem(ID_KEY, user.id)
  window.location.reload()
}

// Remove as chaves de autenticação armazenadas
export const setLogout = () => {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(ID_KEY)
  window.location.reload()
}
