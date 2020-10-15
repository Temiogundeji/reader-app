'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Users', 'role', {
        type: Sequelize.STRING,
      }),
    ]);
    
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([ queryInterface.removeColumn("Users", "role")]);
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
