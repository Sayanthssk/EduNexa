import mongoose from 'mongoose';
const { Schema } = mongoose;

const examQuestionSchema = new Schema({
  subject: { 
    type: String, 
    required: true 
  },
  question: { 
    type: String, 
    required: true 
  },
  marks: { 
    type: Number, 
    required: true 
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true,
  },
}, { timestamps: true }); 

const ExamQuestion = mongoose.model('ExamQuestion', examQuestionSchema);

export default ExamQuestion;
