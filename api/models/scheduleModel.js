import mongoose from 'mongoose';

const scheduleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    time: { type: Date, required: true },
    description: { type: String },
});

export default scheduleSchema;