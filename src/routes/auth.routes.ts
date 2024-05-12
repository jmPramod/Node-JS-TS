import {
  profileUpdate,
  register,
  forgotPassword,
} from '../controller/auth.controller';
import express from 'express';

export const authRoute = express.Router();
authRoute.get('/', () => {
  console.log('hai');
});
authRoute.post('/login', register);
authRoute.put('/profile', profileUpdate);
authRoute.post('/forgot-password', forgotPassword);
