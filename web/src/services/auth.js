// SERVIÇOS DE VERIFICAÇÃO DE AUTENTICAÇÃO
export const TOKEN_KEY = '@sgp-Token'

// Verifica se existe um usuário logado
export const isAuthenticated = () => {
  return localStorage.getItem(TOKEN_KEY)
}

// Adiciona o token de autenticação ao armazenamento local do navegador
export const setToken = token => {
  localStorage.setItem(TOKEN_KEY, token)
}
