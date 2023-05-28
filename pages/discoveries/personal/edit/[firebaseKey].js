// edit discovery form
import styled from 'styled-components';
import DiscoveryForm from '../../../../components/forms/DiscoveryForm';

export default function CreateDiscovery() {
  return (
    <EditDiscoveryContainer>
      <h1>Edit A Discovery</h1>
      <DiscoveryForm />
    </EditDiscoveryContainer>
  );
}

const EditDiscoveryContainer = styled.div`
`;
