// backend/src/server.spec.ts

import request from 'supertest';
import app from './server';

// Define a simple interface for the API response items to make tests cleaner.
interface OpportunityResponse {
  id: string;
  title: string;
}

describe('Neighbourly API Endpoints', () => {
  
  // --- Tests for the single item endpoint: GET /api/Data/:id ---
  describe('GET /api/Data/:id', () => {
    it('should return a single opportunity for a valid ID', async () => {
      const response = await request(app).get('/api/Data/1');
      
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body.id).toBe('1');
      expect(response.body.title).toBe('Library Reading Buddy Program');
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
      it('should return all items sorted by "Newest" by default when no params are given', async () => {
        const response = await request(app).get('/api/Data');
        
        expect(response.status).toBe(200);
        const ids = response.body.map((opp: OpportunityResponse) => opp.id);
        
        // Expected order by date descending: Sept (3), Aug (2), July (1)
        expect(ids).toEqual(['3', '2', '1']);
      });
    });

    describe('Sorting Functionality', () => {
      it('should sort by date ascending when sort=Oldest', async () => {
        const response = await request(app).get('/api/Data?sort=Oldest');
        
        expect(response.status).toBe(200);
        const ids = response.body.map((opp: OpportunityResponse) => opp.id);
        
        // Expected order by date ascending: July (1), Aug (2), Sept (3)
        expect(ids).toEqual(['1', '2', '3']);
      });
      
      it('should sort by name A-Z when sort="Alphabetically, A-Z"', async () => {
        // supertest automatically handles URL encoding the comma and space
        const response = await request(app).get('/api/Data?sort=Alphabetically, A-Z');
        
        expect(response.status).toBe(200);
        const titles = response.body.map((opp: OpportunityResponse) => opp.title);
        
        // Expected alphabetical order: Community, Library, Park
        expect(titles).toEqual([
          'Community Food Drive',
          'Library Reading Buddy Program',
          'Park Cleanup Crew'
        ]);
      });
      
      it('should sort by name Z-A when sort="Alphabetically, Z-A"', async () => {
        const response = await request(app).get('/api/Data?sort=Alphabetically, Z-A');
        
        expect(response.status).toBe(200);
        const titles = response.body.map((opp: OpportunityResponse) => opp.title);

        // Expected reverse alphabetical order: Park, Library, Community
        expect(titles).toEqual([
          'Park Cleanup Crew',
          'Library Reading Buddy Program',
          'Community Food Drive'
        ]);
      });
    });

    describe('Filtering and Search Functionality', () => {
        it('should search by title, case-insensitively', async () => {
            const response = await request(app).get('/api/Data?search=park');
            expect(response.status).toBe(200);
            expect(response.body.length).toBe(1);
            expect(response.body[0].id).toBe('2');
        });

        it('should filter by a single location', async () => {
            const response = await request(app).get('/api/Data?locations=Downtown');
            expect(response.status).toBe(200);
            expect(response.body.length).toBe(1);
            expect(response.body[0].id).toBe('1');
        });

        it('should filter by age requirement', async () => {
            // The '+' in '18+' must be URL-encoded to '%2B'
            const response = await request(app).get('/api/Data?ageRequirements=18%2B');
            expect(response.status).toBe(200);
            expect(response.body.length).toBe(1);
            expect(response.body[0].id).toBe('3');
        });

        it('should handle multiple filters at once', async () => {
            // Find events in the 'Eastside' that require '18+'
            const response = await request(app).get('/api/Data?locations=Eastside&ageRequirements=18%2B');
            expect(response.status).toBe(200);
            expect(response.body.length).toBe(1);
            expect(response.body[0].id).toBe('3');
        });
    });

    describe('Combined Functionality', () => {
        it('should filter by location and then sort the results correctly', async () => {
            // 1. Filter for items in 'Downtown' or 'Westside'
            // 2. Sort the results alphabetically
            const response = await request(app).get('/api/Data?locations=Downtown&locations=Westside&sort=Alphabetically, A-Z');
            expect(response.status).toBe(200);
            expect(response.body.length).toBe(2);

            const titles = response.body.map((opp: OpportunityResponse) => opp.title);

            // Expect the two results to be sorted: Library, then Park
            expect(titles).toEqual([
                'Library Reading Buddy Program',
                'Park Cleanup Crew'
            ]);
        });
    });
  });
});

