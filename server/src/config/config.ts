import dotenv from 'dotenv';

dotenv.config();

const config = {
  port: process.env.PORT || 3000,
  mongoURI: process.env.MONGODB_URI || 'mongodb://localhost:3000/myappauth',
  jwtSecret: process.env.SECRET || 'secret',
  emailAdmin: process.env.ADMIN_EMAIL || 'admin@gmail.com',
  usernameAdmin: process.env.ADMIN_USERNAME || 'admin',
  passwordAdmin: process.env.ADMIN_PASSWORD  || 'admin',
}

export default config;