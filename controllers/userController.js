const { User } = require('../models');
const bcrypt = require('bcryptjs');

exports.settingsPage = async (req, res) => {
  const user = await User.findByPk(req.session.userId);
  res.render('user/settings', { title: 'Account Settings', user });
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, phone } = req.body;
    await User.update({ name, phone }, { where: { id: req.session.userId } });
    req.session.userName = name;
    req.flash('success', 'Profile updated successfully!');
    res.redirect('/user/settings');
  } catch (err) {
    req.flash('error', 'Failed to update profile.');
    res.redirect('/user/settings');
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    if (newPassword !== confirmPassword) {
      req.flash('error', 'New passwords do not match.');
      return res.redirect('/user/settings');
    }
    if (newPassword.length < 6) {
      req.flash('error', 'Password must be at least 6 characters.');
      return res.redirect('/user/settings');
    }
    const user = await User.findByPk(req.session.userId);
    const valid = await user.validPassword(currentPassword);
    if (!valid) {
      req.flash('error', 'Current password is incorrect.');
      return res.redirect('/user/settings');
    }
    user.password = newPassword;
    await user.save();
    req.flash('success', 'Password changed successfully!');
    res.redirect('/user/settings');
  } catch (err) {
    req.flash('error', 'Failed to change password.');
    res.redirect('/user/settings');
  }
};
