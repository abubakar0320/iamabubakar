import mongoose, { Schema, model, models } from 'mongoose';

const ServiceSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  icon: {
    type: String, // Icon name from lucide-react or similar
    default: 'Globe',
  },
  features: {
    type: [String],
    default: [],
  },
  benefits: {
    type: [String],
    default: [],
  },
  image: {
    type: String,
    default: '',
  },
}, { timestamps: true });

const Service = models.Service || model('Service', ServiceSchema);

export default Service;
