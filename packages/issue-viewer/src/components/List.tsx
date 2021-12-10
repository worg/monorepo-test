import styled from 'styled-components';

export const ListContainer = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const ListItemField = styled.div`
  font-weight: bold;
  span {
    font-weight: normal;
  }
`;

export const ListItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  color: inherit;
  text-decoration: none;
  background-color: transparent;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0.5rem;
  margin: 0.5rem;
  box-shadow: 0 0 0 0 #000;
  transition: background-color, box-shadow 125ms ease-in-out;

  :hover {
    background-color: #111;
    box-shadow: 0 0 7px 1px #000;
  }

  @media screen and (max-width: 768px) {
    flex-direction: row;
  }
`;
