import { FilterEngine } from "./filterEngine";
import { JobStatus } from "./jobStatus";
import { PlatformManager } from "./platformManager";
import { Proposal } from "./proposal";
import { IFreelancer } from "./types";

const platformManager = new PlatformManager();

platformManager.addClient({
  id: "client-1",
  name: "Sara Ali",
  email: "sara@example.com",
  budget: 5000,
});

platformManager.addFreelancer({
  id: "freelancer-1",
  name: "Omar Hassan",
  email: "omar@example.com",
  skills: ["TypeScript", "React"],
  hourlyRate: 40,
});

platformManager.addProject({
  id: "project-1",
  title: "Landing Page",
  description: "Build a responsive landing page",
  budget: 2000,
  clientId: "client-1",
  status: JobStatus.Open,
});

platformManager.submitProposal(
  new Proposal(
    "proposal-1",
    "project-1",
    "freelancer-1",
    1800,
    "I can deliver this project quickly and cleanly.",
  ),
);

platformManager.assignProject("project-1", "freelancer-1");
platformManager.completeProject("project-1");

const freelancerFilter = new FilterEngine<IFreelancer>();
const filteredFreelancers = freelancerFilter.filterByProperty(
  platformManager.getFreelancers(),
  "hourlyRate",
  40,
);

console.log(
  JobStatus.Open,
  filteredFreelancers.length,
  PlatformManager.totalPlatformRevenue,
);
