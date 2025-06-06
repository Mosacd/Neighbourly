import image from "@/assets/carusel img.png"
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
  image: string;
}


export const eventData: VolunteerOpportunity[] = [
  {
    id: "1",
    title: "Library Reading Buddy Program",
    description: "Volunteer at your local library and help kids improve their reading skills in a fun, supportive environment.",
    startdate: new Date("2025-07-01"),
    enddate: new Date("2025-08-15"),
    schedule: "Weekdays, 3:00 PM – 5:00 PM",
    location: "Downtown Public Library",
    tags: "reading,kids,education",
    organization: "City Library",
    image: image
  },
  {
    id: "2",
    title: "Park Cleanup Crew",
    description: "Join a community initiative to keep our parks clean and safe. Great for team-building and outdoor lovers.",
    startdate: new Date("2025-07-10"),
    enddate: new Date("2025-07-10"),
    schedule: "Saturday, 9:00 AM – 12:00 PM",
    location: "Riverside Park",
    tags: "environment,cleanup,community",
    organization: "Green City Volunteers",
    image: "/images/park-cleanup.jpg"
  },
  {
    id: "3",
    title: "Community Food Drive",
    description: "Help collect and organize food donations for families in need across the city. Make a real difference today.",
    startdate: new Date("2025-08-01"),
    enddate: new Date("2025-08-31"),
    schedule: "Flexible shifts",
    location: "Citywide Donation Centers",
    tags: "food,donation,community",
    organization: "Helping Hands Network",
    image: "/images/food-drive.jpg"
  }
];