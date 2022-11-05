import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

// Cria e exporta a conexão com o banco de dados
export const sequelize = new Sequelize(
  process.env.MYSQL_DB_NAME,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    dialect: 'mysql',
    port: parseInt(process.env.MYSQL_PORT)
  }
)
