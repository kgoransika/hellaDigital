import { v2 as cloudinary } from 'cloudinary';
import env from '../config.js';

cloudinary.config({
  cloud_name: env.CLOUD_NAME,
  api_key: env.CLOUD_KEY,
  api_secret: env.CLOUD_KEY_SECRET,
});

export default cloudinary;
