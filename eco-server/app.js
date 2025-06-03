const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const bcrypt = require('bcrypt');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const db = require('./db'); // Certifique-se de que './db' exporta um pool mysql2/promise

const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'https://SEU-FRONT.firebaseapp.com'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Rotas principais
app.use('/api', indexRouter); // Para /api/home e /api/profile
app.use('/api/users', usersRouter); // Para rotas de usuário

// Registro de novo usuário com nome, email, senha, telefone e endereço
app.post('/api/register', async (req, res) => {
  const { name, email, password, phone, address } = req.body;

  try {
    const [existing] = await db.query('SELECT * FROM Users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(400).json({ success: false, message: 'Email já está em uso.' });
    }

    const hash = await bcrypt.hash(password, 10);
    await db.query(
      'INSERT INTO Users (name, email, password_hash, phone, address, created_at) VALUES (?, ?, ?, ?, ?, NOW())',
      [name, email, hash, phone, address]
    );

    res.status(201).json({ success: true, message: 'Usuário registrado com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Erro no servidor ao registrar' });
  }
});

// Login com validação no banco de dados
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await db.query('SELECT * FROM Users WHERE email = ?', [email]);

    if (rows.length === 0) {
      return res.status(401).json({ success: false, message: 'Email não encontrado' });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Senha incorreta' });
    }

    res.cookie('token', 'fake-jwt-token', {
      httpOnly: true,
      secure: true,
      sameSite: 'None'
    });

    res.json({ success: true, message: 'Login bem-sucedido!', user: { name: user.name, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Erro interno no servidor' });
  }
});

// Tratamento de erros
app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500).json({ error: err.message || 'Erro interno no servidor' });
});

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

module.exports = app;
