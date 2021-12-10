export interface RepoInfo {
  user: string;
  repo: string;
}

export function extractRepoInfo(url: string): RepoInfo | Error {
  if (!url.startsWith('http')) {
    // allow "user/repo" without full url
    return getRepoInfoForPath(url);
  }

  const parsed = new URL(url);
  if (!parsed.hostname.endsWith('github.com')) {
    return new Error('url is not in github.com');
  }

  return getRepoInfoForPath(parsed.pathname);
}

function getRepoInfoForPath(pathName: string): RepoInfo | Error {
  let path = pathName;
  if (pathName.startsWith('/')) {
    path = pathName.slice(1);
  }

  const segments = path.split('/');
  if (segments.length !== 2) {
    return new Error('url is not a repository');
  }

  const [user, repo] = segments;

  return { user, repo };
}
