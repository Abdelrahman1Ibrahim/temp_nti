import { JobStatus } from "./jobStatus";
import { IClient, IFreelancer, IProject } from "./types";
import { Proposal } from "./proposal";

export class PlatformManager {
  private freelancers: IFreelancer[] = [];
  private clients: IClient[] = [];
  private projects: IProject[] = [];
  private proposals: Proposal[] = [];
  static totalPlatformRevenue = 0;

  addFreelancer(freelancer: IFreelancer): void {
    this.freelancers.push(freelancer);
  }

  addClient(client: IClient): void {
    if (client.budget < 0) {
      throw new Error("Client budget cannot be negative.");
    }

    this.clients.push(client);
  }

  addProject(project: IProject): void {
    const clientExists = this.clients.some(
      (client) => client.id === project.clientId,
    );

    if (!clientExists) {
      throw new Error("Client not found.");
    }

    this.projects.push(project);
  }

  submitProposal(proposal: Proposal): void {
    const freelancerExists = this.freelancers.some(
      (freelancer) => freelancer.id === proposal.freelancerId,
    );
    const projectExists = this.projects.some(
      (project) => project.id === proposal.projectId,
    );

    if (!freelancerExists) {
      throw new Error("Freelancer not found.");
    }

    if (!projectExists) {
      throw new Error("Project not found.");
    }

    this.proposals.push(proposal);
  }

  assignProject(projectId: string, freelancerId: string): void {
    const project = this.projects.filter((item) => item.id === projectId)[0];
    const freelancerExists = this.freelancers.some(
      (freelancer) => freelancer.id === freelancerId,
    );

    if (!project) {
      throw new Error("Project not found.");
    }

    if (!freelancerExists) {
      throw new Error("Freelancer not found.");
    }

    project.assignedFreelancerId = freelancerId;
    project.status = JobStatus.InProgress;
  }

  completeProject(projectId: string): void {
    const project = this.projects.filter((item) => item.id === projectId)[0];

    if (!project) {
      throw new Error("Project not found.");
    }

    project.status = JobStatus.Completed;
    PlatformManager.totalPlatformRevenue += project.budget * 0.1;
  }

  getFreelancers(): IFreelancer[] {
    return [...this.freelancers];
  }

  getClients(): IClient[] {
    return [...this.clients];
  }

  getProjects(): IProject[] {
    return [...this.projects];
  }

  getProposals(): Proposal[] {
    return [...this.proposals];
  }
}
