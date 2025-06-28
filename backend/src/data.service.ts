import fs from 'fs/promises';
import path from 'path';
import { VolunteerOpportunity } from './types/VolunteerOpportunity';

const dataPath = path.join(__dirname, 'data', 'Data.json');

let isWriting = false;

class DataService {
  private opportunities: VolunteerOpportunity[] = [];
  private hasInitialized = false;

  constructor() {
    this.initialize();
  }

  private async initialize(): Promise<void> {
    try {
      const rawData = await fs.readFile(dataPath, 'utf-8');
      this.opportunities = JSON.parse(rawData);
      this.hasInitialized = true;
      console.log('Data service initialized successfully.');
    } catch (error) {
      console.error('Failed to initialize data service:', error);
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        this.opportunities = [];
        this.hasInitialized = true;
      } else {
        process.exit(1);
      }
    }
  }

  private async waitForInitialization(): Promise<void> {
    if (this.hasInitialized) {
        return;
    }
    return new Promise(resolve => {
        const interval = setInterval(() => {
            if (this.hasInitialized) {
                clearInterval(interval);
                resolve();
            }
        }, 100);
    });
  }

  private async persist(): Promise<void> {
    while (isWriting) {
      await new Promise(resolve => setTimeout(resolve, 50)); 
    }

    try {
      isWriting = true;
      const dataString = JSON.stringify(this.opportunities, null, 2);
      await fs.writeFile(dataPath, dataString, 'utf-8');
    } catch (error) {
      console.error('Failed to persist data:', error);
      throw new Error('Could not save data to file.');
    } finally {
      isWriting = false;
    }
  }

  public async getAll(): Promise<VolunteerOpportunity[]> {
    await this.waitForInitialization();
    return JSON.parse(JSON.stringify(this.opportunities));
  }

  public async getById(id: string): Promise<VolunteerOpportunity | undefined> {
    await this.waitForInitialization();
    return this.opportunities.find(opp => opp.id === id);
  }

  public async add(newOppData: Omit<VolunteerOpportunity, 'id'>): Promise<VolunteerOpportunity> {
    await this.waitForInitialization();
    const newOpportunity: VolunteerOpportunity = {
      ...newOppData,
      id: Date.now().toString(), 
    };
    this.opportunities.push(newOpportunity);
    await this.persist();
    return newOpportunity;
  }
}

export const dataService = new DataService();