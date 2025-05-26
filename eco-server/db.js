const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Abbud20121984!',
  database: 'ecoshopdatabase',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;// db.js






// Testar conexão (opcional)
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('Conectado ao banco MySQL com sucesso!');
    connection.release();
  } catch (err) {
    console.error('Erro ao conectar no banco:', err);
  }
}

testConnection();

module.exports = pool;
