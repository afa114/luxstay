const { Hotel, Room, Booking } = require('../models');
const { Op } = require('sequelize');

exports.index = async (req, res) => {
  try {
    const { search, category, stars, minPrice, maxPrice, page = 1 } = req.query;
    const limit = 9;
    const offset = (page - 1) * limit;
    const where = { isActive: true };

    if (search) where.name = { [Op.iLike]: `%${search}%` };
    if (category) where.category = category;
    if (stars) where.stars = stars;

    const { count, rows: hotels } = await Hotel.findAndCountAll({
      where,
      include: [{ model: Room, as: 'rooms', attributes: ['price'] }],
      limit,
      offset,
      order: [['rating', 'DESC']]
    });

    // filter by price if provided
    let filtered = hotels;
    if (minPrice || maxPrice) {
      filtered = hotels.filter(h => {
        if (!h.rooms.length) return false;
        const min = Math.min(...h.rooms.map(r => parseFloat(r.price)));
        if (minPrice && min < parseFloat(minPrice)) return false;
        if (maxPrice && min > parseFloat(maxPrice)) return false;
        return true;
      });
    }

    res.render('hotels/index', {
      title: 'Browse Hotels',
      hotels: filtered,
      total: count,
      pages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      query: req.query
    });
  } catch (err) {
    console.error(err);
    req.flash('error', 'Failed to load hotels.');
    res.redirect('/');
  }
};

exports.show = async (req, res) => {
  try {
    const { Review, User, Favorite } = require('../models');
    const hotel = await Hotel.findOne({
      where: { slug: req.params.slug, isActive: true },
      include: [
        { model: Room, as: 'rooms' },
        { model: Review, as: 'reviews', include: [{ model: User, as: 'user', attributes: ['id','name'] }], order: [['createdAt','DESC']] }
      ]
    });
    if (!hotel) { req.flash('error', 'Hotel not found.'); return res.redirect('/hotels'); }
    res.render('hotels/show', { title: hotel.name, hotel });
  } catch (err) {
    console.error(err);
    res.redirect('/hotels');
  }
};

// Admin CRUD
exports.adminIndex = async (req, res) => {
  const hotels = await Hotel.findAll({ include: [{ model: Room, as: 'rooms' }], order: [['createdAt', 'DESC']] });
  res.render('admin/hotels/index', { title: 'Manage Hotels', hotels });
};

exports.newForm = (req, res) => {
  res.render('admin/hotels/form', { title: 'Add Hotel', hotel: null });
};

exports.create = async (req, res) => {
  try {
    const { name, description, address, city, country, stars, category, amenities, phone, email, checkInTime, checkOutTime } = req.body;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();
    const mainImage = req.files && req.files['mainImage'] ? '/uploads/hotels/' + req.files['mainImage'][0].filename : req.body.mainImageUrl || null;
    const images = req.body.imageUrls ? req.body.imageUrls.split('\n').map(u => u.trim()).filter(Boolean) : [];
    await Hotel.create({ name, slug, description, address, city, country, stars: parseInt(stars), category, amenities: amenities ? amenities.split(',').map(a => a.trim()) : [], mainImage, images, phone, email, checkInTime, checkOutTime });
    req.flash('success', 'Hotel created!');
    res.redirect('/admin/hotels');
  } catch (err) {
    req.flash('error', 'Failed to create hotel.');
    res.redirect('/admin/hotels/new');
  }
};

exports.editForm = async (req, res) => {
  const hotel = await Hotel.findByPk(req.params.id);
  if (!hotel) return res.redirect('/admin/hotels');
  res.render('admin/hotels/form', { title: 'Edit Hotel', hotel });
};

exports.update = async (req, res) => {
  try {
    const hotel = await Hotel.findByPk(req.params.id);
    if (!hotel) return res.redirect('/admin/hotels');
    const { name, description, address, city, country, stars, category, amenities, phone, email, checkInTime, checkOutTime } = req.body;
    const mainImage = req.files && req.files['mainImage'] ? '/uploads/hotels/' + req.files['mainImage'][0].filename : req.body.mainImageUrl || hotel.mainImage;
    const images = req.body.imageUrls ? req.body.imageUrls.split('\n').map(u => u.trim()).filter(Boolean) : hotel.images;
    await hotel.update({ name, description, address, city, country, stars: parseInt(stars), category, amenities: amenities ? amenities.split(',').map(a => a.trim()) : [], mainImage, images, phone, email, checkInTime, checkOutTime });
    req.flash('success', 'Hotel updated!');
    res.redirect('/admin/hotels');
  } catch (err) {
    req.flash('error', 'Update failed.');
    res.redirect('/admin/hotels');
  }
};

exports.delete = async (req, res) => {
  await Hotel.destroy({ where: { id: req.params.id } });
  req.flash('success', 'Hotel deleted.');
  res.redirect('/admin/hotels');
};
