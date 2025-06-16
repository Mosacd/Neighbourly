import request from 'supertest';
import app from './server'; 
import testData from './data/Data.json';

describe('Test for Basic Endpoint', () => {
  it('should return 200 OK and all opportunities with no query params', async () => {
    const response = await request(app).get('/api/Data');

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBe(testData.length); 
    expect(response.body).toEqual(testData);
  });
});
describe('Test for Search Functionality', () => {
  it('should return only opportunities matching the search term', async () => {
    const response = await request(app).get('/api/Data?search=cleanup');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].title).toContain('Cleanup');
  });

  it('should return an empty array for a search term that matches nothing', async () => {
    const response = await request(app).get('/api/Data?search=nonexistenttermxyz');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(0);
  });
});

describe('Test for Sorting Functionality', () => {
  it('should sort opportunities by title in ascending order', async () => {
    const response = await request(app).get('/api/Data?sortBy=title&sortOrder=asc');
    expect(response.status).toBe(200);
    const titles = response.body.map((opp: { title: string }) => opp.title);
    expect(titles).toEqual(['Community Food Drive', 'Library Reading Buddy Program', 'Park Cleanup Crew']);
  });

  it('should sort opportunities by startdate in descending order', async () => {
    const response = await request(app).get('/api/Data?sortBy=startdate&sortOrder=desc');
    expect(response.status).toBe(200);
    const ids = response.body.map((opp: { id: string }) => opp.id);
    expect(ids).toEqual(['3', '2', '1']);
  });
});

describe('Test for Filtering Functionality', () => {
  it('should filter opportunities by a single tag', async () => {
    const response = await request(app).get('/api/Data?tags=education');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].id).toBe('1');
  });

  it('should filter opportunities by location', async () => {
    const response = await request(app).get('/api/Data?location=Riverside Park');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].id).toBe('2');
  });
});

