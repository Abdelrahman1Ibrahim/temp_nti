import { JobStatus } from "./jobStatus";

export type Skill = "TypeScript" | "NodeJS" | "React" | "UI/UX";

export interface IUser {
  id: string;
  name: string;
  email: string;
}

export interface IFreelancer extends IUser {
  skills: Skill[];
  hourlyRate: number;
}

export interface IClient extends IUser {
  budget: number;
}

export interface IProject {
  id: string;
  title: string;
  description: string;
  budget: number;
  clientId: string;
  assignedFreelancerId?: string;
  status: JobStatus;
}
