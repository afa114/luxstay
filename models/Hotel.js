const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Hotel = sequelize.define('Hotel', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(200), allowNull: false },
  slug: { type: DataTypes.STRING(200), unique: true },
  description: { type: DataTypes.TEXT },
  address: { type: DataTypes.STRING(300) },
  city: { type: DataTypes.STRING(100) },
  country: { type: DataTypes.STRING(100) },
  stars: { type: DataTypes.INTEGER, defaultValue: 3 },
  category: { type: DataTypes.ENUM('luxury', 'business', 'budget', 'resort', 'boutique'), defaultValue: 'luxury' },
  mainImage: { type: DataTypes.STRING, defaultValue: null },
  images: { type: DataTypes.JSON, defaultValue: [] },
  amenities: { type: DataTypes.JSON, defaultValue: [] },
  phone: { type: DataTypes.STRING(30) },
  email: { type: DataTypes.STRING(150) },
  checkInTime: { type: DataTypes.STRING(10), defaultValue: '14:00' },
  checkOutTime: { type: DataTypes.STRING(10), defaultValue: '12:00' },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
  rating: { type: DataTypes.FLOAT, defaultValue: 0 },
  reviewCount: { type: DataTypes.INTEGER, defaultValue: 0 }
});

module.exports = Hotel;
