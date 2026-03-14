const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Standard = require('./models/Standard');
const Subject = require('./models/Subject');
const Chapter = require('./models/Chapter');

dotenv.config();

const CHAPTERS = [
    'Life',
    'A Synopsis - The Swiss Family Robinson',
    "Have you ever seen ...?",
    "Have you thought of the verb 'have'",
    'The Necklace',
    'Invictus',
    'A True Story of Sea Turtles',
    "Somebody's Mother",
    'The Fall of Troy',
    'Autumn',
    'The Past in the Present'
];

const main = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected\n');

        // Find 9th Standard
        const standard = await Standard.findOne({ name: '9th Standard' });
        if (!standard) {
            console.log('❌ 9th Standard not found! Run seed.js first.');
            process.exit(1);
        }

        // Find English subject under 9th Standard
        const subject = await Subject.findOne({ name: 'English', standard: standard._id });
        if (!subject) {
            console.log('❌ English subject not found under 9th Standard!');
            process.exit(1);
        }

        console.log(`📘 Adding chapters to: ${standard.name} → ${subject.name}\n`);

        let added = 0;
        for (let i = 0; i < CHAPTERS.length; i++) {
            const title = CHAPTERS[i];
            const exists = await Chapter.findOne({ title, subject: subject._id });
            if (!exists) {
                await Chapter.create({ title, subject: subject._id });
                console.log(`  ✅ Ch.${i + 1}: ${title}`);
                added++;
            } else {
                console.log(`  ⏭️  Ch.${i + 1}: "${title}" already exists`);
            }
        }

        console.log(`\n🎉 Done! ${added} new chapters added to 9th Standard → English.`);
        process.exit();
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
};

main();
