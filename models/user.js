const bcrypt =  require("bcrypt");
// const Roles = require("./roles");

module.exports = (sequelize, DataTypes) => {
    let User = sequelize.define('User', {
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        role: DataTypes.STRING
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
            associate: (models) => {
                User.hasMany(models.Book);
                User.belongsTo(models.Roles);
            },
            isPassword: (password) => {
                return bcrypt.compareSync(password, user.password);
            }
        }
    });

    // User.hasOne(Roles);

    return User;
}