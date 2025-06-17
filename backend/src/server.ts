// backend/src/server.ts

import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { VolunteerOpportunity } from './types/VolunteerOpportunity';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

const dataPath = path.join(__dirname, 'data', 'Data.json');

// Helper function to handle single or array query params
const getQueryAsArray = (value: any): string[] => {
  if (!value) return [];
  if (Array.isArray(value)) return value as string[];
  return [value as string];
};

// Get a single opportunity by ID
app.get('/api/Data/:id', (req: Request, res: Response) => {
  try {
    const rawData = fs.readFileSync(dataPath, 'utf-8');
    const opportunities = JSON.parse(rawData);

    const { id } = req.params;
    const opportunity = opportunities.find((opp: any) => opp.id === id);

    if (opportunity) {
      res.status(200).json(opportunity);
    } else {
      res.status(404).json({ error: 'Opportunity not found' });
    }
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({
      error: 'Failed to load data',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// Get all opportunities with filtering and sorting
app.get('/api/Data', (req: Request, res: Response) => {
  try {
    const rawData = fs.readFileSync(dataPath, 'utf-8');
    const rawOpportunities = JSON.parse(rawData);

    let opportunities: VolunteerOpportunity[] = rawOpportunities.map((opp: any) => ({
      ...opp,
      startdate: new Date(opp.startdate),
      enddate: new Date(opp.enddate),
    }));

    // Search Functionality
    const { search } = req.query;
    if (typeof search === 'string' && search.trim() !== '') {
      const searchTerm = search.toLowerCase();
      opportunities = opportunities.filter(opp =>
        opp.title.toLowerCase().includes(searchTerm)
      );
    }

    // Filtering Functionality
    const locations = getQueryAsArray(req.query.locations);
    const timeCommitments = getQueryAsArray(req.query.timeCommitments);
    const ageRequirements = getQueryAsArray(req.query.ageRequirements);
    const dateFilter = req.query.date as string;

    if (locations.length > 0) {
      opportunities = opportunities.filter(opp => locations.includes(opp.location));
    }
    if (timeCommitments.length > 0) {
      opportunities = opportunities.filter(opp =>
        timeCommitments.includes(opp.timeCommitment)
      );
    }
    if (ageRequirements.length > 0) {
      opportunities = opportunities.filter(opp =>
        ageRequirements.includes(opp.ageRequirement)
      );
    }

    if (dateFilter) {
      const now = new Date();
      if (dateFilter === 'This week') {
        const firstDayOfWeek = new Date(now);
        firstDayOfWeek.setDate(now.getDate() - now.getDay());
        const lastDayOfWeek = new Date(firstDayOfWeek);
        lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6);
        opportunities = opportunities.filter(
          opp => opp.startdate >= firstDayOfWeek && opp.startdate <= lastDayOfWeek
        );
      } else if (dateFilter === 'This Month') {
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        opportunities = opportunities.filter(
          opp => opp.startdate >= startOfMonth && opp.startdate <= endOfMonth
        );
      }
    }

    // Sorting Functionality
    const sortValue = (req.query.sort as string) || 'Newest';
    
    console.log('Sorting by:', sortValue);
    console.log('Sample dates before sort:', opportunities.slice(0, 2).map(o => ({ title: o.title, startdate: o.startdate })));

    opportunities.sort((a, b) => {
      switch (sortValue) {
        case 'Oldest':
          // Sort by startdate ascending (oldest first)
          return a.startdate.getTime() - b.startdate.getTime();
          
        case 'Alphabetically, A-Z':
          // Sort alphabetically A to Z
          return a.title.localeCompare(b.title);
          
        case 'Alphabetically, Z-A':
          // Sort alphabetically Z to A
          return b.title.localeCompare(a.title);
          
        case 'Newest':
        default:
          // Sort by startdate descending (newest first)
          return b.startdate.getTime() - a.startdate.getTime();
      }
    });

    console.log('Sample data after sort:', opportunities.slice(0, 3).map(o => ({ title: o.title, startdate: o.startdate.toISOString().split('T')[0] })));

    res.status(200).json(opportunities);
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({
      error: 'Failed to load data',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export default app;

