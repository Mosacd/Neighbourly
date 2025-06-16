import image from "@/assets/carusel img.png"
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
  tags: string;
  organization?: string;
  image: string;
}


export const eventData: VolunteerOpportunity[] = [
  {
    id: "1",
    title: "Library Reading Buddy Program",
    Briefdescription: "Help children improve their reading skills...",
    description: "Join our Library Reading Buddy Program...",
    startdate: new Date("2025-07-01"),
    enddate: new Date("2025-08-15"),
    schedule: "Weekdays, 3:00 PM – 5:00 PM",
    location: "Downtown",
    timeCommitment: "Weekly commitment",
    ageRequirement: "16+",
    tags: "reading,kids,education",
    organization: "City Library",
    image: image
  },
  {
    id: "2",
    title: "Park Cleanup Crew",
    Briefdescription: "Join a community initiative...",
    description: "Be part of our monthly Park Cleanup Crew...",
    startdate: new Date("2025-07-10"),
    enddate: new Date("2025-07-10"),
    schedule: "Saturday, 9:00 AM – 12:00 PM",
    location: "Westside",
    timeCommitment: "One-time event",
    ageRequirement: "13+",
    tags: "environment,cleanup,community",
    organization: "Green City Volunteers",
    image: "/images/park-cleanup.jpg"
  },
  {
    id: "3",
    title: "Community Food Drive",
    Briefdescription: "Help collect and organize food donations for families in need across the city. Make a real difference in fighting local hunger today.",
    description: "Join our Community Food Drive initiative and play a crucial role in addressing food insecurity in our city. This comprehensive volunteer program operates year-round, with intensified efforts during holiday seasons and times of particular need. Volunteers participate in various activities including organizing food collection events at local businesses, schools, and community centers, sorting and packaging donated items at our distribution centers, and helping with direct food distribution to families in need. Our program serves hundreds of families monthly, providing essential groceries, fresh produce, and household necessities to those facing economic hardships. Volunteers gain valuable experience in logistics, community outreach, and nonprofit operations while making meaningful connections with fellow volunteers and community members. We welcome individuals, families, corporate groups, and student organizations looking for impactful volunteer opportunities. Training is provided for all activities, and our friendly coordinators ensure volunteers feel comfortable and confident in their roles. Whether you can commit to weekly shifts or occasional weekend events, your contribution makes a significant difference in reducing hunger and building food security in our community. The program also focuses on education, teaching volunteers and recipients about nutrition, meal planning, and resource management. Many volunteers find this experience eye-opening and deeply rewarding as they witness the direct impact of their efforts on families' daily lives and long-term stability.",
    startdate: new Date("2025-08-01"),
    enddate: new Date("2025-08-31"),
    schedule: "Flexible shifts",
    location: "Citywide Donation Centers",
    timeCommitment: "One-time event",
    ageRequirement: "13+",
    tags: "food,donation,community",
    organization: "Helping Hands Network",
    image: "/images/food-drive.jpg"
  }
];