import { useContext, memo } from 'react';
import moduleName from 'module';
import { useParams, Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { GithubRepoProvider, GithubStateContext } from '../github/context';
import { ErrorMessage } from '../components/ErrorMessage';
import { CenteredContainer } from '../components/CenteredContainer';

const Loader = styled.div`
  font-size: 3rem;
`;

function GithubConsumer() {
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

export function Repo() {
  return (
    <GithubRepoProvider>
      <GithubConsumer />
    </GithubRepoProvider>
  );
}
