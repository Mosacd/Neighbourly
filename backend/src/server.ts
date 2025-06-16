// src/server.ts

import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { VolunteerOpportunity } from './types/VolunteerOpportunity';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

const dataPath = path.join(__dirname, 'data', 'Data.json');

// Helper function to load and parse data to avoid repetition
const loadOpportunities = (): VolunteerOpportunity[] => {
  const rawData = fs.readFileSync(dataPath, 'utf-8');
  return JSON.parse(rawData);
};

app.get('/', (req, res) => {
  res.send(`
    <h1>Volunteer Data API</h1>
    <p>Access data at <a href="/api/Data">/api/Data</a></p>
    <p>Access a specific opportunity by ID, e.g., <a href="/api/Data/1">/api/Data/1</a></p>
  `);
});

// --- NEW ENDPOINT to get a single opportunity by ID ---
app.get('/api/Data/:id', (req: Request, res: Response) => {
  try {
    const opportunities = loadOpportunities();
    const { id } = req.params;
    
    const opportunity = opportunities.find(opp => opp.id === id);

    if (opportunity) {
      res.status(200).json(opportunity);
    } else {
      res.status(404).json({ error: 'Opportunity not found' });
    }
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({
      error: 'Failed to load data',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});


// Endpoint to get all opportunities with filtering/sorting
app.get('/api/Data', (req: Request, res: Response) => {
  try {
    let opportunities = loadOpportunities();

    // Search Functionality
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

    // Filtering Functionality
    const { location, tags } = req.query;
    if (typeof location === 'string' && location.trim() !== '') {
      const filterLocation = location.toLowerCase();
      opportunities = opportunities.filter(opp =>
        opp.location.toLowerCase().includes(filterLocation)
      );
    }
    if (typeof tags === 'string' && tags.trim() !== '') {
      const filterTags = tags.toLowerCase().split(',').map(tag => tag.trim());
      opportunities = opportunities.filter(opp =>
        filterTags.every(filterTag => opp.tags.toLowerCase().split(',').includes(filterTag))
      );
    }

    // Sorting Functionality
    const { sortBy, sortOrder } = req.query;
    if (typeof sortBy === 'string') {
      opportunities.sort((a, b) => {
        const key = sortBy as keyof VolunteerOpportunity;
        // Provide default empty string for optional fields to avoid errors
        const valA = a[key] ?? '';
        const valB = b[key] ?? '';

        if (valA < valB) return sortOrder === 'desc' ? 1 : -1;
        if (valA > valB) return sortOrder === 'desc' ? -1 : 1;
        return 0;
      });
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
    // This console.log is helpful for debugging the path during development
    console.log(`Expecting data file at: ${dataPath}`);
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
