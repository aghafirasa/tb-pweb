const db = require('../config/db');

const index = (req, res) => {
  db.query('SELECT * FROM potential_partners ORDER BY created_at DESC', (err, results) => {
    if (err) throw err;
    res.render('potentialPartner/index', { partners: results, user: req.session.user });
  });
};

const create = (req, res) => {
  res.render('potentialPartner/create', { user: req.session.user });
};

const store = (req, res) => {
  const { nama_instansi, bidang, kontak_person, email, telepon, alamat } = req.body;
  const created_by = req.session.user.id;
  db.query(
    'INSERT INTO potential_partners (nama_instansi, bidang, kontak_person, email, telepon, alamat, created_by) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [nama_instansi, bidang, kontak_person, email, telepon, alamat, created_by],
    (err) => {
      if (err) throw err;
      res.redirect('/potential-partners');
    }
  );
};

const edit = (req, res) => {
  db.query('SELECT * FROM potential_partners WHERE id = ?', [req.params.id], (err, results) => {
    if (err || results.length === 0) return res.redirect('/potential-partners');
    res.render('potentialPartner/edit', { partner: results[0], user: req.session.user });
  });
};

const update = (req, res) => {
  const { nama_instansi, bidang, kontak_person, email, telepon, alamat, status } = req.body;
  db.query(
    'UPDATE potential_partners SET nama_instansi=?, bidang=?, kontak_person=?, email=?, telepon=?, alamat=?, status=? WHERE id=?',
    [nama_instansi, bidang, kontak_person, email, telepon, alamat, status, req.params.id],
    (err) => {
      if (err) throw err;
      res.redirect('/potential-partners');
    }
  );
};

const destroy = (req, res) => {
  db.query('DELETE FROM potential_partners WHERE id = ?', [req.params.id], (err) => {
    if (err) throw err;
    res.redirect('/potential-partners');
  });
};

module.exports = { index, create, store, edit, update, destroy };