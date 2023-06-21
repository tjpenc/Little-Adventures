import { Card } from 'react-bootstrap';
import Link from 'next/link';
import styled from 'styled-components';
import { useAuth } from '../utils/context/authContext';
import DiscoveriesButton from '../components/buttons/DiscoveriesButton';
import AdventuresButton from '../components/buttons/AdventuresButton';
import { BasicButton } from '../styles/commonStyles';

function Home() {
  const { user } = useAuth();

  return (
    <HomePageContainer>
      <UserInfoContainer>
        <Card.Img
          style={{
            height: '50px',
            width: '50px',
          }}
          src={user.photoURL}
          alt="user"
        />
        <h1>Hello {user.displayName}! </h1>
      </UserInfoContainer>
      <NavigationButtonContainers>
        <Link href="/testPage" passHref>
          <BasicButton className="flex-basis2">TestPage</BasicButton>
        </Link>
        <Link href="/adventures/public/publicAdventures" passHref>
          <BasicButton className="flex-basis2">Explore Adventures</BasicButton>
        </Link>
        <Link href="/discoveries/public/publicDiscoveries" passHref>
          <BasicButton className="flex-basis2">Explore Discoveries</BasicButton>
        </Link>
        <Link href="/randomAdventure" passHref>
          <BasicButton>Find an Adventure</BasicButton>
        </Link>
        <Link href="/toExplore/toBeExplored" passHref>
          <BasicButton>My Explore Page</BasicButton>
        </Link>
        <Link href="/googleMap" passHref>
          <BasicButton>Discovery Map</BasicButton>
        </Link>
      </NavigationButtonContainers>
      <FilterButtonContainer>
        <AdventuresButton toExplore={false} />
        <DiscoveriesButton toExplore={false} />
      </FilterButtonContainer>
    </HomePageContainer>
  );
}

export default Home;

const HomePageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 100vh;
  height: '90vh';
          padding: '30px';
          max-width: '400px';
          margin: '0 auto';
`;

const UserInfoContainer = styled.div`
    display: flex;
    flex-basis: 100%;
    justify-content: center;
    align-items: center;
    left: -100px;

    > h1 {
      margin-left: 30px;
    }
`;

const NavigationButtonContainers = styled.div`
    flex-basis: 100%;
    display: flex;
    justify-content: space-evenly;
`;

const FilterButtonContainer = styled.div`
  flex-basis: 100%;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
