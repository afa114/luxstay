const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { v4: uuidv4 } = require('uuid');

const Booking = sequelize.define('Booking', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  bookingRef: { type: DataTypes.STRING(20), unique: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  roomId: { type: DataTypes.INTEGER, allowNull: false },
  hotelId: { type: DataTypes.INTEGER, allowNull: false },
  checkIn: { type: DataTypes.DATEONLY, allowNull: false },
  checkOut: { type: DataTypes.DATEONLY, allowNull: false },
  nights: { type: DataTypes.INTEGER },
  adults: { type: DataTypes.INTEGER, defaultValue: 1 },
  children: { type: DataTypes.INTEGER, defaultValue: 0 },
  childAges: { type: DataTypes.JSON, defaultValue: [] },
  guests: { type: DataTypes.INTEGER, defaultValue: 1 },
  totalPrice: { type: DataTypes.DECIMAL(10, 2) },
  status: { type: DataTypes.ENUM('pending','confirmed','cancelled','completed'), defaultValue: 'pending' },
  paymentStatus: { type: DataTypes.ENUM('unpaid','paid','refunded'), defaultValue: 'unpaid' },
  specialRequests: { type: DataTypes.TEXT },
  guestName: { type: DataTypes.STRING(150) },
  guestEmail: { type: DataTypes.STRING(150) },
  guestPhone: { type: DataTypes.STRING(30) }
}, {
  hooks: {
    beforeCreate: (booking) => {
      booking.bookingRef = 'BK' + Date.now().toString().slice(-8).toUpperCase();
    }
  }
});

module.exports = Booking;
