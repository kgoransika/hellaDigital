import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const TokenSchema = new Schema({
  username: {
    type: String,
    ref: 'User',
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600, // Automatically delete after 1 hour
  },
});

export default mongoose.model.Tokens || mongoose.model('token', TokenSchema);
