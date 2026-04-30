const { User } = require('../models');
const { validationResult } = require('express-validator');

exports.getLogin = (req, res) => {
  res.render('auth/login', { title: 'Login' });
};

exports.postLogin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash('error', errors.array()[0].msg);
    return res.redirect('/auth/login');
  }
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user || !(await user.validPassword(password))) {
      req.flash('error', 'Invalid email or password.');
      return res.redirect('/auth/login');
    }
    req.session.userId = user.id;
    req.session.userName = user.name;
    req.session.role = user.role;
    req.session.userEmail = user.email;
    req.flash('success', `Welcome back, ${user.name}!`);
    res.redirect(user.role === 'admin' ? '/admin' : '/');
  } catch (err) {
    req.flash('error', 'Something went wrong.');
    res.redirect('/auth/login');
  }
};

exports.getRegister = (req, res) => {
  res.render('auth/register', { title: 'Register' });
};

exports.postRegister = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash('error', errors.array()[0].msg);
    return res.redirect('/auth/register');
  }
  try {
    const { name, email, password, phone } = req.body;
    const exists = await User.findOne({ where: { email } });
    if (exists) {
      req.flash('error', 'Email already registered.');
      return res.redirect('/auth/register');
    }
    const user = await User.create({ name, email, password, phone });
    req.session.userId = user.id;
    req.session.userName = user.name;
    req.session.role = user.role;
    req.session.userEmail = user.email;
    req.flash('success', 'Account created! Welcome!');
    res.redirect('/');
  } catch (err) {
    req.flash('error', 'Registration failed.');
    res.redirect('/auth/register');
  }
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};
