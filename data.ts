
import { Project, SkillCategory } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'amassina',
    title: 'Amassina',
    subtitle: 'Events & Places Platform',
    problem: 'Event discoverability is often fragmented across social media ads and word-of-mouth, making it difficult for local creators to reach their target audience reliably.',
    whatIBuilt: 'An end-to-end platform connecting creators and seekers, featuring dynamic place pages, categorized event listings, and a community-centric discovery engine.',
    tech: ['React', 'Firebase', 'Cloud Functions', 'Tailwind CSS'],
    challenges: 'Designing a system that feels local and trustworthy while ensuring real-time updates for thousands of users without performance degradation.',
    outcome: 'A centralized hub for events that outperforms traditional social ads by providing intent-based discovery and higher user retention.',
    impactLabel: 'Product Ownership',
    imageUrl: 'Amassina.png'
  },
  {
    id: 'mindmesh',
    title: 'MindMesh',
    subtitle: 'Student Collaboration & Support App',
    problem: 'College students struggle with isolated studying and lack of centralized academic support, leading to decreased engagement and poor collaboration.',
    whatIBuilt: 'A collaborative ecosystem offering real-time meeting rooms for peer study, group discussion hubs, and integrated AI academic assistance.',
    tech: ['React', 'Node.js', 'Socket.io', 'Gemini API', 'MongoDB'],
    challenges: 'Ensuring low-latency real-time collaboration while integrating AI guidance that is helpful but avoids providing "answers" directly, maintaining academic integrity.',
    outcome: 'Increased student interaction by providing a purpose-built space that scales academic support through peer and AI collaboration.',
    impactLabel: 'UX & AI Integration',
    imageUrl: 'MindMesh.png'
  },
  {
    id: 'ecommerce',
    title: 'E-commerce Platform',
    subtitle: 'Handmade Knitting Business',
    problem: 'A real-world client (small business) needed a professional digital presence to transition from informal social media sales to a structured, reliable sales funnel.',
    whatIBuilt: 'A full-stack commerce solution including product catalogs, real-time inventory management, secure checkout, and a comprehensive admin dashboard.',
    tech: ['React', 'Stripe API', 'Node.js', 'PostgreSQL'],
    challenges: 'Balancing the high-touch "handmade" feel with professional e-commerce reliability, specifically managing unique inventory for one-of-a-kind items.',
    outcome: 'Automated order processing and professionalized the brand, resulting in a 40% increase in operational efficiency for the business owner.',
    impactLabel: 'Full-Stack Delivery',
    imageUrl: 'ecommerceKnitting.png'
  },
  {
    id: 'mri-classification',
    title: 'MRI Brain Tumor Classification',
    subtitle: 'Machine Learning Research Project',
    problem: 'Medical imaging interpretation requires extreme accuracy and domain expertise, often creating bottlenecks in early diagnosis pipelines.',
    whatIBuilt: 'A deep learning pipeline capable of classifying brain tumors from MRI scans with high precision.',
    tech: ['Python', 'TensorFlow/Keras', 'OpenCV', 'Scikit-learn'],
    challenges: 'Self-learning complex neuroanatomy and medical imaging standards within a tight deadline while optimizing a model for a relatively small dataset.',
    outcome: 'Achieved ~95% classification accuracy, demonstrating the ability to rapidly master complex new domains and deliver research-level results.',
    impactLabel: 'Fast Learning & ML',
    imageUrl: 'MRI.jpg'
  },
  {
    id: 'drone-simulation',
    title: 'Drone Simulation',
    subtitle: 'XPRIZE Wildfire Hackathon',
    problem: 'Rapid prototyping of wildfire detection drones was needed under extreme time pressure with no previous 3D simulation experience.',
    whatIBuilt: 'Physically accurate drone simulations in Blender used for testing detection algorithms and flight paths.',
    tech: ['Blender', 'Python', 'Unity', 'C#'],
    challenges: 'Learning 3D modeling and physics engine parameters from scratch in 48 hours to provide a viable simulation environment for the team.',
    outcome: 'Delivered a functional simulation that allowed the engineering team to validate sensor placement without physical hardware.',
    impactLabel: 'Adaptability',
    imageUrl: 'forest.png'
  },
  {
    id: 'prostate-exam',
    title: 'Automated Prostate Exam Device',
    subtitle: 'T2Med Hackathon Finalist',
    problem: 'The manual nature of prostate exams often leads to inconsistencies and patient discomfort, creating a need for standardized, precise diagnostic tools.',
    whatIBuilt: 'Proposed and architected the concept for an automated diagnostic device, leading a cross-functional team of engineers.',
    tech: ['Embedded Systems', 'Arduino', 'Sensors', 'CAD'],
    challenges: 'Synthesizing medical requirements with hardware constraints and presenting a high-impact solution to a panel of healthcare experts.',
    outcome: 'Reached the mid-finals of the hackathon, recognized for innovation, leadership, and potential healthcare impact.',
    impactLabel: 'Leadership & Innovation',
    imageUrl: 'med-tech.jpg'
  }
];

export const SKILLS: SkillCategory[] = [
  {
    title: 'Languages',
    skills: ['TypeScript', 'JavaScript', 'Python', 'C++', 'SQL']
  },
  {
    title: 'Frontend',
    skills: ['React', 'Next.js', 'Tailwind CSS', 'Redux', 'D3.js']
  },
  {
    title: 'Backend & Cloud',
    skills: ['Node.js', 'Firebase', 'PostgreSQL', 'MongoDB', 'Cloud Functions']
  },
  {
    title: 'Core Competencies',
    skills: ['Problem Solving', 'Ownership', 'Rapid Domain Learning', 'End-to-End Delivery']
  }
];
