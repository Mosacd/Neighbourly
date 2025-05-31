export interface VolunteerOpportunity {
  id: string;
  title: string;
  description: string;
  startdate: Date; 
  enddate?: Date; 
  schedule: string;
  location: string;
  tags: string; 
  organization?: string;
}