import { SkillCategory } from '@/types/portfolio';

export const skillCategories: SkillCategory[] = [
  {
    name: 'Programming Languages',
    order: 1,
    skills: [
      {
        name: 'HTML/CSS',
        category: 'Programming Languages',
        proficiency: 'expert',
        yearsOfExperience: 7,
      },
      {
        name: 'JavaScript',
        category: 'Programming Languages',
        proficiency: 'advanced',
        yearsOfExperience: 6,
      },
      {
        name: 'PHP',
        category: 'Programming Languages',
        proficiency: 'advanced',
        yearsOfExperience: 6,
      },
      {
        name: 'SQL',
        category: 'Programming Languages',
        proficiency: 'advanced',
        yearsOfExperience: 6,
      },
      {
        name: 'Zoho Deluge',
        category: 'Programming Languages',
        proficiency: 'expert',
        experienceStartDate: '2022-04-01',
      },
      {
        name: 'TypeScript',
        category: 'Programming Languages',
        proficiency: 'intermediate',
        yearsOfExperience: 3,
      },
    ],
  },
  {
    name: 'Frameworks & Libraries',
    order: 2,
    skills: [
      {
        name: 'Tailwind CSS',
        category: 'Frameworks & Libraries',
        proficiency: 'expert',
        yearsOfExperience: 3,
      },
      {
        name: 'Next.js',
        category: 'Frameworks & Libraries',
        proficiency: 'advanced',
        yearsOfExperience: 3,
      },
      {
        name: 'React',
        category: 'Frameworks & Libraries',
        proficiency: 'advanced',
        yearsOfExperience: 3,
      },
    ],
  },
  {
    name: 'Tools & Platforms',
    order: 3,
    skills: [
      {
        name: 'VS Code',
        category: 'Tools & Platforms',
        proficiency: 'expert',
        yearsOfExperience: 6,
      },
      {
        name: 'Git',
        category: 'Tools & Platforms',
        proficiency: 'advanced',
        yearsOfExperience: 3,
      },
      {
        name: 'Kiro Code',
        category: 'Tools & Platforms',
        proficiency: 'advanced',
        yearsOfExperience: 1,
      },
      {
        name: 'AWS',
        category: 'Tools & Platforms',
        proficiency: 'beginner',
        yearsOfExperience: 1,
      },
      {
        name: 'Vercel',
        category: 'Tools & Platforms',
        proficiency: 'beginner',
        yearsOfExperience: 1,
      },
    ],
  },
  {
    name: 'Databases',
    order: 4,
    skills: [
      {
        name: 'MySQL',
        category: 'Databases',
        proficiency: 'advanced',
        yearsOfExperience: 6,
      },
      {
        name: 'MongoDB',
        category: 'Databases',
        proficiency: 'beginner',
        yearsOfExperience: 1,
      },
    ],
  },
  {
    name: 'CRM & Business Tools',
    order: 5,
    skills: [
      {
        name: 'Zoho CRM',
        category: 'CRM & Business Tools',
        proficiency: 'expert',
        experienceStartDate: '2022-04-01',
      },
      {
        name: 'Zoho Creator',
        category: 'CRM & Business Tools',
        proficiency: 'expert',
        experienceStartDate: '2022-04-01',
      },
      {
        name: 'Other Zoho Tools',
        category: 'CRM & Business Tools',
        proficiency: 'advanced',
        yearsOfExperience: 2,
      },
      {
        name: 'Go High-Level',
        category: 'CRM & Business Tools',
        proficiency: 'beginner',
        yearsOfExperience: 1,
      },
    ],
  },
];
