import { Card, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { useAuth } from '../utils/context/authContext';
import DiscoveriesButton from '../components/buttons/DiscoveriesButton';
import AdventuresButton from '../components/buttons/AdventuresButton';

function Home() {
  const { user } = useAuth();

  return (
    <>
      <NavigationButtonContainers>
        <Button>Explore Adventures</Button>
        <Button>Explore Discoveries</Button>
        <Button>Find an Adventure</Button>
        <Button>To Be Explored</Button>
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
          <AdventuresButton />
          <DiscoveriesButton />
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
