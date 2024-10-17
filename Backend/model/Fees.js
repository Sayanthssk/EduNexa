import mongoose from 'mongoose';

const feeSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  amount: { 
    type: Number, 
    required: true 
  },
  lastDate: { 
    type: Date, 
    required: true 
  },
  
  description: { 
    type: String 
  }
}, { timestamps: true });

const Fee = mongoose.model('Fee', feeSchema);

export default Fee;
