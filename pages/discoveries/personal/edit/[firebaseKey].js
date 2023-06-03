// edit discovery form
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleDiscovery } from '../../../../api/discoveriesData';
import DiscoveryForm from '../../../../components/forms/DiscoveryForm';

export default function CreateDiscovery() {
  const [discovery, setDiscovery] = useState({});

  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleDiscovery(firebaseKey).then(setDiscovery);
  }, [firebaseKey]);

  return (
    <EditDiscoveryContainer>
      <h1>Edit A Discovery</h1>
      <DiscoveryForm discoveryObj={discovery} />
    </EditDiscoveryContainer>
  );
}

const EditDiscoveryContainer = styled.div`
`;
