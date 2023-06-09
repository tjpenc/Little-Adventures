import styled from 'styled-components';

export default function RandomAdventure() {
  return (
    <RandomContainer className="main_container">
      <RandomContentContainer>
        random form
      </RandomContentContainer>
      <RandomContentContainer>
        random object
      </RandomContentContainer>
    </RandomContainer>
  );
}

const RandomContainer = styled.div`
  border: solid black 3px;
`;

const RandomContentContainer = styled.div`
  border: solid black 3px;
  flex-basis: 50%;
`;
