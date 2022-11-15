import { sequelize } from '../connections/mysql.mjs'
import { DataTypes } from 'sequelize'

// Define e exporta o model FinOperations
const FinOperations = sequelize.define('FinOperations', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  value: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  category: {
    type: DataTypes.STRING
  },
  side: {
    type: DataTypes.STRING
  },
  payment_method: {
    type: DataTypes.STRING
  },
  user_owner: {
    type: DataTypes.INTEGER
  }
}, {
  tableName: 'fin_operations',
  timestamps: false
})

export default FinOperations
