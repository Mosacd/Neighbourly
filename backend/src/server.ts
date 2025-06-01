import express from 'express';
import path from 'path';
import fs from 'fs';
import { VolunteerOpportunity } from './types/VolunteerOpportunity';

const app = express();
const PORT = process.env.PORT || 3001; // Fallback to 3001 if PORT not set

// Middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// Path to data file
const dataPath = path.join(__dirname, 'data', 'Data.json');

// Root endpoint
app.get('/', (req, res) => {
  res.send(`
    <h1>Volunteer Data API</h1>
    <p>Access data at <a href="/api/Data">/api/Data</a></p>
  `);
});

// Main data endpoint
app.get('/api/Data', (req, res) => {
  try {
    const rawData = fs.readFileSync(dataPath, 'utf-8');
    const data: VolunteerOpportunity[] = JSON.parse(rawData);
    res.json(data);
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ 
      error: 'Failed to load data',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Only start the server if not in test environment
if (process.env.NODE_ENV !== 'test') {
  const server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Data file path: ${dataPath}`); 
  });

  // Handle server errors
  server.on('error', (error: NodeJS.ErrnoException) => {
    if (error.code === 'EADDRINUSE') {
      console.error(`Port ${PORT} is already in use. Try:`);
      console.error(`1. Changing the PORT environment variable`);
      console.error(`2. Running 'npx kill-port ${PORT}'`);
      console.error(`3. Waiting a minute and trying again`);
    } else {
      console.error('Server error:', error);
    }
  });
}

export default app;