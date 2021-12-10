import { createContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  getIssueComments,
  getRepoIssues,
  IssueComment,
  RepoIssue,
} from '../api/client';

interface githubContext {
  loading: boolean;
  issues: RepoIssue[];
  issueComments: IssueComment[];
  currentIssue?: RepoIssue;
  error?: string;
}

export const GithubStateContext = createContext<githubContext>({
  loading: true,
  issues: [],
  issueComments: [],
});

function filterCurrentIssue(issues: RepoIssue[], id: number) {
  const filtered = issues.filter(({ number }) => number === id);
  if (filtered.length === 1) {
    return filtered[0];
  }
}

export function GithubRepoProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const [issues, setIssues] = useState<RepoIssue[]>([]);
  const [currentIssue, setCurrentIssue] = useState<RepoIssue | undefined>();
  const [issueComments, setIssueComments] = useState<IssueComment[]>([]);
  const [loading, setLoading] = useState(Boolean(params.user && params.repo));
  const [error, setError] = useState(loading ? '' : 'Missing data');

  useEffect(() => {
    // we don't want to pick all params here so I don't destructure
    const user = params.user;
    const repo = params.repo;

    if (!user || !repo) {
      // prevent API call if we don't have any data
      return;
    }

    const fetchIssues = async function () {
      setLoading(true);
      try {
        const issues = await getRepoIssues({
          user,
          repo,
        });

        setIssues(issues);
      } catch (_) {
        setError('Error fetching data, please verify and retry');
      }
      setLoading(false);
    };
    fetchIssues();
  }, [params.user, params.repo]);

  useEffect(() => {
    const user = params.user;
    const repo = params.repo;
    if (!user || !repo || !params.id) {
      return;
    }

    const id = parseInt(params.id, 10);
    if (currentIssue?.number === id) {
      // do nothing if we'have already the data
      return;
    }

    const fetchIssueComments = async function () {
      setLoading(true);

      try {
        const issueComments = await getIssueComments({
          user,
          repo,
          id,
        });

        console.warn('IC:', issueComments);
        setCurrentIssue(filterCurrentIssue(issues, id));
        setIssueComments(issueComments);
      } catch (_) {
        setError('Error fetching data, please verify and retry');
      }
      setLoading(false);
    };
    fetchIssueComments();
  }, [params.user, params.repo, params.id, issues]);

  return (
    <GithubStateContext.Provider
      value={{ issues, currentIssue, issueComments, error, loading }}
    >
      {children}
    </GithubStateContext.Provider>
  );
}
