
export interface Project {
  id: string;
  title: string;
  subtitle: string;
  problem: string;
  whatIBuilt: string;
  tech: string[];
  challenges: string;
  outcome: string;
  impactLabel?: string;
  imageUrl: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}
