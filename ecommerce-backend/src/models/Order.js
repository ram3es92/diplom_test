import { Schema, model } from 'mongoose';

const orderSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    qty:       { type: Number, default: 1 },
  }],
  status: { type: String, default: 'в обработке' },
}, { timestamps: true });

export default model('Order', orderSchema);
