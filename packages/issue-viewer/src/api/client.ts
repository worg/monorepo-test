import { Octokit } from '@octokit/core';
import { RepoInfo } from '../util/url';

const client = new Octokit();

interface User {
  login?: string | null;
  avatar_url: string;
}

export interface RepoIssue {
  id: number;
  number: number;
  user: User | null;
  comments: number;
  title: string;
  state: string;
  created_at: string;
}

export interface IssueComment {
  id: number;
  user: User | null;
  body?: string;
  created_at: string;
}

export async function getRepoIssues({
  user: owner,
  repo,
}: RepoInfo): Promise<RepoIssue[]> {
  const response = await client.request('GET /repos/{owner}/{repo}/issues', {
    owner,
    repo,
  });

  return response.data;
}

export async function getIssueComments({
  repo,
  user: owner,
  id: issue_number,
}: RepoInfo & { id: number }): Promise<IssueComment[]> {
  const response = await client.request(
    'GET /repos/{owner}/{repo}/issues/{issue_number}/comments',
    {
      owner,
      repo,
      issue_number,
    }
  );

  return response.data;
}
