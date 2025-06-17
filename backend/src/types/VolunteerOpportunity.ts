export interface VolunteerOpportunity {
  id: string;
  title: string;
  Briefdescription: string;
  description: string;
  startdate: Date;
  enddate: Date;
  schedule: string;
  location: string;
  timeCommitment: string;
  ageRequirement: string;
  organization?: string;
  image: string;
}