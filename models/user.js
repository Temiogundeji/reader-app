module.exports = (sequelize, DataTypes) => {
    let User = sequelize.define('User', {
        username: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING
    },
    {
        classMethods: {
            associate: (models) => {
                User.hasMany(models.Book);
            }
        }
    });

    return User;
}