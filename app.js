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
app.use('/follow-up', require('./routes/followUp'));
app.use('/mou', require('./routes/mou'));
app.use('/api', require('./routes/api'));
app.use('/export', require('./routes/export'));

app.listen(3000, () => {
  console.log('Server berjalan di http://localhost:3000');
});
