export let applications = [
  {
    id: "app-1",
    jobId: "1",
    jobTitle: "Frontend Developer",
    name: "Almaz Kebede",
    email: "almaz@example.com",
    phone: "0911223344",
    notes: "Experienced in React and Next.js App Router.",
    status: "Reviewing",
    appliedAt: "2026-09-30"
  }
];

export async function getApplications() {
  return applications;
}

export async function addApplication(appData) {
  const application = {
    id: `app-${Date.now()}`,
    status: "Submitted",
    appliedAt: new Date().toISOString().split("T")[0],
    ...appData
  };
  applications.unshift(application);
  return application;
}
