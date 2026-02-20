import { Project } from '@/types/portfolio';

export const projects: Project[] = [
  {
    id: 'password-generator',
    title: 'Password Generator',
    description:
      'Generate secure passwords with customizable length and character types',
    longDescription:
      'A client-side password generator tool with strength indicator, clipboard support, and full accessibility. Demonstrates React state management and cryptographically secure random generation.',
    technologies: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
    liveUrl: '/projects/password-generator',
    featured: false,
    order: 1,
  },
  {
    id: 'project-1',
    title: 'Boredom Bingo',
    description:
      "An app specifically for people who are forced to watch the game but don't care about football.",
    longDescription:
      'A "Boredom Bingo" (mark off items like "Celebrity in a luxury box" or "Truck commercial with a dog") app specifically for people who are forced to watch the game but don\'t care about football. Also includes a "What just happened?" button that explains common football penalties in simple, humorous terms. Created to enter Base44.com "BIG GAME APP" ("CONTEST")',
    technologies: ['Base44', 'React', 'TypeScript', 'Tailwind CSS'],
    liveUrl: 'https://nah-game-on.base44.app/',
    imageUrl: '/images/projects/boredombingo.png',
    featured: true,
    order: 1,
  },
];
