import { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { ErrorMessage } from '../components/ErrorMessage';
import { extractRepoInfo } from '../util/url';
import { CenteredContainer } from '../components/CenteredContainer';

const Container = styled(CenteredContainer)`
  flex: 1;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InputBase = styled.input`
  margin: 1rem 0;
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #bababc;
  font-family: inherit;
`;

const Input = styled(InputBase)`
  width: 80%;
  border-width: 2px;
  box-shadow: 0 0 0 0 #ccc;
  outline: none;
  transition: box-shadow 125ms ease-in-out;
  font-size: 1.1rem;

  :hover,
  :focus {
    box-shadow: 0 0 0 1px #ccc;
  }
`;

const SubmitBtn = styled(InputBase)`
  cursor: pointer;
  text-transform: uppercase;
  font-weight: bold;
  background: #f0f0f0;
  color: #000;
  font-size: 1.1rem;
  box-shadow: 0 3px 0 0 rgba(120, 150, 120, 0.5);
  transition: background, box-shadow 125ms ease-in-out;

  :hover {
    background: #ccc;
  }

  :focus,
  :active {
    box-shadow: inherit;
  }
`;

function Main() {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { user, repo } = useParams();
  const [error, setError] = useState('');

  useEffect(() => {
    if (user && repo) {
      inputRef.current.value = `${user}/${repo}`;
    }
  }, [user, repo]);

  const submitHandler = (e) => {
    e.preventDefault();
    const url = inputRef.current?.value;
    if (!url) {
      setError('Enter a GitHub URL');
      return;
    }

    const parsed = extractRepoInfo(url);
    if (parsed instanceof Error) {
      setError(parsed.message);
      return;
    }

    setError('');
    navigate(`/${parsed.user}/${parsed.repo}`);
  };

  return (
    <Container as="form" onSubmit={submitHandler}>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {/* since we're waiting for submit to change we can get away with a ref */}
      <Row>
        <Input
          ref={inputRef}
          required
          type="url"
          placeholder="Enter a Github Repository URL or user/repo combination"
        />
        <SubmitBtn as="button" type="submit" onClick={submitHandler}>
          Submit
        </SubmitBtn>
      </Row>
    </Container>
  );
}

export default Main;
