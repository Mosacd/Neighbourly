import request from 'supertest';
import app from './server';
// Use the real interface for better type safety
import { VolunteerOpportunity } from './types/VolunteerOpportunity';

describe('Neighbourly API Endpoints', () => {
  
  // --- Tests for the single item endpoint: GET /api/Data/:id ---
  describe('GET /api/Data/:id', () => {
    it('should return a single opportunity for a valid ID', async () => {
      const response = await request(app).get('/api/Data/1');
      
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body.id).toBe('1');
      expect(response.body.title).toBe('Library Reading Buddy Program');
      // ADDED: Verify the new image property exists
      expect(typeof response.body.image).toBe('string');
      // ADDED: Verify the date is returned as a string from this specific endpoint
      expect(typeof response.body.startdate).toBe('string');
    });

    it('should return 404 Not Found for an ID that does not exist', async () => {
      const response = await request(app).get('/api/Data/999');
      
      expect(response.status).toBe(404);
      expect(response.body.error).toBe('Opportunity not found');
    });
  });

  // --- Tests for the list endpoint: GET /api/Data ---
  describe('GET /api/Data', () => {

    describe('Default Behavior', () => {
      it('should return all 8 items sorted by "Newest" by default', async () => {
        const response = await request(app).get('/api/Data');
        
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(8);
        const ids = response.body.map((opp: VolunteerOpportunity) => opp.id);
        
        // UPDATED: Correct order for the new data (Oct -> Jun)
        expect(ids).toEqual(['8', '7', '3', '6', '2', '4', '1', '5']);
      });
    });

    describe('Sorting Functionality', () => {
      it('should sort by date ascending when sort=Oldest', async () => {
        const response = await request(app).get('/api/Data?sort=Oldest');
        
        expect(response.status).toBe(200);
        const ids = response.body.map((opp: VolunteerOpportunity) => opp.id);
        
        // UPDATED: Correct oldest-first order for the new data (Jun -> Oct)
        expect(ids).toEqual(['5', '1', '4', '2', '6', '3', '7', '8']);
      });
      
      it('should sort by title A-Z when sort="Alphabetically, A-Z"', async () => {
        const response = await request(app).get('/api/Data?sort=Alphabetically, A-Z');
        
        expect(response.status).toBe(200);
        const titles = response.body.map((opp: VolunteerOpportunity) => opp.title);
        
        // UPDATED: Correct alphabetical order for all 8 titles
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

        // UPDATED: Correct reverse-alphabetical order for all 8 titles
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
            // UPDATED: 'Downtown' now matches two items in the data
            const response = await request(app).get('/api/Data?locations=Downtown');
            expect(response.status).toBe(200);
            expect(response.body.length).toBe(2);
            const ids = response.body.map((opp: VolunteerOpportunity) => opp.id);
            expect(ids).toContain('1');
            expect(ids).toContain('8');
        });

        it('should filter by age requirement', async () => {
            // UPDATED: '18+' now matches three items in the data
            const response = await request(app).get('/api/Data?ageRequirements=18%2B');
            expect(response.status).toBe(200);
            expect(response.body.length).toBe(3);
            const ids = response.body.map((opp: VolunteerOpportunity) => opp.id);
            expect(ids).toContain('3');
            expect(ids).toContain('4');
            expect(ids).toContain('5');
        });

        it('should handle multiple filters at once', async () => {
            // This test was already correct for the new data
            const response = await request(app).get('/api/Data?locations=Eastside&ageRequirements=18%2B');
            expect(response.status).toBe(200);
            expect(response.body.length).toBe(1);
            expect(response.body[0].id).toBe('3');
        });
    });

    describe('Combined Functionality', () => {
        it('should filter by location and then sort the results correctly', async () => {
            // UPDATED: This query now returns 4 results instead of 2
            const response = await request(app).get('/api/Data?locations=Downtown&locations=Westside&sort=Alphabetically, A-Z');
            expect(response.status).toBe(200);
            expect(response.body.length).toBe(4);

            const titles = response.body.map((opp: VolunteerOpportunity) => opp.title);

            // UPDATED: Correct alphabetical order of the 4 filtered results
            expect(titles).toEqual([
                'Annual Arts Festival Support',
                'Library Reading Buddy Program',
                'Park Cleanup Crew',
                'Youth Soccer Coach Assistant'
            ]);
        });
    });
  });
});