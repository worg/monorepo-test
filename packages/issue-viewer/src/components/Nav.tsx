import { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Main from '../pages/Main';
import { GithubStateContext } from '../github/context';

const NavContainer = styled.nav`
  background: rgba(118, 121, 127, 0.9);
  backdrop-filter: blur(12px) brightness(0.5) contrast(35%);
  padding: 0 1rem;
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  @supports (backdrop-filter: blur(12px)) {
    background: transparent;
  }

  a {
    color: #fafbfa;
    text-decoration: none;
    padding: 1rem 0;
  }
`;

export function Nav() {
  const { currentIssue } = useContext(GithubStateContext);
  return (
    <NavContainer>
      <Link to="/">Search Again</Link>
      {!currentIssue ? <Main /> : null}
    </NavContainer>
  );
}
