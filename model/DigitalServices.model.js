import mongoose from 'mongoose';

export const DSSchema = new mongoose.Schema({
  dsName: {
    type: String,
    required: [true, 'Please name your product'],
  },
  dsDescription: {
    type: String,
    required: [
      true,
      'Please give a breif description about your digital product',
    ],
  },
  dsCategory: {
    type: String,
    required: [true, 'Please select a category'],
  },
  dsSubCategory: {
    type: String,
    required: [true, 'Please select a sub category'],
  },
  dsPkgs: {
    dsPkg1: {
      dsPkg1Name: {
        type: String,
      },
      dsPkg1Price: {
        type: String,
      },
      dsPkg1Dt: {
        type: String,
      },
      dsPkg1Revisions: {
        type: String,
      },
    },
    dsPkg2: {
      dsPkg2Name: {
        type: String,
      },
      dsPkg2Price: {},
      dsPkg2Dt: {
        type: String,
      },
      dsPkg2Revisions: {
        type: String,
      },
    },
    dsPkg3: {
      dsPkg3Name: {
        type: String,
      },
      dsPkg3Price: {
        type: String,
      },
      dsPkg3Dt: {
        type: String,
      },
      dsPkg3Revisions: {
        type: String,
      },
    },
  },
  dsImg: {
    type: String,
    required: true,
  },
  dsPortfolioLink: {
    type: String,
    required: true,
  },
  dsOwner: {
    type: String,
    required: true,
  },
});

export default mongoose.model.DigitalServices ||
  mongoose.model('DigitalServices', DSSchema);
