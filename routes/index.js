const express = require('express');
const router = express.Router();
const { Hotel, Room } = require('../models');

router.get('/', async (req, res) => {
  try {
    const [luxuryHotels, featuredHotels] = await Promise.all([
      Hotel.findAll({ where: { category: 'luxury', isActive: true }, include: [{ model: Room, as: 'rooms' }], limit: 3, order: [['rating', 'DESC']] }),
      Hotel.findAll({ where: { isActive: true }, include: [{ model: Room, as: 'rooms' }], limit: 6, order: [['rating', 'DESC']] })
    ]);
    res.render('index', { title: 'LuxStay — Luxury Hotel Reservations', luxuryHotels, featuredHotels });
  } catch (err) {
    console.error(err);
    res.render('index', { title: 'LuxStay', luxuryHotels: [], featuredHotels: [] });
  }
});

module.exports = router;
