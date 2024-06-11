const mysql = require("mysql2/promise");
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT, //default 3306
  user: process.env.DB_USER, //default : empty
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
// Kiểm tra kết nối cơ sở dữ liệu
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log("Đã kết nối tới cơ sở dữ liệu");
    connection.release();
  } catch (error) {
    console.error("Không thể kết nối tới cơ sở dữ liệu:", error);
  }
}

testConnection();
module.exports = pool;
