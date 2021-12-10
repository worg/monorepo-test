import { Outlet } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { Nav } from './components/Nav';
import { GithubRepoProvider } from './github/context';

const GlobalStyles = createGlobalStyle`
body {
  padding: 0;
  margin: 0;
  height: 100vh;
  background: #252628;
  font-family: 'Readex Pro',sans-serif;
  color: #fafafc
}

a {
  color: inherit;
  text-decoration: none;
}
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  height: 100%;
  padding: 1rem;
`;

function Home() {
  return (
    <AppContainer>
      <GlobalStyles />
      <Nav />
      <GithubRepoProvider>
        <Container>
          <Outlet />
        </Container>
      </GithubRepoProvider>
    </AppContainer>
  );
}

export default Home;
