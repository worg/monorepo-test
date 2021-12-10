import styled from 'styled-components';
import { RepoIssue } from '../api/client';
import { RepoInfo } from '../util/url';

interface RepoNavInfoProps extends RepoInfo {
  issue?: RepoIssue;
}

const Container = styled.div`
  width: 100%;
`;

export function RepoNavInfo({ issue, user, repo }: RepoNavInfoProps) {
  return (
    <Container>
      <h3>
        {!issue ? (
          'Issues'
        ) : (
          <>
            Comments for #{issue.number}: {issue.title}
          </>
        )}
        on {user}/{repo}
      </h3>
    </Container>
  );
}
