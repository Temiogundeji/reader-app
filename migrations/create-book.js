module.exports = {
    up: (queryInterface, Sequelize) => 
      queryInterface.createTable('Books', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        title:{
            type: Sequelize.STRING,
            allowNull: false
        },
        author: {
            type: Sequelize.STRING,
            allowNull: false
        },
        isFavorite: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },
        pages: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        coverImg: {
            type: Sequelize.STRING,
            allowNull: false
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      }),
    down: (queryInterface) => queryInterface.dropTable('Books'),
  };