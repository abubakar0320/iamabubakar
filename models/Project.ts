import mongoose, { Schema, model, models } from 'mongoose';

const ProjectSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tech: {
    type: [String],
    default: [],
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: '',
  },
  live: {
    type: String,
    default: '',
  },
  github: {
    type: String,
    default: '',
  },
}, { timestamps: true });

const Project = models.Project || model('Project', ProjectSchema);

export default Project;
