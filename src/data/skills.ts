export interface Skill {
  name: string;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend',
    skills: [
      { name: 'Vue' },
      { name: 'TypeScript' },
      { name: 'HTML' },
      { name: 'CSS' },
      { name: 'Tailwind' }
    ]
  },
  {
    title: 'Programming',
    skills: [
      { name: 'Java' },
      { name: 'JavaScript' },
      { name: 'MIPS' },
      { name: 'Python' }
    ]
  },
  {
    title: 'Engineering',
    skills: [
      { name: 'Automation' },
      { name: 'Embedded Systems' },
      { name: 'Problem Solving' },
      { name: 'Mechatronics' }
    ]
  }
];
