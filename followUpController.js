const db = require('../config/db');

const index = (req, res) => {
  db.query('SELECT f.*, p.nama_instansi FROM follow_up f JOIN potential_partners p ON f.potential_partner_id = p.id ORDER BY f.created_at DESC', (err, results) => {
    if (err) throw err;
    res.render('followUp/index', { followUps: results, user: req.session.user });
  });
};

const create = (req, res) => {
  db.query('SELECT id, nama_instansi FROM potential_partners', (err, partners) => {
    if (err) throw err;
    res.render('followUp/create', { partners, user: req.session.user });
  });
};

const store = (req, res) => {
  const { potential_partner_id, catatan, tanggal } = req.body;
  const created_by = req.session.user.id;
  db.query(
    'INSERT INTO follow_up (potential_partner_id, catatan, tanggal, created_by) VALUES (?, ?, ?, ?)',
    [potential_partner_id, catatan, tanggal, created_by],
    (err) => {
      if (err) throw err;
      res.redirect('/follow-up');
    }
  );
};

const destroy = (req, res) => {
  db.query('DELETE FROM follow_up WHERE id = ?', [req.params.id], (err) => {
    if (err) throw err;
    res.redirect('/follow-up');
  });
};

module.exports = { index, create, store, destroy };