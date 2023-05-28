import { useEffect, useState } from 'react';
import styled from 'styled-components';
import LittleAdventureCard from '../../../components/personal_components/LittleAdventureCard';
import { getUserAdventures } from '../../../api/adventuresData';
import { useAuth } from '../../../utils/context/authContext';

// view my adventures
export default function ViewMyAdventures() {
  const [adventures, setAdventures] = useState([]);
  const { user } = useAuth();

  const getAllUsersAdventures = () => getUserAdventures(user.uid).then(setAdventures);

  useEffect(() => {
    getAllUsersAdventures();
  }, []);

  return (
    <>
      <h1>My Adventures</h1>
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

const AdventureJournalContainer = styled.div`

`;

const AdventuresContainer = styled.div`

`;
