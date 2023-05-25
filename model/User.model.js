import mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide unique Username'],
    unique: [true, 'Username Exist'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    unique: false,
  },
  email: {
    type: String,
    required: [true, 'Please provide a unique email'],
    unique: true,
  },
  role: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  idVerified: {
    type: Boolean,
    default: false,
  },
  paymentVerified: {
    type: Boolean,
    default: false,
  },
  firstName: { type: String },
  lastName: { type: String },
  mobile: { type: Number },
  address: { type: String },
  profile: { type: String },
  idImg: { type: String },
  HKBalance: { type: Number, default: 0 },
});

export default mongoose.model.Users || mongoose.model('User', UserSchema);
