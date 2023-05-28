// create adventure form
import styled from 'styled-components';
import AdventureForm from '../../../components/forms/AdventureForm';

export default function CreateAdventure() {
  return (
    <AddDiscoveryContainer>
      <h1>Create An Adventure</h1>
      <AdventureForm />
    </AddDiscoveryContainer>
  );
}

const AddDiscoveryContainer = styled.div`
`;
