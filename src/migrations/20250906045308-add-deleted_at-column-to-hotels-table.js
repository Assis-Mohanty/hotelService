'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    queryInterface.addColumn('hotels','deleted_at',{
      type:DataTypes.DATE,
      allowNull:true,
      defaultValue:null
    })
  },

  async down (queryInterface) {
    queryInterface.removeColumn('hotels','deleted_at');
  }
};
