import mongoose from 'mongoose';

export const DPSchema = new mongoose.Schema(
  {
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
    dpLicense: {
      type: String,
      required: true,
    },
    dpImg: {
      type: String,
      required: true,
    },
    dpFile: {
      type: String,
    },
    dpOwner: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model.DigitalProducts ||
  mongoose.model('DigitalProducts', DPSchema);
