import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import styled from 'styled-components';
import { useAuth } from '../utils/context/authContext';
import DiscoveriesButton from '../components/buttons/DiscoveriesButton';
import AdventuresButton from '../components/buttons/AdventuresButton';

function Home() {
  const { user } = useAuth();

  return (
    <HomePageContainer>
      <UserInfoContainer>
        <h1>Hello {user.displayName}! </h1>
        <Card.Img
          style={{
            height: '50px',
            width: '50px',
          }}
          src={user.photoURL}
          alt="user"
        />
      </UserInfoContainer>
      <NavigationButtonContainers>
        <Link href="/adventures/public/publicAdventures" passHref>
          <Button variant="primary" className="m-2">Explore Advenutres</Button>
        </Link>
        <Link href="/discoveries/public/publicDiscoveries" passHref>
          <Button variant="primary" className="m-2">Explore Discoveries</Button>
        </Link>
        <Link href="/randomAdventure" passHref>
          <Button variant="primary" className="m-2">Find an Adventure</Button>
        </Link>
        <Link href="/toExplore/toBeExplored" passHref>
          <Button variant="primary" className="m-2">To Be Explored</Button>
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

const NavigationButtonContainers = styled.div`
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
