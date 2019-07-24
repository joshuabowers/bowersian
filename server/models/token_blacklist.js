import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const schema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true
  },
  expireAt: Date
});

schema.index({expiredAt: 1}, {expireAfterSeconds: 0});

// Note: Date constructor takes ms since epoch, while token stores seconds 
schema.pre('save', async function(){
  if( this.isModified('token') ){
    const claims = await jwt.decode(this.token);
    this.expireAt = claims.exp*1000;
  }
});

export const TokenBlacklist = mongoose.model('TokenBlacklist', schema);