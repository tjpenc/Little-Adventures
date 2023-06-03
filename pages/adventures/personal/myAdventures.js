import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import LittleAdventureCard from '../../../components/cards/LittleAdventureCard';
import { getUserAdventures } from '../../../api/adventuresData';
import { useAuth } from '../../../utils/context/authContext';

// view my adventures
export default function ViewMyAdventures() {
  const [adventures, setAdventures] = useState([]);
  const { user } = useAuth();

  const getAllUsersAdventures = () => getUserAdventures(user.uid).then((adventuresArray) => {
    const completedAdventures = adventuresArray.filter((adventure) => adventure.toBeExplored === false);
    setAdventures(completedAdventures);
  });

  useEffect(() => {
    getAllUsersAdventures();
  }, []);

  return (
    <>
      <HeaderContainer>
        <h1>My Adventures</h1>
        <Link href="/adventures/personal/createAdventure" passHref>
          <Button variant="primary" className="m-2">Log an Adventure!</Button>
        </Link>
      </HeaderContainer>
      <AdventureJournalContainer>
        <AdventuresContainer>
          {adventures?.map((adventure) => (
            <LittleAdventureCard key={adventure.firebaseKey} adventureObj={adventure} onUpdate={getAllUsersAdventures} />
          ))}
        </AdventuresContainer>
      </AdventureJournalContainer>
    </>
  );
}

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const AdventureJournalContainer = styled.div`

`;

const AdventuresContainer = styled.div`

`;
