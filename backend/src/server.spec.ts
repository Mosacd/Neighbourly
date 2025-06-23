import request from 'supertest';
import app from './server';
import { VolunteerOpportunity } from './types/VolunteerOpportunity';
import fs from 'fs';
import path from 'path';


const dataPath = path.join(__dirname, 'data', 'Data.json');
let originalData: string;

beforeAll(() => {
    originalData = fs.readFileSync(dataPath, 'utf-8');
});

afterEach(() => {
    fs.writeFileSync(dataPath, originalData);
});

describe('Neighbourly API Endpoints', () => {

    describe('GET /api/Data/:id', () => {
        it('should return a single opportunity for a valid ID', async () => {
            const response = await request(app).get('/api/Data/1');
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body.id).toBe('1');
            expect(response.body.title).toBe('Library Reading Buddy Program');
            expect(typeof response.body.image).toBe('string');
            expect(typeof response.body.startdate).toBe('string');
        });

        it('should return 404 Not Found for an ID that does not exist', async () => {
            const response = await request(app).get('/api/Data/999');
            expect(response.status).toBe(404);
            expect(response.body.error).toBe('Opportunity not found');
        });
    });

    describe('GET /api/Data', () => {
        describe('Default Behavior', () => {
            it('should return all 8 items sorted by "Newest" by default', async () => {
                const response = await request(app).get('/api/Data');
                expect(response.status).toBe(200);
                expect(response.body.length).toBe(8);
                const ids = response.body.map((opp: VolunteerOpportunity) => opp.id);
                expect(ids).toEqual(['8', '7', '3', '6', '2', '4', '1', '5']);
            });
        });

        describe('Sorting Functionality', () => {
            it('should sort by date ascending when sort=Oldest', async () => {
                const response = await request(app).get('/api/Data?sort=Oldest');
                expect(response.status).toBe(200);
                const ids = response.body.map((opp: VolunteerOpportunity) => opp.id);
                expect(ids).toEqual(['5', '1', '4', '2', '6', '3', '7', '8']);
            });

            it('should sort by title A-Z when sort="Alphabetically, A-Z"', async () => {
                const response = await request(app).get('/api/Data?sort=Alphabetically, A-Z');
                expect(response.status).toBe(200);
                const titles = response.body.map((opp: VolunteerOpportunity) => opp.title);
                expect(titles).toEqual([
                    'Animal Shelter Weekend Helper',
                    'Annual Arts Festival Support',
                    'Community Food Drive',
                    'Community Garden Tending',
                    'Library Reading Buddy Program',
                    'Park Cleanup Crew',
                    'Senior Companion Visitor',
                    'Youth Soccer Coach Assistant'
                ]);
            });

            it('should sort by title Z-A when sort="Alphabetically, Z-A"', async () => {
                const response = await request(app).get('/api/Data?sort=Alphabetically, Z-A');
                expect(response.status).toBe(200);
                const titles = response.body.map((opp: VolunteerOpportunity) => opp.title);
                expect(titles).toEqual([
                    'Youth Soccer Coach Assistant',
                    'Senior Companion Visitor',
                    'Park Cleanup Crew',
                    'Library Reading Buddy Program',
                    'Community Garden Tending',
                    'Community Food Drive',
                    'Annual Arts Festival Support',
                    'Animal Shelter Weekend Helper'
                ]);
            });
        });

        describe('Filtering and Search Functionality', () => {
            it('should search by title, case-insensitively', async () => {
                const response = await request(app).get('/api/Data?search=park');
                expect(response.status).toBe(200);
                expect(response.body.length).toBe(1);
                expect(response.body[0].title).toBe('Park Cleanup Crew');
                expect(response.body[0].id).toBe('2');
            });

            it('should filter by a single location', async () => {
                const response = await request(app).get('/api/Data?locations=Downtown');
                expect(response.status).toBe(200);
                expect(response.body.length).toBe(2);
                const ids = response.body.map((opp: VolunteerOpportunity) => opp.id);
                expect(ids).toContain('1');
                expect(ids).toContain('8');
            });

            it('should filter by age requirement', async () => {
                const response = await request(app).get('/api/Data?ageRequirements=18%2B');
                expect(response.status).toBe(200);
                expect(response.body.length).toBe(3);
                const ids = response.body.map((opp: VolunteerOpportunity) => opp.id);
                expect(ids).toContain('3');
                expect(ids).toContain('4');
                expect(ids).toContain('5');
            });

            it('should handle multiple filters at once', async () => {
                const response = await request(app).get('/api/Data?locations=Eastside&ageRequirements=18%2B');
                expect(response.status).toBe(200);
                expect(response.body.length).toBe(1);
                expect(response.body[0].id).toBe('3');
            });
        });

        describe('Combined Functionality', () => {
            it('should filter by location and then sort the results correctly', async () => {
                const response = await request(app).get('/api/Data?locations=Downtown&locations=Westside&sort=Alphabetically, A-Z');
                expect(response.status).toBe(200);
                expect(response.body.length).toBe(4);
                const titles = response.body.map((opp: VolunteerOpportunity) => opp.title);
                expect(titles).toEqual([
                    'Annual Arts Festival Support',
                    'Library Reading Buddy Program',
                    'Park Cleanup Crew',
                    'Youth Soccer Coach Assistant'
                ]);
            });
        });
    });

    describe('POST /api/Data', () => {
        it('should add a new opportunity and return it with a new ID', async () => {
            const newOppData = {
                title: "Test Event: Community Tree Planting",
                location: "Central Park",
                shortDescription: "Help plant new trees in the park.",
                detailedDescription: "A detailed description of the tree planting event.",
                schedule: "Saturday, 10 AM - 1 PM",
                start: "2026-04-22T10:00:00.000Z",
                end: "2026-04-22T13:00:00.000Z",
            };

            const response = await request(app)
                .post('/api/Data')
                .send(newOppData);

            expect(response.status).toBe(201);
            
            expect(response.body).toBeInstanceOf(Object);

            expect(response.body.id).toBeDefined();
            expect(typeof response.body.id).toBe('string');

            expect(response.body.title).toBe(newOppData.title);
            expect(response.body.Briefdescription).toBe(newOppData.shortDescription);
            expect(response.body.description).toBe(newOppData.detailedDescription);

            const updatedRawData = fs.readFileSync(dataPath, 'utf-8');
            const updatedOpportunities = JSON.parse(updatedRawData);
            
            expect(updatedOpportunities.length).toBe(9);
            const addedEvent = updatedOpportunities.find((opp: any) => opp.id === response.body.id);
            expect(addedEvent).toBeDefined();
            expect(addedEvent.title).toBe(newOppData.title);
        });

        it('should return 400 Bad Request if required fields are missing', async () => {
            const incompleteData = {
                title: "Incomplete Test Event",
            };

            const response = await request(app)
                .post('/api/Data')
                .send(incompleteData);
            
            expect(response.status).toBe(400);
            expect(response.body.error).toBe('Missing required fields');
        });
    });
});