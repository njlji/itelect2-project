'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // bcrypt hash for 'adminpass123'
    const adminHash = '$2a$10$7QJgE1kF6m9YbV1h6cQG6.8sU1K8qvQ9Zx1bYwQdF8h9K2L3mN4Oa';
    await queryInterface.bulkInsert('Users', [
      { name: 'Admin User', email: 'admin@example.com', password: adminHash, role: 'admin', createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', { email: 'admin@example.com' }, {});
  }
};
