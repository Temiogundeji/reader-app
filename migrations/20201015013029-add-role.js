'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("Users", "roles", {
        type:Sequelize.STRING,
      })
    ]);
    
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([ queryInterface.removeColumn("Users", "roles")]);
  }
};
