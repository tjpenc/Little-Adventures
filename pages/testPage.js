import { Card } from 'react-bootstrap';
import styled from 'styled-components';
import { BasicButton, TitleButtonsContainer } from '../styles/commonStyles';
import AddToExploreButton from '../components/buttons/AddToExploreButton';

export default function TestPage() {
  return (
    <MainContainer>
      <Header>
        <ImageContainer>
          <Card.Img variant="top" src="/cryptid.png" alt="cryptid" style={{ width: '200px', objectFit: 'cover' }} />
        </ImageContainer>
      </Header>
      <Container>
        <Title>
          <h1>Adventure Title</h1>
          <AddToExploreButton />
        </Title>
        <CardContainer>Description</CardContainer>
        <CardContainer>Intensity</CardContainer>
        <CardContainer>Rating</CardContainer>
        <TitleButtonsContainer>
          <BasicButton>Edit</BasicButton>
          <BasicButton>Delete</BasicButton>
        </TitleButtonsContainer>
      </Container>
    </MainContainer>
  );
}

const MainContainer = styled.div`
 display: flex;
 align-items: center;
 width: 40%;
 height: 100%;
 border: solid black 3px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
`;

const Title = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const ImageContainer = styled.div`
 width: 100%;
 object-fit: cover;
`;

const Container = styled.div`
  width: 100%;
  margin-left: 10px;
`;

const CardContainer = styled.div`

`;
