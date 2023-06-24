import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import LittleDiscoveryCard from '../../../components/cards/LittleDiscoveryCard';
import { getUserDiscoveries } from '../../../api/discoveriesData';
import { useAuth } from '../../../utils/context/authContext';
import {
  BasicButton, TitleButtonsContainer, TitleContainer, HeaderContainer,
} from '../../../styles/commonStyles';

// view my discoveries
export default function ViewDiscoveries() {
  const [discoveries, setDiscoveries] = useState([]);
  const { user } = useAuth();

  const getAllUserDiscoveries = () => getUserDiscoveries(user.uid).then((discoveriesArray) => {
    const foundDiscoveries = discoveriesArray.filter((discovery) => discovery.toBeDiscovered === false);
    setDiscoveries(foundDiscoveries);
  });

  useEffect(() => {
    getAllUserDiscoveries();
  }, []);

  return (
    <>
      <HeaderContainer>
        <TitleContainer>
          <h1>My Discoveries</h1>
        </TitleContainer>
        <TitleButtonsContainer>
          <Link href="/discoveries/personal/createDiscovery" passHref>
            <BasicButton>Add A Discovery!</BasicButton>
          </Link>
          <Link href="/discoveries/personal/myGoogleMap" passHref>
            <BasicButton>To Maps</BasicButton>
          </Link>
        </TitleButtonsContainer>
      </HeaderContainer>
      <DiscoveriesContainer>
        {discoveries?.map((discovery) => (
          <LittleDiscoveryCard key={discovery.firebaseKey} discoveryObj={discovery} onUpdate={getAllUserDiscoveries} />
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
