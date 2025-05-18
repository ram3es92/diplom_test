import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  email:        { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true },
  role:         { type: String, enum: ['user','admin'], default: 'user' },  // <— добавлено
}, { timestamps: true });

export default model('User', userSchema);
