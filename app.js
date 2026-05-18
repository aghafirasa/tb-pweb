const express = require('express');
const session = require('express-session');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use(session({
  secret: 'secret-kerjasama-app',
  resave: false,
  saveUninitialized: false
}));

app.use('/auth', require('./routes/auth'));
app.use('/potential-partners', require('./routes/potentialPartner'));

app.get('/', (req, res) => res.redirect('/auth/login'));

app.listen(3000, () => {
  console.log('Server berjalan di http://localhost:3000');
});