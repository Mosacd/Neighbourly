export interface VolunteerOpportunity {
  id: string;
  title: string;
  Briefdescription: string;
  description: string;
  startdate: string; 
  enddate?: string;
  schedule: string;
  location: string;
  tags: string; 
  organization?: string;
  image: string; 
}