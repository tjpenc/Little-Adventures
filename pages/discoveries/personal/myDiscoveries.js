import { useEffect, useState } from 'react';
import styled from 'styled-components';
import LittleDiscoveryCard from '../../../components/LittleDiscoveryCard';
import { getUserDiscoveries } from '../../../api/discoveriesData';
import { useAuth } from '../../../utils/context/authContext';

// view my discoveries
export default function ViewDiscoveries() {
  const [discoveries, setDiscoveries] = useState([]);
  const { user } = useAuth();

  const getAllUserDiscoveries = () => getUserDiscoveries(user.uid).then(setDiscoveries);

  useEffect(() => {
    getAllUserDiscoveries();
  }, []);

  return (
    <DiscoveriesContainer>
      {discoveries?.map((discovery) => (
        <LittleDiscoveryCard key={discovery.firebaseKey} discoveryObj={discovery} onUpdate={getAllUserDiscoveries} />
      ))}
    </DiscoveriesContainer>
  );
}

const DiscoveriesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;
