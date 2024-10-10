import mongoose from 'mongoose';

const SupportRequestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  title: { type: String },
  titleNr: { type: String },
  vin: { type: String },
  message: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const SupportRequest = mongoose.models.SupportRequest || mongoose.model('SupportRequest', SupportRequestSchema);

export default SupportRequest;
