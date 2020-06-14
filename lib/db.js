const Sequelize = require('sequelize');
require('dotenv').config();

const UserModel = require('../models/User'); 
const BookModel = require('../models/Book');

let sequelize = null;
     
if(!sequelize){
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PKEY,
        {
            host: 'localhost',
            dialect: 'postgres'
        }
    );
}

const User = UserModel(sequelize, Sequelize);
const Book = BookModel(sequelize, Sequelize);

module.exports = {
    Sequelize:Sequelize,
    sequelize:sequelize,
    User,
    Book
}
            
                 