const db = require('../config/db');

const index = (req, res) => {
  db.query('SELECT m.*, p.nama_instansi FROM mou m JOIN potential_partners p ON m.potential_partner_id = p.id ORDER BY m.created_at DESC', (err, results) => {
    if (err) throw err;
    res.render('mou/index', { mous: results, user: req.session.user });
  });
};

const create = (req, res) => {
  db.query('SELECT id, nama_instansi FROM potential_partners', (err, partners) => {
    if (err) throw err;
    res.render('mou/create', { partners, user: req.session.user });
  });
};

const store = (req, res) => {
  const { potential_partner_id, draft_isi } = req.body;
  const created_by = req.session.user.id;
  db.query(
    'INSERT INTO mou (potential_partner_id, draft_isi, created_by) VALUES (?, ?, ?)',
    [potential_partner_id, draft_isi, created_by],
    (err) => {
      if (err) throw err;
      res.redirect('/mou');
    }
  );
};

const edit = (req, res) => {
  db.query('SELECT * FROM mou WHERE id = ?', [req.params.id], (err, results) => {
    if (err || results.length === 0) return res.redirect('/mou');
    db.query('SELECT id, nama_instansi FROM potential_partners', (err2, partners) => {
      res.render('mou/edit', { mou: results[0], partners, user: req.session.user });
    });
  });
};

const update = (req, res) => {
  const { draft_isi, status } = req.body;
  db.query(
    'UPDATE mou SET draft_isi=?, status=? WHERE id=?',
    [draft_isi, status, req.params.id],
    (err) => {
      if (err) throw err;
      res.redirect('/mou');
    }
  );
};

const destroy = (req, res) => {
  db.query('DELETE FROM mou WHERE id = ?', [req.params.id], (err) => {
    if (err) throw err;
    res.redirect('/mou');
  });
};

const approve = (req, res) => {
  const mouId = req.params.id;

  db.query('SELECT potential_partner_id FROM mou WHERE id = ?', [mouId], (err, results) => {
    if (err) throw err;
    if (results.length === 0) return res.redirect('/mou');

    const partnerId = results[0].potential_partner_id;

    db.query('UPDATE mou SET status="disetujui" WHERE id=?', [mouId], (err) => {
      if (err) throw err;

      db.query('UPDATE potential_partners SET status="aktif" WHERE id=?', [partnerId], (err) => {
        if (err) throw err;
        res.redirect('/mou');
      });
    });
  });
};

const reject = (req, res) => {
  db.query('UPDATE mou SET status="ditolak" WHERE id=?', [req.params.id], (err) => {
    if (err) throw err;
    res.redirect('/mou');
  });
};

module.exports = { index, create, store, edit, update, destroy, approve, reject };
