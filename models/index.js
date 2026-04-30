const sequelize = require('../config/database');
const User = require('./User');
const Hotel = require('./Hotel');
const Room = require('./Room');
const Booking = require('./Booking');
const Review = require('./Review');
const Favorite = require('./Favorite');
const ChatMessage = require('./ChatMessage');

// Hotel - Room
Hotel.hasMany(Room, { foreignKey: 'hotelId', as: 'rooms', onDelete: 'CASCADE' });
Room.belongsTo(Hotel, { foreignKey: 'hotelId', as: 'hotel' });

// User - Booking
User.hasMany(Booking, { foreignKey: 'userId', as: 'bookings' });
Booking.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Hotel - Booking
Hotel.hasMany(Booking, { foreignKey: 'hotelId', as: 'bookings' });
Booking.belongsTo(Hotel, { foreignKey: 'hotelId', as: 'hotel' });

// Room - Booking
Room.hasMany(Booking, { foreignKey: 'roomId', as: 'bookings' });
Booking.belongsTo(Room, { foreignKey: 'roomId', as: 'room' });

// Review
Hotel.hasMany(Review, { foreignKey: 'hotelId', as: 'reviews', onDelete: 'CASCADE' });
Review.belongsTo(Hotel, { foreignKey: 'hotelId', as: 'hotel' });
User.hasMany(Review, { foreignKey: 'userId', as: 'reviews' });
Review.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Favorite
User.hasMany(Favorite, { foreignKey: 'userId', as: 'favorites' });
Favorite.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Hotel.hasMany(Favorite, { foreignKey: 'hotelId', as: 'favorites' });
Favorite.belongsTo(Hotel, { foreignKey: 'hotelId', as: 'hotel' });

// Chat
User.hasMany(ChatMessage, { foreignKey: 'userId', as: 'messages' });
ChatMessage.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = { sequelize, User, Hotel, Room, Booking, Review, Favorite, ChatMessage };
