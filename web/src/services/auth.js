// SERVIÇOS DE VERIFICAÇÃO DE AUTENTICAÇÃO
export const TOKEN_KEY = 'user-token'
export const EMAIL_KEY = 'user-email'

// Obtém as chaves de autenticação armazenadas no navegador
export const getLoggedUserEmail = () => {
  return localStorage.getItem(EMAIL_KEY)
}

export const getLoggedUserToken = () => {
  return localStorage.getItem(TOKEN_KEY)
}

// Adiciona o token de autenticação e o email do usuário ao armazenamento local do navegador
export const setLogin = user => {
  localStorage.setItem(TOKEN_KEY, user.token)
  localStorage.setItem(EMAIL_KEY, user.email)
  window.location.reload()
}

// Remove as chaves de autenticação armazenadas
export const setLogout = () => {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(EMAIL_KEY)
  window.location.reload()
}
