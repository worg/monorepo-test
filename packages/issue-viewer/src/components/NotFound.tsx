import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NotFoundContainer = styled.div`
  font-size: 3rem;
  padding: 1rem;
  text-align: center;
`;

const Img = styled.img`
  width: 50px;
`;

export function NotFound() {
  return (
    <NotFoundContainer>
      <img
        src="https://httpstatusdogs.com/img/404.jpg"
        alt="dog looking for something inexistent"
      />
      <h3>Sorry we can't find what you're looking for</h3>
    </NotFoundContainer>
  );
}
