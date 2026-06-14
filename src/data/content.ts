export type SocialIconName = 'github' | 'linkedin' | 'mail'
export type ContactIconName = 'mail' | 'map-pin'

export interface NavLink {
  name: string
  href: string
}

export interface SocialLink {
  label: string
  href: string
  icon: SocialIconName
}

export interface HeroContent {
  badge: string
  firstName: string
  lastName: string
  descriptionLineOne: string
  descriptionLineTwo: string
  projectsCtaLabel: string
  projectsCtaHref: string
  cvCtaLabel: string
  cvCtaHref: string
}

export interface AboutHighlight {
  title: string
  description: string
}

export interface ExperienceItem {
  period: string
  role: string
  company: string
  description: string
}

export interface ContactInfoItem {
  label: string
  value: string
  icon: ContactIconName
}

export const navLinks: NavLink[] = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
]

export const heroContent: HeroContent = {
  badge: 'Open to all IT remote job opportunities',
  firstName: 'Wanga',
  lastName: 'Tshikombedze',
  descriptionLineOne: 'Software Developer & Mechatronics Graduate.',
  descriptionLineTwo: 'Building practical digital solutions with an engineering mindset.',
  projectsCtaLabel: 'View Projects',
  projectsCtaHref: '#projects',
  cvCtaLabel: 'Download CV',
  cvCtaHref: '/cv.pdf',
}

export const heroSocialLinks: SocialLink[] = [
  { icon: 'github', href: 'https://github.com/Mubikwanaive', label: 'GitHub' },
  { icon: 'linkedin', href: 'https://za.linkedin.com/in/wanga-tshikombedze-0007', label: 'LinkedIn' },
  { icon: 'mail', href: 'mailto:tshikombedzewanga@gmail.com', label: 'Email' },
]

export const aboutContent = {
  title: 'About Me',
  summary:
    'I am a Software Developer with a background in Mechatronics Engineering. This unique combination allows me to bridge the gap between complex hardware systems and elegant software solutions.',
  journey:
    'My journey started with a fascination for how things work, leading me to pursue a degree in Mechatronics. Along the way, I discovered my passion for software engineering—the ultimate tool for problem-solving and creation.',
}

export const aboutHighlights: AboutHighlight[] = [
  {
    title: 'Education',
    description: 'BSc in Mechatronics Engineering. Specialized in automation and control systems.',
  },
  {
    title: 'Interests',
    description: 'Embedded systems, IoT, and high-performance web applications.',
  },
  {
    title: 'Philosophy',
    description: 'Building practical, user-centric solutions that solve real-world engineering problems.',
  },
]

export const experienceTitle = 'Experience'

export const experiences: ExperienceItem[] = [
  {
    period: '2025 - Present',
    role: 'Software Developer',
    company: 'SOLIDitech',
    description:
      'Developing and maintaining web applications using Vue 3 and Java backend APIs',
  },
  {
    period: '2024 - 2025',
    role: 'QA Analyst',
    company: 'SOLIDitech',
    description:
        'Testing feature changes on QA servers before they are pushed to production',
  },
  {
    period: '2022 - 2022',
    role: 'Core Network Engineer',
    company: 'Huawei',
    description:
      'Supported projects that included updates, upgrades, expansions and migrations of core network elements.',
  },
  {
    period: '2018 - 2023',
    role: 'Engineering Student',
    company: 'University of Cape Town',
    description:
      'Completed a Bachelor of Science in Mechatronics Engineering. Specialized in Robotics and Embedded Systems.',
  },
]

export const contactContent = {
  title: "Let's Connect",
  description:
    'Whether you have a question about a project, want to discuss mechatronics, or just want to say hi, my inbox is always open.',
}

export const contactInfoItems: ContactInfoItem[] = [
  { label: 'Email', value: 'tshikombedzewanga@gmail.com', icon: 'mail' },
  { label: 'Location', value: 'South Africa', icon: 'map-pin' },
]

export const footerContent = {
  logo: 'WT',
  name: 'Wanga Tshikombedze',
  rightsText: 'All rights reserved.',
}

export const footerSocialLinks: SocialLink[] = [
  { icon: 'github', href: 'https://github.com/Mubikwanaive', label: 'GitHub' },
  { icon: 'linkedin', href: 'https://za.linkedin.com/in/wanga-tshikombedze-0007', label: 'LinkedIn' },
  { icon: 'mail', href: 'mailto:tshikombedzewanga@gmail.com', label: 'Email' },
]

export const sectionHeadings = {
  skillsTitle: 'Technical Skills',
  skillsDescription:
    'A diverse toolkit ranging from high-level frontend frameworks to low-level engineering and assembly.',
  projectsTitle: 'Selected Projects',
}