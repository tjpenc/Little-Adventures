import styled from 'styled-components';
import DiscoveryForm from '../../../components/forms/DiscoveryForm';

export default function CreateDiscovery() {
  return (
    <AddDiscoveryContainer>
      <h1>Create A Discovery</h1>
      <DiscoveryForm />
    </AddDiscoveryContainer>
  );
}

const AddDiscoveryContainer = styled.div`
`;
