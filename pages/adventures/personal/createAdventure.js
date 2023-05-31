// create adventure form
import styled from 'styled-components';
import AdventureForm from '../../../components/forms/AdventureForm';

export default function CreateAdventure() {
  return (
    <AddAdventureContainer>
      <h1>Create An Adventure</h1>
      <AdventureForm />
    </AddAdventureContainer>
  );
}

const AddAdventureContainer = styled.div`
`;
