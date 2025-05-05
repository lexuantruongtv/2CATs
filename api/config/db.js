import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://mongo:27017/schedule-db', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('🚀✅MongoDB connected...');
  } catch (error) {
    console.error('📦❌MongoDB connection failed', error);
    process.exit(1);
  }
};

export default connectDB;