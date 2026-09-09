import dbConnect from './lib/db.js';
import { User } from './lib/models.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    if (!process.env.MONGODB_URI || !process.env.JWT_SECRET) {
      console.error('Authentication service is not configured');
      return res.status(500).json({ message: 'Server configuration error' });
    }
    await dbConnect();
    const { username, password } = req.body || {};

    if (typeof username !== 'string' || typeof password !== 'string' || !username.trim() || !password || username.length > 100 || password.length > 200) {
      return res.status(400).json({ message: 'Missing username or password' });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username, assignedPanel: user.assignedPanel, role: user.role || 'volunteer' },
      process.env.JWT_SECRET,
      { expiresIn: '12h' }
    );

    res.status(200).json({ 
      token, 
      user: { username: user.username, assignedPanel: user.assignedPanel, role: user.role || 'volunteer' } 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}
