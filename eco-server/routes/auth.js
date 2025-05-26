const express = require('express');
const router = express.Router();
const db = require('../db'); // conexão com o banco
const bcrypt = require('bcrypt');

// POST /login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
  }

  try {
    const [rows] = await db.query('SELECT * FROM User WHERE email = ?', [email]);

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Login ou senha inválidos.' });
    }

    const user = rows[0];
    const validPassword = await bcrypt.compare(password, user.password_hash);

    if (!validPassword) {
      return res.status(401).json({ error: 'Login ou senha inválidos.' });
    }

    // Remover o hash da resposta por segurança
    delete user.password_hash;

    res.status(200).json({ message: 'Login bem-sucedido', user });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
