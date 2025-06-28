import { z } from 'zod';

// This is the TypeScript interface for use in our code
export interface VolunteerOpportunity {
  id: string;
  title: string;
  Briefdescription: string;
  description: string;
  startdate: string; // Using ISO string format for simplicity in JSON
  enddate: string;   // Using ISO string format
  schedule: string;
  location: string;
  timeCommitment: string;
  ageRequirement: string;
  organization?: string;
  image: string;
}

export const CreateOpportunitySchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters long" }),
  location: z.string().min(1, { message: "Location is required" }),
  shortDescription: z.string().min(10, { message: "Short description must be at least 10 characters long" }),
  detailedDescription: z.string().min(20, { message: "Detailed description must be at least 20 characters long" }),
  schedule: z.string().min(1, { message: "Schedule is required" }),
  start: z.string().datetime({ message: "Start date must be a valid ISO date string" }),
  end: z.string().datetime({ message: "End date must be a valid ISO date string" }),
  timeCommitment: z.string().optional().default("Not specified"),
  ageRequirement: z.string().optional().default("Any"),
  organization: z.string().optional().default("Community Submission"),
  image: z.string().url({ message: "Image must be a valid URL" }).optional().default("/images/default-event.jpg"),
});

export type CreateOpportunityDTO = z.infer<typeof CreateOpportunitySchema>;