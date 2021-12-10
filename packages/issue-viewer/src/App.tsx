import { Outlet } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { Nav } from './components/Nav';

const GlobalStyles = createGlobalStyle`
body {
  padding: 0;
  margin: 0;
  height: 100vh;
  background: #fafbfa;
  font-family: sans-serif;
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
      <Container>
        <Outlet />
      </Container>
    </AppContainer>
  );
}

export default Home;
