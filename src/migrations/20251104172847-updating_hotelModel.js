'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('hotels', 'room_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null
    });

    await queryInterface.addColumn('hotels', 'room_type', {
      type: Sequelize.ENUM('STANDARD', 'DELUXE', 'SUITE'),
      allowNull: false,
      defaultValue: 'STANDARD'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('hotels', 'room_id');
    await queryInterface.removeColumn('hotels', 'room_type');
  }
};
