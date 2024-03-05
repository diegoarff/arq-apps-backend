import mongoose from 'mongoose';

const connection = async () => {
	try {
		console.log('Connecting to MongoDB...');
		const conn = await mongoose.connect(process.env.MONGODB_URI);
		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

export default connection;
