import { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { IssueComment } from '../api/client';
import { ListContainer, ListItem, ListItemField } from '../components/List';
import { GithubStateContext } from '../github/context';

const UserField = styled.div`
  text-align: center;
  font-weight: bold;
  margin-right: 0.5rem;
`;

const Avatar = styled.img`
  height: 20px;
  vertical-align: middle;
  border-radius: 100%;
`;

const CommentContainer = styled(ListItem)`
  pointer-events: none;
`;

function CommentItem({ comment }: { comment: IssueComment }) {
  return (
    <CommentContainer as="li">
      <UserField>
        <Avatar src={comment.user?.avatar_url} />
        {comment.user?.login}
      </UserField>
      <ListItemField>
        <ListItemField>
          <span>{comment.body}</span>
        </ListItemField>
        <ListItemField>
          on: <span> {comment.created_at}</span>
        </ListItemField>
      </ListItemField>
    </CommentContainer>
  );
}

export function IssueComments() {
  const { user, repo } = useParams();
  const { currentIssue, issueComments } = useContext(GithubStateContext);
  const basePath = `/${user}/${repo}`;

  return (
    <div>
      <Link to={basePath}>Back to issues list</Link>
      <h2>
        Comments for #{currentIssue?.number}: {currentIssue?.title}
      </h2>
      <ListContainer>
        {currentIssue?.comments === 0 && <h3>No comments for this issue</h3>}
        {issueComments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </ListContainer>
    </div>
  );
}
