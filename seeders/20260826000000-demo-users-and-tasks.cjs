'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Passwords are bcrypt hashes for 'password123'
    const passHash = '$2a$10$CwTycUXWue0Thq9StjUM0uJ8p2j1Yq9l7xV6uE1oG1c5K7zqKx5e';
    const userRows = await queryInterface.bulkInsert(
      'Users',
      [
        { name: 'Alice Johnson', email: 'alice@example.com', password: passHash, role: 'member', createdAt: new Date(), updatedAt: new Date() },
        { name: 'Bob Smith', email: 'bob@example.com', password: passHash, role: 'member', createdAt: new Date(), updatedAt: new Date() },
        { name: 'Carla Gomez', email: 'carla@example.com', password: passHash, role: 'admin', createdAt: new Date(), updatedAt: new Date() },
      ],
      { returning: ['id', 'email'] }
    );

    await queryInterface.bulkInsert('Tasks', [
      {
        title: 'Prepare sprint plan',
        dueDate: new Date('2026-09-01T12:00:00.000Z'),
        completed: false,
        userId: userRows[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Review backend routes',
        dueDate: new Date('2026-09-03T12:00:00.000Z'),
        completed: true,
        userId: userRows[1].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Update documentation',
        dueDate: new Date('2026-09-05T12:00:00.000Z'),
        completed: false,
        userId: userRows[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'QA database migration',
        dueDate: new Date('2026-09-08T12:00:00.000Z'),
        completed: false,
        userId: userRows[2].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Deploy release candidate',
        dueDate: new Date('2026-09-10T12:00:00.000Z'),
        completed: true,
        userId: userRows[1].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tasks', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  },
};
