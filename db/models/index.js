require('dotenv').config();
const Sequelize = require('sequelize');
const db = {};

//db set example https://github.com/asp2131/Gather/blob/master/server/models/index.js
const sequelize = new Sequelize('postgres', process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
}); 

