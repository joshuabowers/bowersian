const DATABASE_NAME = 'bowersian';
const MONGODB_URI = `mongodb://localhost:27017/${DATABASE_NAME}`;

const config = {
  mongodbUri: process.env.MONGODB_URI || MONGODB_URI,
  options: {
    useNewUrlParser: true,
    useFindAndModify: false,
    autoReconnect: true,
  }
};

export default config;