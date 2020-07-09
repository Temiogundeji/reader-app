'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     **/
    await queryInterface.createTable('Users', { 
      id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey: true
      },
      email: {
        type:Sequelize.STRING,
        unique:true
      },
      password:{
        type: Sequelize.STRING
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
   
     await queryInterface.dropTable('users');
     
  }
};
