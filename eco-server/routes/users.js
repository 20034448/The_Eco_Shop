const express = require('express');
const router = express.Router();
const db = require('../db');  // pool mysql2/promise
const bcrypt = require('bcrypt');

// GET /users
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Users');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /users
router.post('/', async (req, res) => {
  const { name, email, phone, address, password } = req.body;

  if (!name || !email || !phone || !address || !password) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  try {
    // Hash da senha
    const saltRounds = 10;
    const password_hash = await bcrypt.hash(password, saltRounds);

    const sql = `
      INSERT INTO Users (name, email, phone, address, password_hash)
      VALUES (?, ?, ?, ?, ?)
    `;

    const [result] = await db.query(sql, [name, email, phone, address, password_hash]);

    res.status(201).json({ 
      user_id: result.insertId,
      name,
      email,
      phone,
      address
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /users/:id
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, address } = req.body;

  try {
    const sql = `
      UPDATE Users
      SET name = ?, email = ?, phone = ?, address = ?
      WHERE user_id = ?
    `;

    const [result] = await db.query(sql, [name, email, phone, address, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /users/:id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query('DELETE FROM Users WHERE user_id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
