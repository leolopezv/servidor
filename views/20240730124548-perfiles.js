'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   
    let perfiles = ['admin','supervisor','operador','cliente']

      for (let perfil of perfiles) {
        await queryInterface.bulkInsert('etiquetas', [{
          descripcion: perfil,
          estado: 'activo',
          createdAt: new Date(),
          updatedAt: new Date()
        }], {});
      }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('perfiles', null, {});
  }
};
