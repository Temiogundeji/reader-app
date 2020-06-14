const Book = require('../models/Book'); 
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('users', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING,
            unique:true,
                allowNull:false,
                isEmail:true
            },
            password:{
                type: DataTypes.STRING,
                allowNull:false
            }
        },
        {
            hooks: {
                beforeCreate: user => {
                    const salt = bcrypt.genSaltSync();
                    user.password = bcrypt.hashSync(user.password, salt);
                }
            }
        },
        {
            classMethods: {
                associate:() => {
                    User.hasMany(Book);
                },
                isPassword: (encodedPassword, password) => {
                    return bcrypt.compareSync(password, encodedPassword);
                }
            }
        }
    );

    return User;
}