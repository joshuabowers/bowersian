const DATABASE_NAME = 'bowersian';
const DATABASE_URL = `mongodb://localhost:27017/${DATABASE_NAME}`;

const config = {
  databaseUrl: process.env.DATABASE_URL || DATABASE_URL,
  options: {
    useNewUrlParser: true,
    autoReconnect: true,
  }
};

module.exports = config;