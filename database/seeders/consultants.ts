/**
 * Consultant seed data
 * This file creates sample consultant data for testing the API
 */

const consultantSeedData = [
  {
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    bio: "Senior Flutter developer with 8+ years of experience. Specialized in state management, performance optimization, and clean architecture patterns.",
    yearsOfExperience: 8,
    hourlyRate: 0, // Free consultant
    specialties: ["Flutter", "Dart", "State Management", "Clean Architecture", "Performance Optimization"],
    isAvailable: true,
    isPaidConsultant: false,
    linkedinProfile: "https://linkedin.com/in/alice-johnson-flutter",
    githubProfile: "https://github.com/alice-johnson",
    portfolioUrl: "https://alicejohnson.dev",
    timezone: "UTC-5",
    rating: 4.8,
    totalSessions: 145
  },
  {
    name: "Bob Chen",
    email: "bob.chen@example.com",
    bio: "Flutter consultant and technical architect. Expert in enterprise-scale Flutter applications, CI/CD, and team leadership.",
    yearsOfExperience: 12,
    hourlyRate: 150,
    specialties: ["Flutter", "Enterprise Architecture", "CI/CD", "Team Leadership", "Performance"],
    isAvailable: true,
    isPaidConsultant: true,
    linkedinProfile: "https://linkedin.com/in/bob-chen-flutter",
    githubProfile: "https://github.com/bob-chen",
    portfolioUrl: "https://bobchen.io",
    calendlyUrl: "https://calendly.com/bob-chen",
    timezone: "UTC-8",
    rating: 4.9,
    totalSessions: 320
  },
  {
    name: "Maria Rodriguez",
    email: "maria.rodriguez@example.com",
    bio: "Mobile development specialist with focus on Flutter and cross-platform solutions. Strong background in UI/UX design and accessibility.",
    yearsOfExperience: 6,
    hourlyRate: 0, // Free consultant
    specialties: ["Flutter", "UI/UX Design", "Accessibility", "Cross-Platform", "Material Design"],
    isAvailable: true,
    isPaidConsultant: false,
    linkedinProfile: "https://linkedin.com/in/maria-rodriguez-flutter",
    githubProfile: "https://github.com/maria-rodriguez",
    timezone: "UTC-6",
    rating: 4.7,
    totalSessions: 89
  },
  {
    name: "Dr. Sarah Wilson",
    email: "sarah.wilson@example.com",
    bio: "Former Google engineer with deep expertise in Dart language internals and Flutter framework development. Available for advanced technical consultations.",
    yearsOfExperience: 15,
    hourlyRate: 250,
    specialties: ["Dart Language", "Flutter Framework", "Compiler Design", "Performance Analysis", "Advanced Architecture"],
    isAvailable: true,
    isPaidConsultant: true,
    linkedinProfile: "https://linkedin.com/in/dr-sarah-wilson",
    githubProfile: "https://github.com/sarah-wilson",
    portfolioUrl: "https://sarahwilson.tech",
    calendlyUrl: "https://calendly.com/dr-sarah-wilson",
    timezone: "UTC-8",
    rating: 5.0,
    totalSessions: 78
  },
  {
    name: "James Kumar",
    email: "james.kumar@example.com",
    bio: "Full-stack developer with expertise in Flutter mobile apps and backend integration. Experienced in Firebase, GraphQL, and REST APIs.",
    yearsOfExperience: 5,
    hourlyRate: 0, // Free consultant
    specialties: ["Flutter", "Firebase", "GraphQL", "REST APIs", "Backend Integration"],
    isAvailable: true,
    isPaidConsultant: false,
    githubProfile: "https://github.com/james-kumar",
    timezone: "UTC+5:30",
    rating: 4.6,
    totalSessions: 67
  },
  {
    name: "Emma Thompson",
    email: "emma.thompson@example.com",
    bio: "Senior consultant specializing in Flutter testing strategies, quality assurance, and automated testing frameworks.",
    yearsOfExperience: 10,
    hourlyRate: 180,
    specialties: ["Flutter Testing", "QA", "Test Automation", "Widget Testing", "Integration Testing"],
    isAvailable: true,
    isPaidConsultant: true,
    linkedinProfile: "https://linkedin.com/in/emma-thompson-qa",
    githubProfile: "https://github.com/emma-thompson",
    calendlyUrl: "https://calendly.com/emma-thompson",
    timezone: "UTC+0",
    rating: 4.8,
    totalSessions: 156
  }
];

export default consultantSeedData;