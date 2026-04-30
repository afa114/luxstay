const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ChatMessage = sequelize.define('ChatMessage', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER, allowNull: true },
  guestName: { type: DataTypes.STRING(100), defaultValue: 'Guest' },
  message: { type: DataTypes.TEXT, allowNull: false },
  isAdmin: { type: DataTypes.BOOLEAN, defaultValue: false },
  sessionId: { type: DataTypes.STRING(100) }
});

module.exports = ChatMessage;
