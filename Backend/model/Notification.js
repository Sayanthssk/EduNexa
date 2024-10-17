import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  message: { 
    type: String, 
    required: true 
  },
  type: { 
    type: String, 
    enum: ['fee', 'exam', 'other'], 
    required: true 
  },
  examType: { 
    type: String, 
    enum: ['public', 'internal'], 
    required: function() { return this.type === 'exam'; } 
  },
  startDate: { 
    type: Date, 
    required: function() { return this.type === 'exam'; } 
  },
  timestamp: { 
    type: Date, 
    default: Date.now 
  }
});

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;
