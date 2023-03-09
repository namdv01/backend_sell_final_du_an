require('dotenv').config();
const ENV = {
  PG: {
    HOST: process.env.PG_HOST,
    USER: process.env.PG_USER,
    PASSWORD: process.env.PG_PASSWORD,
    DATABASE: process.env.PG_DATABASE,
    PORT: process.env.PG_PORT,
    DIALECT: process.env.PG_DIALECT,
  },
  CLOUDINARY: {
    NAME: process.env.CLOUDINARY_NAME,
    API_KEY: process.env.CLOUDINARY_API_KEY,
    API_SECRET: process.env.CLOUDINARY_API_SECRET,
  },
  JWT_SECRET: process.env.JWT_SECRET,
  PORT: process.env.PORT,
};

module.exports = ENV;