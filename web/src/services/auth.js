export const TOKEN_KEY = '@sgp-Token'

export const isAuthenticated = () => {
  return localStorage.getItem(TOKEN_KEY) !== null
}

export const setToken = token => {
  localStorage.setItem(TOKEN_KEY, token)
}
