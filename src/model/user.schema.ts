import mongoose from 'mongoose';
import Joi from 'joi';
const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    profileImage: { type: String, default: '' },
    city: { type: String },
    state: { type: String },
    pinCode: { type: String },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const validateUserModel = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().allow(''),
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(new RegExp('^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])'))
    .min(8)
    .required()
    .messages({
      'string.pattern.base':
        'Password must contain at least one letter, one digit, and one special character.',
      'string.empty': 'Password is required.',
      'string.min': 'Password must be at least {#limit} characters long.',
    }),
  phone: Joi.string().required().length(10),
  profileImage: Joi.string().allow(''),
  city: Joi.string().allow(''),
  state: Joi.string().allow(''),
  pinCode: Joi.string().allow(''),
  isAdmin: Joi.boolean().default(false),
});

const userModel = mongoose.model('User', userSchema);
export { userModel, validateUserModel };
