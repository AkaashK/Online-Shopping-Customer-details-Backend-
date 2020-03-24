const Sequelize = require('sequelize')
const database = require('../config/db.config')

exports.customer = database.define('customerDetails', {
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

exports.admin = database.define('admindetails', {
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {timestamps: false, freezeTableName: true}, )


