import mongoose from 'mongoose';

const uri = 'mongodb+srv://Teddy:u8ZkM0th3jtuEVFt@cluster0.vaaeb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const db = async () => {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected!');
    } catch (error) {
        console.error('Connection error:', error);
        process.exit(1); // Exit process with failure
    }
};

export default db;
