export interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  image: string;
  githubUrl: string;
  liveUrl?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Budget Reward App',
    description: 'A gamified budgeting application designed to encourage better financial habits through rewards and challenges.',
    techStack: ['Vue', 'TypeScript', 'Tailwind', 'Node.js'],
    image: '/images/projects/budget.png',
    githubUrl: 'https://github.com/WangaTshikombedze',
    liveUrl: '#'
  },
  {
    id: 2,
    title: 'Student Accommodation Development',
    description: 'Strategic planning and financial modelling tool for developing student accommodation facilities.',
    techStack: ['Excel/VBA', 'Financial Modelling', 'Planning'],
    image: '/images/projects/accommodation.png',
    githubUrl: 'https://github.com/WangaTshikombedze',
  },
  {
    id: 3,
    title: 'MIPS Problem Solver',
    description: 'A comprehensive collection of assembly algorithms designed to solve complex computational problems in MIPS.',
    techStack: ['MIPS Assembly', 'Computer Architecture'],
    image: '/images/projects/mips.png',
    githubUrl: 'https://github.com/WangaTshikombedze',
  }
];
