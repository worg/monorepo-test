import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NavContainer = styled.nav`
  background: rgba(12, 84, 242, 0.8);
  backdrop-filter: blur(12px) brightness(1.1);
  padding: 0 1rem;
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  a {
    color: #fafbfa;
    text-decoration: none;
    padding: 1rem 0;
  }
`;

export function Nav() {
  return (
    <NavContainer>
      <Link to="/">Search Again</Link>
    </NavContainer>
  );
}
