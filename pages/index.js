import { Card } from 'react-bootstrap';
import Link from 'next/link';
import styled from 'styled-components';
import { useAuth } from '../utils/context/authContext';
import DiscoveriesButton from '../components/buttons/DiscoveriesButton';
import AdventuresButton from '../components/buttons/AdventuresButton';
import { BasicButton, TitleButtonsContainer } from '../styles/commonStyles';

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
        <TitleButtonsContainer>
          <AdventuresButton toExplore={false} />
          <DiscoveriesButton toExplore={false} />
          <Link href="/adventures/public/publicAdventures" passHref>
            <BasicButton className="thicker">Explore Adventures</BasicButton>
          </Link>
          <Link href="/discoveries/public/publicDiscoveries" passHref>
            <BasicButton className="thicker">Explore Discoveries</BasicButton>
          </Link>
          {/* <Link href="/randomAdventure" passHref>
            <BasicButton className="thicker">Find an Adventure</BasicButton>
          </Link> */}
          <Link href="/toExplore/toBeExplored" passHref>
            <BasicButton className="thicker">My Explore Page</BasicButton>
          </Link>
          <Link href="/googleMap" passHref>
            <BasicButton className="thicker">Discovery Map</BasicButton>
          </Link>
        </TitleButtonsContainer>
      </NavigationButtonContainers>
      {/* <FilterButtonContainer>
        <AdventuresButton toExplore={false} />
        <DiscoveriesButton toExplore={false} />
      </FilterButtonContainer> */}
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
    height: 30%;
`;

// const FilterButtonContainer = styled.div`
//   flex-basis: 100%;
//   width: 90%;
//   display: flex;
//   justify-content: space-evenly;
//   align-items: center;
//   position: absolute;
//   bottom: 50px;
//   height: 30%;
// `;
