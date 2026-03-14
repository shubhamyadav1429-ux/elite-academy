const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Standard = require('./models/Standard');
const Subject = require('./models/Subject');

dotenv.config();

const SUBJECTS = ['English', 'Maths', 'Science', 'Geography'];

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('Error connecting to DB', error);
        process.exit(1);
    }
};

const seedSubjects = async () => {
    try {
        await connectDB();

        const standards = await Standard.find();

        if (standards.length === 0) {
            console.log('No standards found! Please run seed.js first.');
            process.exit(1);
        }

        let totalAdded = 0;

        for (const std of standards) {
            for (const subjectName of SUBJECTS) {
                const exists = await Subject.findOne({ name: subjectName, standard: std._id });
                if (!exists) {
                    await Subject.create({ name: subjectName, standard: std._id });
                    console.log(`  ✅ Added "${subjectName}" to ${std.name}`);
                    totalAdded++;
                } else {
                    console.log(`  ⏭️  "${subjectName}" already exists in ${std.name}`);
                }
            }
        }

        console.log(`\n🎉 Done! ${totalAdded} new subjects added across ${standards.length} standards.`);
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedSubjects();
