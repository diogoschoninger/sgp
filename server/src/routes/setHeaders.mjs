// Define os cabeçalhos das requisições para evitar erros de CORS
const setHeaders = (req, res, next) => {
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')

  // Passa a execução para a próxima função middleware
  next()
}

export default setHeaders
