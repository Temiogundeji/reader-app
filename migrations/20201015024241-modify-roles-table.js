'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("Roles", "roleId", {
        type: Sequelize.INTEGER,
        unique: true
      })
    ])
    
  },

  down: async (queryInterface, Sequelize) => {
      return await queryInterface.removeColumn("Roles", "roleId");
  }
};
