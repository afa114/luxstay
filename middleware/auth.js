exports.isAuthenticated = (req, res, next) => {
  if (req.session && req.session.userId) return next();
  req.flash('error', 'Please log in to continue.');
  res.redirect('/auth/login');
};

exports.isAdmin = (req, res, next) => {
  if (req.session && req.session.role === 'admin') return next();
  req.flash('error', 'Access denied.');
  res.redirect('/');
};

exports.isGuest = (req, res, next) => {
  if (!req.session || !req.session.userId) return next();
  res.redirect('/');
};

exports.setLocals = async (req, res, next) => {
  res.locals.currentUser = req.session.userId ? {
    id: req.session.userId,
    name: req.session.userName,
    role: req.session.role,
    email: req.session.userEmail
  } : null;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
};
