const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Standard = require('./models/Standard');
const Subject = require('./models/Subject');
const Chapter = require('./models/Chapter');
const Video = require('./models/Video');
const MCQ = require('./models/MCQ');

dotenv.config();

// YouTube embed URL (converted from short link)
const VIDEO_URL = 'https://www.youtube.com/embed/QzsuyXajbFI';

// MCQs per chapter (4 options each, correctAnswer must match one option exactly)
const CHAPTER_DATA = {
    'Laws of Motion': {
        videoTitle: 'Laws of Motion - 9th Science',
        mcqs: [
            {
                question: "Newton's First Law of Motion is also known as the law of ___.",
                options: ['Inertia', 'Acceleration', 'Action-Reaction', 'Gravitation'],
                correctAnswer: 'Inertia'
            },
            {
                question: 'Which of the following has the greatest inertia?',
                options: ['A cricket ball', 'A rubber ball', 'A stone', 'A feather'],
                correctAnswer: 'A stone'
            },
            {
                question: "According to Newton's Second Law, Force equals ___.",
                options: ['Mass × Velocity', 'Mass × Acceleration', 'Mass / Acceleration', 'Velocity / Time'],
                correctAnswer: 'Mass × Acceleration'
            },
            {
                question: 'The SI unit of force is ___.',
                options: ['Joule', 'Pascal', 'Newton', 'Watt'],
                correctAnswer: 'Newton'
            },
            {
                question: "Newton's Third Law states that every action has an equal and ___ reaction.",
                options: ['Similar', 'Opposite', 'Greater', 'Smaller'],
                correctAnswer: 'Opposite'
            }
        ]
    },
    'Work and Energy': {
        videoTitle: 'Work and Energy - 9th Science',
        mcqs: [
            {
                question: 'Work is said to be done when a force causes ___ in the direction of force.',
                options: ['Speed', 'Displacement', 'Rotation', 'Pressure'],
                correctAnswer: 'Displacement'
            },
            {
                question: 'The SI unit of work and energy is ___.',
                options: ['Newton', 'Watt', 'Joule', 'Pascal'],
                correctAnswer: 'Joule'
            },
            {
                question: 'Kinetic energy is the energy possessed by a body due to its ___.',
                options: ['Position', 'Motion', 'Temperature', 'Shape'],
                correctAnswer: 'Motion'
            },
            {
                question: 'Potential energy is the energy possessed by a body due to its ___.',
                options: ['Motion', 'Color', 'Position or configuration', 'Sound'],
                correctAnswer: 'Position or configuration'
            },
            {
                question: 'The law of conservation of energy states that energy can be ___ but not created or destroyed.',
                options: ['Multiplied', 'Divided', 'Converted', 'Eliminated'],
                correctAnswer: 'Converted'
            }
        ]
    },
    'Current Electricity': {
        videoTitle: 'Current Electricity - 9th Science',
        mcqs: [
            {
                question: 'Electric current is the flow of ___.',
                options: ['Protons', 'Neutrons', 'Electrons', 'Photons'],
                correctAnswer: 'Electrons'
            },
            {
                question: 'The SI unit of electric current is ___.',
                options: ['Volt', 'Ampere', 'Ohm', 'Watt'],
                correctAnswer: 'Ampere'
            },
            {
                question: 'The SI unit of electric resistance is ___.',
                options: ['Ampere', 'Volt', 'Ohm', 'Joule'],
                correctAnswer: 'Ohm'
            },
            {
                question: "According to Ohm's Law, V = ___.",
                options: ['I / R', 'I × R', 'R / I', 'I + R'],
                correctAnswer: 'I × R'
            },
            {
                question: 'In a series circuit, the current through each component is ___.',
                options: ['Different', 'Zero', 'Same', 'Doubled'],
                correctAnswer: 'Same'
            }
        ]
    },
    'Measurement of Matter': {
        videoTitle: 'Measurement of Matter - 9th Science',
        mcqs: [
            {
                question: 'The SI unit of mass is ___.',
                options: ['Gram', 'Pound', 'Kilogram', 'Milligram'],
                correctAnswer: 'Kilogram'
            },
            {
                question: 'The amount of space occupied by matter is called ___.',
                options: ['Mass', 'Weight', 'Volume', 'Density'],
                correctAnswer: 'Volume'
            },
            {
                question: 'Density is defined as ___.',
                options: ['Volume / Mass', 'Mass × Volume', 'Mass / Volume', 'Mass + Volume'],
                correctAnswer: 'Mass / Volume'
            },
            {
                question: 'The SI unit of volume is ___.',
                options: ['Litre', 'Cubic metre', 'Millilitre', 'Cubic centimetre'],
                correctAnswer: 'Cubic metre'
            },
            {
                question: 'Which instrument is used to measure the volume of a liquid?',
                options: ['Thermometer', 'Barometer', 'Measuring cylinder', 'Hydrometer'],
                correctAnswer: 'Measuring cylinder'
            }
        ]
    },
    'Acids, Bases and Salts': {
        videoTitle: 'Acids, Bases and Salts - 9th Science',
        mcqs: [
            {
                question: 'The pH of a neutral solution is ___.',
                options: ['0', '7', '14', '1'],
                correctAnswer: '7'
            },
            {
                question: 'Acids turn blue litmus paper to ___.',
                options: ['Green', 'Yellow', 'Red', 'White'],
                correctAnswer: 'Red'
            },
            {
                question: 'Bases turn red litmus paper to ___.',
                options: ['Blue', 'Green', 'Yellow', 'Orange'],
                correctAnswer: 'Blue'
            },
            {
                question: 'The chemical formula of common salt (Sodium Chloride) is ___.',
                options: ['NaOH', 'HCl', 'NaCl', 'Na2SO4'],
                correctAnswer: 'NaCl'
            },
            {
                question: 'The reaction between an acid and a base is called ___.',
                options: ['Oxidation', 'Neutralisation', 'Reduction', 'Combustion'],
                correctAnswer: 'Neutralisation'
            }
        ]
    }
};

const main = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected\n');

        const standard = await Standard.findOne({ name: '9th Standard' });
        if (!standard) { console.log('❌ 9th Standard not found!'); process.exit(1); }

        const subject = await Subject.findOne({ name: 'Science', standard: standard._id });
        if (!subject) { console.log('❌ Science subject not found!'); process.exit(1); }

        const chapterNames = Object.keys(CHAPTER_DATA);
        let totalVideos = 0, totalMCQs = 0;

        for (const chapterName of chapterNames) {
            const chapter = await Chapter.findOne({ title: chapterName, subject: subject._id });
            if (!chapter) {
                console.log(`⚠️  Chapter not found: "${chapterName}" — skipping`);
                continue;
            }

            const { videoTitle, mcqs } = CHAPTER_DATA[chapterName];

            // Add Video
            const videoExists = await Video.findOne({ chapter: chapter._id });
            if (!videoExists) {
                await Video.create({ title: videoTitle, url: VIDEO_URL, chapter: chapter._id });
                console.log(`  🎥 Video added → ${chapterName}`);
                totalVideos++;
            } else {
                console.log(`  ⏭️  Video already exists → ${chapterName}`);
            }

            // Add MCQs
            let mcqsAdded = 0;
            for (const mcq of mcqs) {
                const exists = await MCQ.findOne({ question: mcq.question, chapter: chapter._id });
                if (!exists) {
                    await MCQ.create({ ...mcq, chapter: chapter._id });
                    mcqsAdded++;
                }
            }
            totalMCQs += mcqsAdded;
            console.log(`  ✅ ${mcqsAdded} MCQs added → ${chapterName}\n`);
        }

        console.log(`🎉 Done! ${totalVideos} videos & ${totalMCQs} MCQs added to 9th Standard → Science.`);
        process.exit();
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
};

main();
