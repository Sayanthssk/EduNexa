import mongoose from "mongoose";

const syllabusSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true
  },
  module: {
    type: String,
    required: true
  },
  topics: [
    {
      title: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});



export default mongoose.model('Syllabus', syllabusSchema)
