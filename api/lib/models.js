import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  assignedPanel: { type: Number, required: true },
  role: { type: String, enum: ['volunteer', 'admin'], default: 'volunteer' }
});

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

export const User = mongoose.models.User || mongoose.model('User', userSchema);
export const Panel = mongoose.models.Panel || mongoose.model('Panel', panelSchema);
