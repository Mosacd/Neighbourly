import image from "@/assets/carusel img.png"
export interface VolunteerOpportunity {
  id: string;
  title: string;
  Briefdescription:string;
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
    Briefdescription: "Help children improve their reading skills in a fun, supportive library environment. Perfect for those who love working with kids and promoting literacy.",
    description: "Join our Library Reading Buddy Program and make a lasting impact on children's literacy development in your community. As a reading buddy, you'll work one-on-one with children aged 6-12, helping them develop essential reading skills while fostering a love for books and learning. This program pairs volunteers with young readers who need extra support and encouragement to build their confidence and reading abilities. You'll engage in interactive reading sessions, play educational games, and participate in creative storytelling activities that make learning fun and memorable. Our structured program provides training materials and ongoing support to ensure you feel confident and prepared. Whether you're a retired teacher, college student, or simply someone passionate about education, this opportunity allows you to directly contribute to a child's academic success. The program runs throughout the school year, offering flexible scheduling to accommodate your availability. Many volunteers find this experience incredibly rewarding as they witness children's progress and growing enthusiasm for reading. You'll be part of a dedicated team of volunteers who believe in the power of literacy to transform lives and strengthen communities.",
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
    Briefdescription: "Join a community initiative to keep our parks clean and beautiful. Great opportunity for outdoor enthusiasts and team-building activities.",
    description: "Be part of our monthly Park Cleanup Crew and help maintain the natural beauty of our community's green spaces. This hands-on volunteer opportunity brings together environmentally conscious individuals who want to make a tangible difference in their neighborhood. During each cleanup event, volunteers work together to remove litter, clear invasive plant species, maintain walking trails, and plant native flowers and shrubs. Our experienced crew leaders provide all necessary tools, safety equipment, and guidance to ensure a productive and safe experience for volunteers of all ages and skill levels. Beyond the environmental benefits, these cleanup events foster community connections and pride in our shared spaces. Volunteers often form lasting friendships while working toward a common goal of environmental stewardship. The program welcomes families, corporate groups, student organizations, and individual volunteers looking to give back to their community. Each cleanup session typically focuses on different areas of the park system, allowing volunteers to explore various locations and understand the diverse ecosystems within our city. Weather-appropriate clothing and a positive attitude are all you need to bring – we'll provide the rest. Join us in creating cleaner, safer, and more beautiful parks for everyone to enjoy while building a stronger, more connected community.",
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
    Briefdescription: "Help collect and organize food donations for families in need across the city. Make a real difference in fighting local hunger today.",
    description: "Join our Community Food Drive initiative and play a crucial role in addressing food insecurity in our city. This comprehensive volunteer program operates year-round, with intensified efforts during holiday seasons and times of particular need. Volunteers participate in various activities including organizing food collection events at local businesses, schools, and community centers, sorting and packaging donated items at our distribution centers, and helping with direct food distribution to families in need. Our program serves hundreds of families monthly, providing essential groceries, fresh produce, and household necessities to those facing economic hardships. Volunteers gain valuable experience in logistics, community outreach, and nonprofit operations while making meaningful connections with fellow volunteers and community members. We welcome individuals, families, corporate groups, and student organizations looking for impactful volunteer opportunities. Training is provided for all activities, and our friendly coordinators ensure volunteers feel comfortable and confident in their roles. Whether you can commit to weekly shifts or occasional weekend events, your contribution makes a significant difference in reducing hunger and building food security in our community. The program also focuses on education, teaching volunteers and recipients about nutrition, meal planning, and resource management. Many volunteers find this experience eye-opening and deeply rewarding as they witness the direct impact of their efforts on families' daily lives and long-term stability.",
    startdate: new Date("2025-08-01"),
    enddate: new Date("2025-08-31"),
    schedule: "Flexible shifts",
    location: "Citywide Donation Centers",
    tags: "food,donation,community",
    organization: "Helping Hands Network",
    image: "/images/food-drive.jpg"
  }
];