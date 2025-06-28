import request from 'supertest';
import app from './server';
import { VolunteerOpportunity } from './types/VolunteerOpportunity';
import fs from 'fs/promises';
import path from 'path';

const dataPath = path.join(process.cwd(), 'src', 'data', 'Data.json');

let originalData: string;

beforeAll(async () => {
    try {
        originalData = await fs.readFile(dataPath, 'utf-8');
    } catch (e) {
        
        console.error(`FATAL TEST ERROR: Could not read test data file at: ${dataPath}`);
        originalData = '[]'; 
    }
});

afterEach(async () => {
    await fs.writeFile(dataPath, originalData);
});

describe('Neighbourly API Endpoints (File-Based DAL)', () => {

    describe('GET /api/Data/:id', () => {
        it('should return a single opportunity for a valid ID', async () => {
            const response = await request(app).get('/api/Data/1');
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body.id).toBe('1');
        });

        it('should return 404 Not Found for an ID that does not exist', async () => {
            const response = await request(app).get('/api/Data/999');
            expect(response.status).toBe(404);
            expect(response.body.error).toBe('Opportunity not found');
        });
    });

    describe('GET /api/Data', () => {
        it('should return all items sorted by "Newest" by default', async () => {
            const response = await request(app).get('/api/Data');
            expect(response.status).toBe(200);
            const originalItems = JSON.parse(originalData);
            expect(response.body.length).toBe(originalItems.length);
            const ids = response.body.map((opp: VolunteerOpportunity) => opp.id);
            expect(ids[0]).toBe('8');
        });
    });

    describe('POST /api/Data', () => {
        it('should add a new opportunity and return it with a new ID', async () => {
            const newOppData = {
                title: "Test Event: Community Tree Planting",
                location: "Central Park",
                shortDescription: "Help plant new trees in our beautiful city park.",
                detailedDescription: "A very detailed description of the tree planting event goes here to meet the length requirement.",
                schedule: "Saturday, 10 AM - 1 PM",
                start: "2026-04-22T10:00:00.000Z",
                end: "2026-04-22T13:00:00.000Z",
            };

            const response = await request(app)
                .post('/api/Data')
                .send(newOppData);

            expect(response.status).toBe(201);
            expect(response.body.id).toBeDefined();
            expect(response.body.title).toBe(newOppData.title);

            const updatedRawData = await fs.readFile(dataPath, 'utf-8');
            const updatedOpportunities = JSON.parse(updatedRawData);
            const originalCount = JSON.parse(originalData).length;
            expect(updatedOpportunities.length).toBe(originalCount + 1);
        });

        it('should return 400 Bad Request if required fields are missing', async () => {
            const incompleteData = { title: "Incomplete" };
            const response = await request(app)
                .post('/api/Data')
                .send(incompleteData);
            
            expect(response.status).toBe(400);
            expect(response.body.error).toBe('Invalid input');
        });
        
        it('should return 400 Bad Request for invalid date format', async () => {
             const invalidDateData = {
                title: "Test Event with Invalid Date",
                location: "Central Park",
                shortDescription: "Short description is long enough.",
                detailedDescription: "Detailed description is also definitely long enough for this test.",
                schedule: "Saturday, 10 AM - 1 PM",
                start: "not-a-date",
                end: "2026-04-22T13:00:00.000Z",
            };

            const response = await request(app)
                .post('/api/Data')
                .send(invalidDateData);

            expect(response.status).toBe(400);
            const startError = response.body.details.find((d: any) => d.path[0] === 'start');
            expect(startError.message).toBe('Start date must be a valid ISO date string');
        });
    });
});