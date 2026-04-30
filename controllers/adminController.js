const { User, Hotel, Room, Booking } = require('../models');
const { Op } = require('sequelize');

exports.dashboard = async (req, res) => {
  try {
    const [totalUsers, totalHotels, totalBookings, bookings] = await Promise.all([
      User.count({ where: { role: 'user' } }),
      Hotel.count(),
      Booking.count(),
      Booking.findAll({ include: [{ model: Room, as: 'room' }, { model: Hotel, as: 'hotel' }, { model: User, as: 'user' }], order: [['createdAt', 'DESC']], limit: 10 })
    ]);
    const revenue = await Booking.sum('totalPrice', { where: { paymentStatus: 'paid' } });
    res.render('admin/dashboard', { title: 'Admin Dashboard', totalUsers, totalHotels, totalBookings, revenue: revenue || 0, recentBookings: bookings });
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
};

exports.users = async (req, res) => {
  const users = await User.findAll({ order: [['createdAt', 'DESC']] });
  res.render('admin/users', { title: 'Manage Users', users });
};

exports.bookings = async (req, res) => {
  const bookings = await Booking.findAll({
    include: [{ model: Room, as: 'room' }, { model: Hotel, as: 'hotel' }, { model: User, as: 'user' }],
    order: [['createdAt', 'DESC']]
  });
  res.render('admin/bookings', { title: 'All Bookings', bookings });
};

exports.updateBookingStatus = async (req, res) => {
  await Booking.update({ status: req.body.status }, { where: { id: req.params.id } });
  req.flash('success', 'Booking updated.');
  res.redirect('/admin/bookings');
};

// Room admin
exports.roomsIndex = async (req, res) => {
  const hotel = await Hotel.findByPk(req.params.hotelId, { include: [{ model: Room, as: 'rooms' }] });
  if (!hotel) return res.redirect('/admin/hotels');
  res.render('admin/rooms/index', { title: 'Manage Rooms', hotel });
};

exports.roomForm = async (req, res) => {
  const hotel = await Hotel.findByPk(req.params.hotelId);
  const room = req.params.roomId ? await Room.findByPk(req.params.roomId) : null;
  res.render('admin/rooms/form', { title: room ? 'Edit Room' : 'Add Room', hotel, room });
};

exports.createRoom = async (req, res) => {
  try {
    const { name, type, description, price, capacity, bedType, size, floor, amenities, quantity } = req.body;
    const image = req.file ? '/uploads/hotels/' + req.file.filename : req.body.imageUrl || null;
    await Room.create({ hotelId: req.params.hotelId, name, type, description, price, capacity, bedType, size, floor, amenities: amenities ? amenities.split(',').map(a => a.trim()) : [], image, quantity: quantity || 1 });
    req.flash('success', 'Room created!');
    res.redirect('/admin/hotels/' + req.params.hotelId + '/rooms');
  } catch (err) {
    req.flash('error', 'Failed to create room.');
    res.redirect('back');
  }
};

exports.updateRoom = async (req, res) => {
  try {
    const room = await Room.findByPk(req.params.roomId);
    if (!room) return res.redirect('back');
    const { name, type, description, price, capacity, bedType, size, floor, amenities, quantity } = req.body;
    const image = req.file ? '/uploads/hotels/' + req.file.filename : req.body.imageUrl || room.image;
    await room.update({ name, type, description, price, capacity, bedType, size, floor, amenities: amenities ? amenities.split(',').map(a => a.trim()) : room.amenities, image, quantity });
    req.flash('success', 'Room updated!');
    res.redirect('/admin/hotels/' + req.params.hotelId + '/rooms');
  } catch (err) {
    req.flash('error', 'Update failed.');
    res.redirect('back');
  }
};

exports.deleteRoom = async (req, res) => {
  await Room.destroy({ where: { id: req.params.roomId } });
  req.flash('success', 'Room deleted.');
  res.redirect('/admin/hotels/' + req.params.hotelId + '/rooms');
};
