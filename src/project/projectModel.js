import mongoose from 'mongoose';
import mongooseSequence from'mongoose-sequence';

const AutoIncrement = mongooseSequence(mongoose);
const projectSchema = mongoose.Schema(
  {
    conf: {
      type: Object
    },
    description: {
      type: String,
    },
    id: {
      type: Number,
    },
    key: {
      type: String,
    },
    name: {
      type: String,
      unique: true,
    },
    path: {
      type: String,
    },
    pid: {
      type: String,
    },
    port: {
      type: String,
    },
    slug: {
      type: String,
    },
    created_by: {
      type: Number,
      default: 1
    },
    status: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);
projectSchema.plugin(AutoIncrement, { inc_field: 'id' })
const Project = mongoose.model('Project', projectSchema);
export default Project;
