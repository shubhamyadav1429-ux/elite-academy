const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Standard = require('./models/Standard');
const Subject = require('./models/Subject');
const Chapter = require('./models/Chapter');

dotenv.config();

const CHAPTERS = [
    'Sets',
    'Real Numbers',
    'Polynomials',
    'Ratio and Proportion',
    'Linear Equations in Two Variables',
    'Financial Planning',
    'Statistics'
];

const main = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected\n');

        const standard = await Standard.findOne({ name: '9th Standard' });
        if (!standard) { console.log('❌ 9th Standard not found!'); process.exit(1); }

        const subject = await Subject.findOne({ name: 'Maths', standard: standard._id });
        if (!subject) { console.log('❌ Maths subject not found under 9th Standard!'); process.exit(1); }

        console.log(`📗 Adding chapters to: ${standard.name} → ${subject.name}\n`);

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

        console.log(`\n🎉 Done! ${added} new chapters added to 9th Standard → Maths.`);
        process.exit();
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
};

main();
