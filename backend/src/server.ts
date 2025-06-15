import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { VolunteerOpportunity } from './types/VolunteerOpportunity';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001; 

app.use(cors()); 

const dataPath = path.join(__dirname, 'data', 'Data.json');

app.get('/', (req, res) => {
  res.send(`
    <h1>Volunteer Data API</h1>
    <p>Access data at <a href="/api/Data">/api/Data</a></p>
  `);
});

app.get('/api/Data', (req: Request, res: Response) => {
  try {
    const rawData = fs.readFileSync(dataPath, 'utf-8');
    let opportunities: VolunteerOpportunity[] = JSON.parse(rawData);

    const { search } = req.query;
    if (typeof search === 'string' && search.trim() !== '') {
      const searchTerm = search.toLowerCase();
      opportunities = opportunities.filter(opp =>
        opp.title.toLowerCase().includes(searchTerm) ||
        opp.Briefdescription.toLowerCase().includes(searchTerm) ||
        opp.description.toLowerCase().includes(searchTerm) ||
        opp.tags.toLowerCase().includes(searchTerm)
      );
    }

    res.status(200).json(opportunities);

  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ 
      error: 'Failed to load data',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

if (process.env.NODE_ENV !== 'test') {
  const server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Data file path: ${dataPath}`); 
  });

  server.on('error', (error: NodeJS.ErrnoException) => {
    if (error.code === 'EADDRINUSE') {
      console.error(`Port ${PORT} is already in use.`);
    } else {
      console.error('Server error:', error);
    }
  });
}

export default app;
