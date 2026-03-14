const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Standard = require('./models/Standard');
const User = require('./models/User');

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('Error connecting to DB', error);
        process.exit(1);
    }
};

const seedData = async () => {
    try {
        await connectDB();

        const standardsCount = await Standard.countDocuments();
        if (standardsCount === 0) {
            await Standard.create([
                { name: '8th Standard' },
                { name: '9th Standard' },
                { name: '10th Standard' }
            ]);
            console.log('Standards seeded successfully!');
        } else {
            console.log('Standards already exist.');
        }

        // Checking if an admin user exists
        const adminExists = await User.findOne({ role: 'admin' });
        if (!adminExists) {
            await User.create({
                name: 'Admin',
                email: 'admin@elite.com',
                password: 'password123',
                role: 'admin'
            });
            console.log('Default Admin created! (admin@elite.com / password123)');
        }

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedData();
