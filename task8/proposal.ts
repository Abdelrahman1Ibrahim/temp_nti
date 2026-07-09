export class Proposal {
  constructor(
    public readonly id: string,
    public readonly projectId: string,
    public readonly freelancerId: string,
    public readonly bidAmount: number,
    public readonly coverLetter: string,
  ) {}
}
