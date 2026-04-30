const { Review, Hotel, User, Booking } = require('../models');

exports.create = async (req, res) => {
  try {
    const { hotelId, rating, title, comment } = req.body;
    // Check if user has already reviewed
    const existing = await Review.findOne({ where: { userId: req.session.userId, hotelId } });
    if (existing) {
      req.flash('error', 'You have already reviewed this hotel.');
      return res.redirect('/hotels/' + req.body.slug);
    }
    await Review.create({ userId: req.session.userId, hotelId, rating: parseInt(rating), title, comment });

    // Update hotel average rating
    const reviews = await Review.findAll({ where: { hotelId, isApproved: true } });
    const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    await Hotel.update({ rating: parseFloat(avg.toFixed(1)), reviewCount: reviews.length }, { where: { id: hotelId } });

    req.flash('success', 'Review submitted! Thank you.');
    res.redirect('back');
  } catch (err) {
    req.flash('error', 'Failed to submit review.');
    res.redirect('back');
  }
};

exports.delete = async (req, res) => {
  const review = await Review.findByPk(req.params.id);
  if (review && (review.userId === req.session.userId || req.session.role === 'admin')) {
    await review.destroy();
    req.flash('success', 'Review deleted.');
  }
  res.redirect('back');
};
