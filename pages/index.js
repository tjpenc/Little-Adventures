import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import styled from 'styled-components';
import { useAuth } from '../utils/context/authContext';
import DiscoveriesButton from '../components/buttons/DiscoveriesButton';
import AdventuresButton from '../components/buttons/AdventuresButton';

function Home() {
  const { user } = useAuth();

  return (
    <>
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
      <div
        className="text-center d-flex flex-column justify-content-center align-content-center"
        style={{
          height: '90vh',
          padding: '30px',
          maxWidth: '400px',
          margin: '0 auto',
        }}
      >
        <h1>Hello {user.uid}! </h1>
        <Card.Img
          style={{
            height: '50px',
            width: '50px',
          }}
          src={user.photoURL}
          alt="user"
        />
        <FilterButtonContainer>
          <AdventuresButton toExplore={false} />
          <DiscoveriesButton toExplore={false} />
        </FilterButtonContainer>
      </div>
    </>
  );
}

export default Home;

const NavigationButtonContainers = styled.div`

`;

const FilterButtonContainer = styled.div`

`;
