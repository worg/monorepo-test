import { useRef, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ErrorMessage } from '../components/ErrorMessage';
import { extractRepoInfo } from '../util/url';

const Container = styled.main`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-flow: column;
`;

const InputBase = styled.input`
  margin: 1rem 0;
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #bbb;
  outline: 2px #ccc;
`;

const Input = styled(InputBase)`
  width: 80%;
`;

const SubmitBtn = styled(InputBase)`
  cursor: pointer;
  background: #f0f0f0;
  text-transform: uppercase;
  transition: background, box-shadow 125ms ease-in-out;
  box-shadow: 0 3px 0 0 rgba(120, 150, 120, 0.5);

  :hover {
    background: #ccc;
    box-shadow: 0 3px 0 0 rgba(120, 150, 120, 0.5), 0 3px 5px #bbb;
  }

  :focus,
  :active {
    box-shadow: 0 0 0 0 rgba(120, 150, 120, 0.5);
  }
`;

function Main() {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const OnSubmit = () => {
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
    <Container>
      <h2>Issue Explorer</h2>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {/* since we're waiting for submit to change we can get away with a ref */}
      <Input
        ref={inputRef}
        required
        type="url"
        placeholder="Enter a Github Repository URL"
      />
      <SubmitBtn as="button" onClick={OnSubmit}>
        Submit
      </SubmitBtn>
    </Container>
  );
}

export default Main;
