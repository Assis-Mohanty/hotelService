require('dotenv').config(); // <-- this is critical!

// dotenv.config();
module.exports = {
  development: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'qqqq',
    database: process.env.DB_NAME || 'airbnb_dev',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'mysql',
  },
};
//ntg