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
