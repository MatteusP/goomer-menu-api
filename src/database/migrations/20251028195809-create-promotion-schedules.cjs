
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('promotion_schedules', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      promotion_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'promotions', 
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE', 
      },
      day_of_week: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      start_time: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      end_time: {
        type: Sequelize.TIME,
        allowNull: false,
      }
    });


    await queryInterface.addIndex('promotion_schedules', ['promotion_id', 'day_of_week']);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('promotion_schedules');
  }
};

