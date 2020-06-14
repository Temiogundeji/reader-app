const User = require('../models/User');

module.exports = (sequelize, DataTypes) => {
    const Book = sequelize.define('books', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title:{
            type: DataTypes.STRING,
            unique:true,
            allowNull: false
        },
        author:{
            type: DataTypes.STRING,
            unique:true,
            allowNull: false
        },
        pages:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        img:{
            type: DataTypes.STRING,
            unique:true,
            allowNull: false
        },
        isFavorite:{
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    },
    {
        classMethods: {
            associate:(models) => {
                Book.BelongsTo(User)
            }
        }
    })

    return Book;
}