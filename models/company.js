const Sequelize = require('sequelize');
const sequelize = require('../config/connection');


module.exports = sequelize.define("Company", {
    company_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    company_name: {
        type: Sequelize.STRING,
        allowNull: false
    }
});