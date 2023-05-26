import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  orderName: {
    type: String,
    required: true,
  },
  orderType: {
    type: String,
    required: true,
  },
  orderDetails: {
    type: String,
    required: true,
  },
  orderTotal: {
    type: Number,
    required: true,
  },
  orderStatus: {
    type: String,
    required: true,
  },
  sellerName: {
    type: String,
    required: true,
  },
  orderedBy: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model.Orders || mongoose.model('order', OrderSchema);
