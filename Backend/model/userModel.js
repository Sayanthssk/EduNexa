import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['student', 'office'],
    required: true
  },
  registerNo: {
    type: String,
    unique: true,
    sparse: true,
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;