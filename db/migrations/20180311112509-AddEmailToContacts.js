'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Contacts', 'email', Sequelize.STRING);
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.dropColumn('Contacts', 'email');
  }
};
