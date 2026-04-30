const { Booking, Room, Hotel, User } = require('../models');
const { Op } = require('sequelize');
const moment = require('moment');

exports.showBookingForm = async (req, res) => {
  try {
    const room = await Room.findByPk(req.params.roomId, { include: [{ model: Hotel, as: 'hotel' }] });
    if (!room) { req.flash('error', 'Room not found.'); return res.redirect('/hotels'); }
    res.render('bookings/form', { title: 'Book Room', room, hotel: room.hotel });
  } catch (err) {
    res.redirect('/hotels');
  }
};

exports.checkAvailability = async (req, res) => {
  try {
    const { roomId, checkIn, checkOut } = req.body;
    const conflict = await Booking.findOne({
      where: {
        roomId,
        status: { [Op.notIn]: ['cancelled'] },
        [Op.or]: [
          { checkIn: { [Op.between]: [checkIn, checkOut] } },
          { checkOut: { [Op.between]: [checkIn, checkOut] } },
          { checkIn: { [Op.lte]: checkIn }, checkOut: { [Op.gte]: checkOut } }
        ]
      }
    });
    res.json({ available: !conflict });
  } catch (err) {
    res.json({ available: false, error: err.message });
  }
};

exports.createBooking = async (req, res) => {
  try {
    const { roomId, hotelId, checkIn, checkOut, adults, children, childAges, specialRequests, guestName, guestEmail, guestPhone } = req.body;
    const room = await Room.findByPk(roomId);
    if (!room) { req.flash('error', 'Room not found.'); return res.redirect('/hotels'); }

    const nights = moment(checkOut).diff(moment(checkIn), 'days');
    if (nights < 1) { req.flash('error', 'Invalid dates.'); return res.redirect('back'); }

    const conflict = await Booking.findOne({
      where: {
        roomId,
        status: { [Op.notIn]: ['cancelled'] },
        [Op.or]: [
          { checkIn: { [Op.between]: [checkIn, checkOut] } },
          { checkOut: { [Op.between]: [checkIn, checkOut] } },
          { checkIn: { [Op.lte]: checkIn }, checkOut: { [Op.gte]: checkOut } }
        ]
      }
    });
    if (conflict) { req.flash('error', 'Room not available for selected dates.'); return res.redirect('back'); }

    const adultsNum = parseInt(adults) || 1;
    const childrenNum = parseInt(children) || 0;
    const totalGuests = adultsNum + childrenNum;
    const totalPrice = (parseFloat(room.price) * nights).toFixed(2);
    const ages = childAges ? (Array.isArray(childAges) ? childAges : [childAges]) : [];

    const booking = await Booking.create({
      userId: req.session.userId,
      roomId, hotelId, checkIn, checkOut, nights,
      adults: adultsNum,
      children: childrenNum,
      childAges: ages,
      guests: totalGuests,
      totalPrice,
      guestName: guestName || req.session.userName,
      guestEmail: guestEmail || req.session.userEmail,
      guestPhone,
      specialRequests,
      status: 'confirmed',
      paymentStatus: 'paid'
    });
    res.redirect('/bookings/confirmation/' + booking.id);
  } catch (err) {
    console.error(err);
    req.flash('error', 'Booking failed.');
    res.redirect('/hotels');
  }
};

exports.confirmation = async (req, res) => {
  const booking = await Booking.findByPk(req.params.id, {
    include: [
      { model: Room, as: 'room' },
      { model: Hotel, as: 'hotel' }
    ]
  });
  if (!booking || booking.userId !== req.session.userId) return res.redirect('/bookings');
  res.render('bookings/confirmation', { title: 'Booking Confirmed', booking });
};

exports.myBookings = async (req, res) => {
  const bookings = await Booking.findAll({
    where: { userId: req.session.userId },
    include: [{ model: Room, as: 'room' }, { model: Hotel, as: 'hotel' }],
    order: [['createdAt', 'DESC']]
  });
  res.render('bookings/list', { title: 'My Bookings', bookings });
};

exports.cancel = async (req, res) => {
  const booking = await Booking.findByPk(req.params.id);
  if (booking && booking.userId === req.session.userId) {
    await booking.update({ status: 'cancelled' });
    req.flash('success', 'Booking cancelled.');
  }
  res.redirect('/bookings');
};
