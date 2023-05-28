// view all public discoveries
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getAllDiscoveries } from '../../../api/discoveriesData';
import LittleDiscoveryCardPublic from '../../../components/public_components/LittleDiscoveryCardPublic';

export default function ViewPublicDiscoveries() {
  const [discoveries, setDiscoveries] = useState([]);

  const getPublicDiscoveries = () => getAllDiscoveries().then((discoveriesArray) => {
    const publicDiscoveries = discoveriesArray.filter((discovery) => discovery.isPublic === true);
    setDiscoveries(publicDiscoveries);
  });

  useEffect(() => {
    getPublicDiscoveries();
  }, []);

  return (
    <>
      <h1>Public Discoveries</h1>
      <DiscoveriesContainer>
        {discoveries?.map((discovery) => (
          <LittleDiscoveryCardPublic key={discovery.firebaseKey} discoveryObj={discovery} />
        ))}
      </DiscoveriesContainer>
    </>
  );
}

const DiscoveriesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;
