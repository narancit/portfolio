// Data models for the portfolio website

export interface TechStack {
  name: string;
  icon: string; // Icon name from lucide-react or URL
  category: 'language' | 'framework' | 'tool' | 'database';
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[]; // Array of tech names
  liveUrl?: string;
  repoUrl?: string;
  imageUrl?: string;
  featured: boolean;
  order: number;
}

export interface Skill {
  name: string;
  category: string;
  proficiency: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  yearsOfExperience?: number;
  experienceStartDate?: string; // ISO date string (YYYY-MM-DD)
}

export interface SkillCategory {
  name: string;
  skills: Skill[];
  order: number;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string; // Markdown content
  publishedDate: string; // ISO date string
  tags: string[];
  readingTime: number; // minutes
}

export interface PersonalInfo {
  fullName: string;
  title: string;
  bio: string;
  email: string;
  github: string;
  linkedin?: string;
  twitter?: string;
  location?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}
