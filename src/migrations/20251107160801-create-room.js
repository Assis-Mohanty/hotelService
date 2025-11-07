'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Rooms', {
      id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
      },
      hotel_id:{
        type:Sequelize.INTEGER,
        allowNull:false
      },
      room_category_id:{
        type:Sequelize.INTEGER,
        allowNull:false
      },
      date_of_avaliability:{
        type:Sequelize.DATE,
        allowNull:false,
      },
      price:{
        type:Sequelize.FLOAT,
        allowNull:false
      },
      created_at:{
        type:Sequelize.DATE,
        allowNull:false,
        defaultValue:Sequelize.NOW
      },
      update_at:{
        type:Sequelize.DATE,
        allowNull:true,
      },
      deleted_at:{
        type:Sequelize.DATE,
        allowNull:true,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Rooms');
  }
};