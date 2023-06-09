import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Card } from 'react-bootstrap';
import styled from 'styled-components';
import DiscoveriesButton from '../../components/buttons/DiscoveriesButton';
import AdventuresButton from '../../components/buttons/AdventuresButton';
import { useAuth } from '../../utils/context/authContext';
import { getAllAdventures } from '../../api/adventuresData';
import { getAllDiscoveries } from '../../api/discoveriesData';

export default function ViewOtherUserProfile() {
  const [adventures, setAdventures] = useState({});
  const [discoveries, setDiscoveries] = useState({});
  const { user } = useAuth();
  const router = useRouter();
  const { firebaseKey } = router.query;
  // need to create way to filter through all disocveries and adventures for firebaseKey

  useEffect(() => {
    getAllAdventures().then(setAdventures);
    getAllDiscoveries().then(setDiscoveries);
  }, [firebaseKey]);

  return (
    <HomePageContainer>
      <UserInfoContainer>
        <h1>Welcome to {adventures.owner || discoveries.owner} Page! </h1>
        <Card.Img
          style={{
            height: '50px',
            width: '50px',
          }}
          src={user.photoURL}
          alt="user"
        />
      </UserInfoContainer>
      <FilterButtonContainer>
        <AdventuresButton toExplore={false} />
        <DiscoveriesButton toExplore={false} />
      </FilterButtonContainer>
    </HomePageContainer>
  );
}

const HomePageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 100vh;
  border: solid black 3px;
  height: '90vh';
          padding: '30px';
          max-width: '400px';
          margin: '0 auto';
`;

const UserInfoContainer = styled.div`
    border: solid black 3px;
    flex-basis: 50%;
`;

const FilterButtonContainer = styled.div`
  flex-basis: 100%;
  width: 100%;
  display: flex;
  justify-content: space-around;
  border: solid black 3px;
`;
