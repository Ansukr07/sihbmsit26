import dbConnect from './lib/db.js';
import { Panel } from './lib/models.js';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    if (!process.env.MONGODB_URI || !process.env.JWT_SECRET) {
      console.error('Panel service is not configured');
      return res.status(500).json({ message: 'Server configuration error' });
    }
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    await dbConnect();
    
    const { panelNumber, currentTeamIndex } = req.body || {};
    const parsedPanelNumber = Number(panelNumber);
    const parsedTeamIndex = Number(currentTeamIndex);

    if (!Number.isInteger(parsedPanelNumber) || parsedPanelNumber < 1 || parsedPanelNumber > 5) {
      return res.status(400).json({ message: 'Invalid panel number' });
    }

    if (!Number.isInteger(parsedTeamIndex) || parsedTeamIndex < 0) {
      return res.status(400).json({ message: 'Invalid team index' });
    }

    if (decoded.role !== 'admin' && decoded.assignedPanel !== parsedPanelNumber) {
      return res.status(403).json({ message: 'Forbidden: You can only update your assigned panel.' });
    }

    const existingPanel = await Panel.findOne({ panelNumber: parsedPanelNumber }).select('teamsList');
    if (!existingPanel || !Array.isArray(existingPanel.teamsList) || existingPanel.teamsList.length < 3) {
      return res.status(404).json({ message: 'Panel or team list not found' });
    }
    if (parsedTeamIndex >= existingPanel.teamsList.length) return res.status(400).json({ message: 'Invalid team index' });

    const panel = await Panel.findOneAndUpdate(
      { panelNumber: parsedPanelNumber },
      {
        currentTeamIndex: parsedTeamIndex,
        currentTeam: existingPanel.teamsList[parsedTeamIndex],
        lastUpdated: new Date()
      },
      { new: true }
    );

    if (!panel) {
      return res.status(404).json({ message: 'Panel not found' });
    }

    res.status(200).json(panel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}
