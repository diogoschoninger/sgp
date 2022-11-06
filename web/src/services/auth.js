export const TOKEN_KEY = '@sgp-Token'

export const isAuthenticated = () => {
  return localStorage.getItem(TOKEN_KEY)
}

export const setToken = token => {
  localStorage.setItem(TOKEN_KEY, token)
}
