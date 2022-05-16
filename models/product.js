
const { DataTypes } = require('sequelize')

const sequelize = require('../util/database')

const Product = sequelize.define('product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: true
    },
    price: {
        type: DataTypes.DOUBLE,
        allowNull: false
    }
})

module.exports = Product