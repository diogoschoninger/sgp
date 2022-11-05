import { DataTypes } from 'sequelize'

// Importa a conexão com o banco de dados
import { sequelize } from '../connections/mysql.mjs'

// Define e exporta o model User
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  cpf: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'users'
})

export default User
