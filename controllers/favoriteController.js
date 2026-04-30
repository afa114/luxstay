const { Favorite, Hotel } = require('../models');

exports.toggle = async (req, res) => {
  try {
    const { hotelId } = req.body;
    const existing = await Favorite.findOne({ where: { userId: req.session.userId, hotelId } });
    if (existing) {
      await existing.destroy();
      return res.json({ favorited: false });
    }
    await Favorite.create({ userId: req.session.userId, hotelId });
    res.json({ favorited: true });
  } catch (err) {
    res.json({ error: err.message });
  }
};

exports.list = async (req, res) => {
  const favorites = await Favorite.findAll({
    where: { userId: req.session.userId },
    include: [{ model: Hotel, as: 'hotel', include: ['rooms'] }]
  });
  res.render('user/favorites', { title: 'My Favorites', favorites });
};
