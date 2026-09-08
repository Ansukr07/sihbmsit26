import dbConnect from './lib/db.js';
import { Panel } from './lib/models.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    if (!process.env.MONGODB_URI) {
      console.error('Panel service is not configured');
      return res.status(500).json({ message: 'Server configuration error' });
    }
    await dbConnect();
    const panels = await Panel.find({}).sort({ panelNumber: 1 });
    res.status(200).json(panels);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}
