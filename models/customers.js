const Sequelize = require('sequelize')
const database = require('../config/db.config')

const customer = database.define('customerDetails', {
    ID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    CUSTOMER_NAME: {
        type: Sequelize.STRING,
        allowNull: false
    },
    CUSTOMER_CITY: {
        type: Sequelize.STRING,
        allowNull: false
    },
    LAST_MONTH_PURCHASE: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {timestamps: false, freezeTableName: true}, )

module.exports = customer