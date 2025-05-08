import mongoose from 'mongoose';

const scheduleSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: { type: String, required: true },
    time: { type: Date, required: true },
    description: { type: String },  
});

const Schedule = mongoose.model('Schedule', scheduleSchema);
export default Schedule;