import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { VolunteerOpportunity } from './types/VolunteerOpportunity';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../public')));

const dataPath = path.join(__dirname, 'data', 'Data.json');

const getQueryAsArray = (value: any): string[] => {
    if (!value) return [];
    if (Array.isArray(value)) return value as string[];
    return [value as string];
};

app.get('/api/Data/:id', (req: Request, res: Response) => {
    try {
        const rawData = fs.readFileSync(dataPath, 'utf-8');
        const opportunities: VolunteerOpportunity[] = JSON.parse(rawData);

        const { id } = req.params;
        const opportunity = opportunities.find((opp) => opp.id === id);

        if (opportunity) {
            return res.status(200).json(opportunity);
        } else {
            return res.status(404).json({ error: 'Opportunity not found' });
        }
    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).json({
            error: 'Failed to load data',
            details: error instanceof Error ? error.message : 'Unknown error',
        });
    }
});

app.post('/api/Data', (req: Request, res: Response) => {
    try {
        const rawData = fs.readFileSync(dataPath, 'utf-8');
        const opportunities: VolunteerOpportunity[] = JSON.parse(rawData);
        
        const {
            title,
            location,
            shortDescription,
            detailedDescription,
            schedule,
            start,
            end,
            timeCommitment = "Not specified",
            ageRequirement = "Any",
            organization = "Community Submission",
            image = "/images/default-event.jpg"
        } = req.body;

        if (!title || !location || !shortDescription || !detailedDescription || !schedule || !start || !end) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        
        const newOpportunity: VolunteerOpportunity = {
            id: Date.now().toString(), 
            title,
            Briefdescription: shortDescription, 
            description: detailedDescription, 
            startdate: new Date(start), 
            enddate: new Date(end), 
            schedule,
            location,
            timeCommitment,
            ageRequirement,
            organization,
            image,
        };

        opportunities.push(newOpportunity);
        fs.writeFileSync(dataPath, JSON.stringify(opportunities, null, 2));
       
        return res.status(201).json(newOpportunity);
    } catch (error) {
        console.error('Server error on POST /api/Data:', error);
        return res.status(500).json({
            error: 'Failed to save new opportunity',
            details: error instanceof Error ? error.message : 'Unknown error',
        });
    }
});

app.get('/api/Data', (req: Request, res: Response) => {
    try {
        const rawData = fs.readFileSync(dataPath, 'utf-8');
        let opportunities: VolunteerOpportunity[] = JSON.parse(rawData).map((opp: any) => ({
            ...opp,
            startdate: new Date(opp.startdate),
            enddate: new Date(opp.enddate),
        }));

        const { search } = req.query;
        if (typeof search === 'string' && search.trim() !== '') {
            const searchTerm = search.toLowerCase();
            opportunities = opportunities.filter(opp =>
                opp.title.toLowerCase().includes(searchTerm)
            );
        }

        const locations = getQueryAsArray(req.query.locations);
        const timeCommitments = getQueryAsArray(req.query.timeCommitments);
        const ageRequirements = getQueryAsArray(req.query.ageRequirements);
        const dateFilter = req.query.date as string;

        if (locations.length > 0) {
            opportunities = opportunities.filter(opp => locations.includes(opp.location));
        }
        if (timeCommitments.length > 0) {
            opportunities = opportunities.filter(opp => timeCommitments.includes(opp.timeCommitment));
        }
        if (ageRequirements.length > 0) {
            opportunities = opportunities.filter(opp => ageRequirements.includes(opp.ageRequirement));
        }
        if (dateFilter) {
            const now = new Date();
            if (dateFilter === 'This week') {
                const firstDayOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
                const lastDayOfWeek = new Date(firstDayOfWeek.setDate(firstDayOfWeek.getDate() + 6));
                opportunities = opportunities.filter(
                    opp => new Date(opp.startdate) >= firstDayOfWeek && new Date(opp.startdate) <= lastDayOfWeek
                );
            } else if (dateFilter === 'This Month') {
                const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
                const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
                opportunities = opportunities.filter(
                    opp => new Date(opp.startdate) >= startOfMonth && new Date(opp.startdate) <= endOfMonth
                );
            }
        }

        let sortValue = (req.query.sort as string) || 'Newest';
        sortValue = sortValue.replace('>', '').trim();

        opportunities.sort((a, b) => {
            switch (sortValue) {
                case 'Oldest':
                    return new Date(a.startdate).getTime() - new Date(b.startdate).getTime();
                case 'Alphabetically, A-Z':
                    return a.title.localeCompare(b.title);
                case 'Alphabetically, Z-A':
                    return b.title.localeCompare(a.title);
                case 'Newest':
                default:
                    return new Date(b.startdate).getTime() - new Date(a.startdate).getTime();
            }
        });

        return res.status(200).json(opportunities);
    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).json({
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