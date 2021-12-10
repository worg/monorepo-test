import { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { RepoIssue } from '../api/client';
import { ListContainer, ListItem, ListItemField } from '../components/List';
import { GithubStateContext } from '../github/context';

const IssueItemContainer = styled(ListItem)`
  display: grid;
  grid-template-columns: 3fr repeat(2, 1fr);
`;

function IssueItem({ issue, path }: { issue: RepoIssue; path: string }) {
  return (
    <li>
      <IssueItemContainer as={Link} to={`${path}/${issue.number}`}>
        <ListItemField>
          Issue name:<span> {issue.title}</span>
        </ListItemField>
        <ListItemField>
          Created at:<span> {issue.created_at}</span>
        </ListItemField>
        <ListItemField>
          Created by:<span> {issue.user?.login || 'some user'}</span>
        </ListItemField>
        <ListItemField>
          Comments: <span>{issue.comments}</span>
        </ListItemField>
        <ListItemField>
          Status: <span>{issue.state}</span>
        </ListItemField>
      </IssueItemContainer>
    </li>
  );
}

export function IssueList() {
  const { user, repo } = useParams();
  const { issues } = useContext(GithubStateContext);
  const basePath = `/${user}/${repo}/issue`;

  return (
    <div>
      <h2>
        Issues for {user}/{repo}
      </h2>
      <ListContainer>
        {issues.map((issue) => (
          <IssueItem key={issue.id} path={basePath} issue={issue} />
        ))}
      </ListContainer>
    </div>
  );
}
