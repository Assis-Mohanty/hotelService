'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('rooms', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      room_number: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      room_type: {
        type: Sequelize.ENUM('STANDARD', 'DELUXE', 'SUITE'),
        allowNull: false,
        defaultValue: 'STANDARD',
      },
      hotel_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'hotels', 
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  await queryInterface.addConstraint('rooms', {
    fields: ['hotel_id', 'room_number'],
    type: 'unique',
    name: 'unique_room_per_hotel',
    });
  },
  

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('rooms');
  },
};
