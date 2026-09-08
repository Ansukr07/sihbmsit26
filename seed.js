import 'dotenv/config';
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

const panelSchema = new mongoose.Schema({
  panelNumber: { type: Number, required: true, unique: true },
  currentTeamIndex: { type: Number, required: true, min: 0, max: 9, default: 0 },
  currentTeam: { type: String, default: 'Not assigned' },
  waitingTeam: { type: String, default: 'Not assigned' },
  nextWaitingTeam: { type: String, default: 'Not assigned' },
  teamsList: {
    type: [String],
    required: true,
    validate: {
      validator: (teams) => teams.length === 10,
      message: 'Each panel must contain exactly 10 teams'
    }
  },
  lastUpdated: { type: Date, default: Date.now }
});

const Panel = mongoose.models.Panel || mongoose.model('Panel', panelSchema);

async function seed() {
  try {
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI is required');
    }
    if (process.env.ALLOW_DB_RESET !== 'true') {
      throw new Error('Panel reset requires ALLOW_DB_RESET=true');
    }
    await mongoose.connect(MONGODB_URI, { dbName: 'sihbmsit_round3' });
    console.log('Connected to MongoDB');

    // Clear existing
    await Panel.deleteMany({});
    console.log('Cleared existing data');

    const panels = [];

    for (let i = 1; i <= 5; i++) {
      const teamsList = [];
      for(let t=1; t<=10; t++) {
        teamsList.push(`Panel ${i} · Team ${t}`);
      }

      panels.push({
        panelNumber: i,
        currentTeamIndex: 0,
        currentTeam: teamsList[0],
        teamsList: teamsList
      });
    }

    await Panel.insertMany(panels);

    console.log('Panel data seeded successfully');
    console.log('Volunteer users were not changed. Add them separately after receiving credentials.');

    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
}

seed();
