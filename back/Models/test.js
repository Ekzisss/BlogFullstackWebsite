import mongoose from 'mongoose';

const TestSchema = new mongoose.Schema(
  {
    aaa: {
      type: String,
      required: true,
    },
    bbb: {
      type: String,
      required: true,
      unique: true,
    },
    ccc: {
      type: String,
      required: true,
    },
    avatarUrl: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Test', TestSchema);
