export const initialJobs = [
  {
    id: "1",
    title: "Frontend Developer",
    company: "Riter-Rob Technology",
    companyId: "1",
    location: "Addis Ababa",
    type: "Full-time",
    category: "Engineering",
    salary: "25,000 - 40,000 ETB",
    description: "We are looking for a skilled Frontend Developer to build clean, responsive user interfaces using Next.js and React. You will work closely with our backend and design teams.",
    requirements: [
      "React",
      "Next.js",
      "JavaScript",
      "Git"
    ],
    postedAt: "2026-09-28"
  },
  {
    id: "2",
    title: "Backend Developer",
    company: "Riter-Rob Solutions",
    companyId: "2",
    location: "Remote",
    type: "Full-time",
    category: "Engineering",
    salary: "30,000 - 50,000 ETB",
    description: "Join our core engineering team to build scalable RESTful Route Handlers, background workers, and PostgreSQL database queries for high-volume Ethiopian applications.",
    requirements: [
      "Node.js",
      "Express",
      "PostgreSQL",
      "Docker"
    ],
    postedAt: "2026-09-29"
  },
  {
    id: "3",
    title: "UI/UX Designer",
    company: "Riter-Rob Technology",
    companyId: "1",
    location: "Addis Ababa",
    type: "Full-time",
    category: "Design",
    salary: "20,000 - 35,000 ETB",
    description: "Design accessible, user-friendly mobile and web layouts for regional Ethiopian clients. Strong Figma and prototyping skills required.",
    requirements: [
      "Figma",
      "Wireframing",
      "Design Systems",
      "User Testing"
    ],
    postedAt: "2026-09-27"
  },
  {
    id: "4",
    title: "Mobile App Developer",
    company: "TeleBirr Tech",
    companyId: "3",
    location: "Addis Ababa",
    type: "Full-time",
    category: "Engineering",
    salary: "35,000 - 55,000 ETB",
    description: "Develop seamless mobile transaction experiences and integration modules for Android and iOS using modern cross-platform frameworks.",
    requirements: [
      "React Native",
      "TypeScript",
      "REST APIs",
      "Mobile Payments"
    ],
    postedAt: "2026-09-30"
  },
  {
    id: "5",
    title: "Data Analyst",
    company: "Commercial Bank of Ethiopia",
    companyId: "4",
    location: "Addis Ababa",
    type: "Full-time",
    category: "Data",
    salary: "28,000 - 42,000 ETB",
    description: "Analyze financial transaction logs, generate executive dashboards, and extract business insights to optimize digital retail banking channels.",
    requirements: [
      "SQL",
      "Python",
      "PowerBI",
      "Financial Reporting"
    ],
    postedAt: "2026-09-25"
  },
  {
    id: "6",
    title: "Content & Marketing Specialist",
    company: "Riter-Rob Solutions",
    companyId: "2",
    location: "Remote",
    type: "Part-time",
    category: "Marketing",
    salary: "15,000 - 22,000 ETB",
    description: "Drive organic community growth and craft engaging marketing material across local digital platforms and professional networks.",
    requirements: [
      "Content Strategy",
      "SEO",
      "Copywriting",
      "Social Media"
    ],
    postedAt: "2026-09-26"
  }
];

export let jobs = [...initialJobs];

export async function getJobs(filters = {}) {
  let list = [...jobs];
  const { search, category, location } = filters;

  if (search) {
    const q = search.toLowerCase();
    list = list.filter(
      (job) =>
        job.title.toLowerCase().includes(q) ||
        job.company.toLowerCase().includes(q) ||
        job.description.toLowerCase().includes(q)
    );
  }

  if (category && category !== "All") {
    list = list.filter((job) => job.category.toLowerCase() === category.toLowerCase());
  }

  if (location && location !== "All") {
    list = list.filter((job) => job.location.toLowerCase() === location.toLowerCase());
  }

  return list;
}

export async function getJobById(id) {
  return jobs.find((job) => String(job.id) === String(id));
}

export async function addJob(newJob) {
  const job = {
    id: String(Date.now()),
    postedAt: new Date().toISOString().split("T")[0],
    ...newJob
  };
  jobs.unshift(job);
  return job;
}
