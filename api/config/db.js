import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://mongo:27017/schedule-db', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('🚀✅ Đã kết nối với MongoDB...');
  } catch (error) {
    console.error('📦❌ Kết nối với MongoDB thất bại', error);
    process.exit(1);
  }
};

export default connectDB;