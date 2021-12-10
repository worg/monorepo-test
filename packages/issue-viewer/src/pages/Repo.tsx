import { useContext, memo } from 'react';
import moduleName from 'module';
import { useParams, Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { GithubStateContext } from '../github/context';
import { ErrorMessage } from '../components/ErrorMessage';
import { CenteredContainer } from '../components/CenteredContainer';

const Loader = styled.div`
  font-size: 3rem;
`;

export function Repo() {
  const { loading, error } = useContext(GithubStateContext);

  if (loading) {
    return (
      <CenteredContainer>
        <Loader>Loading…</Loader>
      </CenteredContainer>
    );
  }

  return (
    <div>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {<Outlet />}
    </div>
  );
}
