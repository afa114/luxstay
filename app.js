require('dotenv').config();
const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const methodOverride = require('method-override');
const path = require('path');
const { sequelize } = require('./models');
const { setLocals } = require('./middleware/auth');

const app = express();

// Security
app.use(helmet({ contentSecurityPolicy: false }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 300 }));

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Body parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

// Session
app.use(session({
  secret: process.env.SESSION_SECRET || 'luxstay_secret_2024',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 }
}));

app.use(flash());
app.use(setLocals);

// Helpers for EJS
app.locals.formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};
app.locals.formatCurrency = (num) => '$' + parseFloat(num || 0).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
app.locals.stars = (n) => '★'.repeat(n) + '☆'.repeat(5 - n);

// Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/hotels', require('./routes/hotels'));
app.use('/bookings', require('./routes/bookings'));
app.use('/admin', require('./routes/admin'));
app.use('/user', require('./routes/user'));
app.use('/reviews', require('./routes/reviews'));

// 404
app.use((req, res) => res.status(404).render('404', { title: 'Page Not Found' }));

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('500', { title: 'Server Error', error: err.message });
});

const PORT = process.env.PORT || 3000;

sequelize.sync({ alter: false }).then(() => {
  console.log('✅ Database connected');
  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
}).catch(err => {
  console.error('❌ DB connection failed:', err.message);
});