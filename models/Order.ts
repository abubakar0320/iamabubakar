import mongoose, { Schema, model, models } from 'mongoose';

const OrderSchema = new Schema({
  customerName: {
    type: String,
    required: true,
  },
  customerEmail: {
    type: String,
    required: true,
  },
  customerPhone: {
    type: String,
    required: true,
  },
  planName: {
    type: String,
    required: true,
  },
  planPrice: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  transactionId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'verified', 'cancelled'],
    default: 'pending',
  },
}, { timestamps: true });

const Order = models.Order || model('Order', OrderSchema);

export default Order;
