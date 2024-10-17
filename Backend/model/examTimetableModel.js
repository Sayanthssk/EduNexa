import mongoose from 'mongoose';

const examTimetableSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['public', 'internal'], 
    required: true 
  }
});

const ExamTimetable = mongoose.model('ExamTimetable', examTimetableSchema);
export default ExamTimetable;
