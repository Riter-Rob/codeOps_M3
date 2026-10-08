export const companies = [
  {
    id: "1",
    name: "Riter-Rob Technology",
    location: "Addis Ababa, Bole",
    industry: "Software & IT",
    description: "Leading software consultancy building enterprise web and cloud systems for businesses across East Africa.",
    website: "https://riter-rob.tech",
    openPositions: 2
  },
  {
    id: "2",
    name: "Riter-Rob Solutions",
    location: "Addis Ababa, Kazanchis",
    industry: "Digital Transformation",
    description: "Technology firm specializing in cloud migrations, distributed architectures, and modern digital applications.",
    website: "https://riter-robsolutions.com",
    openPositions: 2
  },
  {
    id: "3",
    name: "TeleBirr Tech",
    location: "Addis Ababa, Churchill Road",
    industry: "Fintech & Telecom",
    description: "Pioneering mobile payments, financial inclusion, and digital services reaching tens of millions in Ethiopia.",
    website: "https://telebirr.et",
    openPositions: 1
  },
  {
    id: "4",
    name: "Commercial Bank of Ethiopia",
    location: "Addis Ababa, Mexico",
    industry: "Banking & Finance",
    description: "The premier commercial financial institution in Ethiopia, driving digital banking channels and enterprise infrastructure.",
    website: "https://combanketh.et",
    openPositions: 1
  }
];

export async function getCompanies() {
  return companies;
}

export async function getCompanyById(id) {
  return companies.find((c) => String(c.id) === String(id));
}
