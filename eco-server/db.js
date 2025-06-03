const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'tramway.proxy.rlwy.net',
  user: 'root',
  password: 'jkWYAuTujiLbwkYVoYNjlAzCpDYxhtDE',  
  port: 17898,            
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;

// Testar conexão (opcional)
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('Conectado ao banco Railway MySQL com sucesso!');
    connection.release();
  } catch (err) {
    console.error('Erro ao conectar no banco Railway:', err);
  }
}

testConnection();
