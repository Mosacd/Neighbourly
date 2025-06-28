import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { VolunteerOpportunity, CreateOpportunitySchema } from './types/VolunteerOpportunity';
import { dataService } from './data.service';
import { z } from 'zod';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const getQueryAsArray = (value: any): string[] => {
    if (!value) return [];
    if (Array.isArray(value)) return value as string[];
    return [value as string];
};



app.get('/api/Data/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const opportunity = await dataService.getById(id);

        if (opportunity) {
            return res.status(200).json(opportunity);
        } else {
            return res.status(404).json({ error: 'Opportunity not found' });
        }
    } catch (error) {
        next(error);
    }
});

app.post('/api/Data', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData = CreateOpportunitySchema.parse(req.body);

        const newOpportunityData = {
            title: validatedData.title,
            Briefdescription: validatedData.shortDescription,
            description: validatedData.detailedDescription,
            startdate: new Date(validatedData.start).toISOString(),
            enddate: new Date(validatedData.end).toISOString(),
            schedule: validatedData.schedule,
            location: validatedData.location,
            timeCommitment: validatedData.timeCommitment,
            ageRequirement: validatedData.ageRequirement,
            organization: validatedData.organization,
            image: validatedData.image,
        };

        const addedOpportunity = await dataService.add(newOpportunityData);
       
        return res.status(201).json(addedOpportunity);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: 'Invalid input', details: error.errors });
        }
        next(error);
    }
});


app.get('/api/Data', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const opportunitiesFromDb = await dataService.getAll();

        
        type ProcessedOpportunity = Omit<VolunteerOpportunity, 'startdate' | 'enddate'> & {
            startdate: Date;
            enddate: Date;
        };

       
        let processedOpportunities: ProcessedOpportunity[] = opportunitiesFromDb.map(opp => ({
            ...opp,
            startdate: new Date(opp.startdate),
            enddate: new Date(opp.enddate)
        }));

        const { search } = req.query;
        if (typeof search === 'string' && search.trim() !== '') {
            const searchTerm = search.toLowerCase();
            processedOpportunities = processedOpportunities.filter(opp =>
                opp.title.toLowerCase().includes(searchTerm)
            );
        }

        const locations = getQueryAsArray(req.query.locations);
        if (locations.length > 0) {
            processedOpportunities = processedOpportunities.filter(opp => locations.includes(opp.location));
        }

        const ageRequirements = getQueryAsArray(req.query.ageRequirements);
        if (ageRequirements.length > 0) {
            processedOpportunities = processedOpportunities.filter(opp => ageRequirements.includes(opp.ageRequirement));
        }

        const sortValue = (req.query.sort as string) || 'Newest';
        
        processedOpportunities.sort((a, b) => {
            switch (sortValue) {
                case 'Oldest':
                    return a.startdate.getTime() - b.startdate.getTime();
                case 'Alphabetically, A-Z':
                    return a.title.localeCompare(b.title);
                case 'Alphabetically, Z-A':
                    return b.title.localeCompare(a.title);
                case 'Newest':
                default:
                    return b.startdate.getTime() - a.startdate.getTime();
            }
        });

        const finalOpportunities = processedOpportunities.map(opp => ({
            ...opp,
            startdate: opp.startdate.toISOString(),
            enddate: opp.enddate.toISOString()
        }));

        return res.status(200).json(finalOpportunities);
    } catch (error) {
        next(error);
    }
});


app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('An unexpected error occurred:', err);
    res.status(500).json({
        error: 'Internal Server Error',
        message: err.message || 'Something went wrong',
    });
});


if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

export default app;