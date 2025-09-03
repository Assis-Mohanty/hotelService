require('ts-node/register');  // allows TS in CLI

// load your actual TS config (sequelize.config.ts)
const config = require('./sequelize.config.js').default;

module.exports = config;
