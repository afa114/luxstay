const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Room = sequelize.define('Room', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  hotelId: { type: DataTypes.INTEGER, allowNull: false },
  name: { type: DataTypes.STRING(150), allowNull: false },
  type: { type: DataTypes.ENUM('standard','deluxe','suite','penthouse','villa'), defaultValue: 'standard' },
  description: { type: DataTypes.TEXT },
  price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  capacity: { type: DataTypes.INTEGER, defaultValue: 2 },
  bedType: { type: DataTypes.STRING(50), defaultValue: 'King' },
  size: { type: DataTypes.INTEGER, defaultValue: 30 },
  floor: { type: DataTypes.INTEGER, defaultValue: 1 },
  image: { type: DataTypes.STRING, defaultValue: null },
  images: { type: DataTypes.JSON, defaultValue: [] },
  amenities: { type: DataTypes.JSON, defaultValue: [] },
  isAvailable: { type: DataTypes.BOOLEAN, defaultValue: true },
  quantity: { type: DataTypes.INTEGER, defaultValue: 1 }
});

module.exports = Room;
