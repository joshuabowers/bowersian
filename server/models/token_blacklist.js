import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true
  },
  expireAt: Date
});

schema.index({expiredAt: 1}, {expireAfterSeconds: 0});

export const TokenBlacklist = mongoose.model('TokenBlacklist', schema);