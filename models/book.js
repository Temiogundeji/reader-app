module.exports = (sequelize, DataTypes) => {
    let Book = sequelize.define('Book', {
        title: DataTypes.STRING,
        author: DataTypes.STRING,
        isFavorite: DataTypes.BOOLEAN,
        pages: DataTypes.INTEGER,
        coverImg: DataTypes.STRING
    },
    {
        classMethods: {
            associate: (models) => {
                Book.belongsTo(models.Users);
            }
        }
    });
    return Book;
}