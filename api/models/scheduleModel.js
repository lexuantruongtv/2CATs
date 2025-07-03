import mongoose from 'mongoose';

const scheduleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    time: { type: Date, required: true },
    description: { type: String },
});

const Schedule = mongoose.model('Schedule', scheduleSchema);
export default Schedule;