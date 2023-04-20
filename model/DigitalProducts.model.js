import mongoose from 'mongoose';

export const DPSchema = new mongoose.Schema({
  dpName: {
    type: String,
    required: [true, 'Please name your product'],
  },
  dpDescription: {
    type: String,
    required: [
      true,
      'Please give a breif description about your digital product',
    ],
  },
  dpCategory: {
    type: String,
    required: [true, 'Please select a category'],
  },
  dpPrice: {
    type: String,
    required: [true, 'Please include the price'],
  },
  dpQuantity: {
    type: String,
    required: true,
  },
  dpImg: {
    type: String,
    required: true,
  },
  dpFile: {
    type: String,
    required: true,
  },
  dpOwner: {
    type: String,
  },
});

export default mongoose.model.DigitalProducts ||
  mongoose.model('DigitalProducts', DPSchema);
