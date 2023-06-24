import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../utils/context/authContext';
import { getUserAdventures } from '../../api/adventuresData';
import LittleAdventureCard from '../../components/cards/LittleAdventureCard';
import { HeaderContainer, TitleContainer, TitleButtonsContainer } from '../../styles/commonStyles';

export default function ViewAdventuresToExplore() {
  const [adventures, setAdventures] = useState([]);
  const { user } = useAuth();

  const getToBeExploredAdventures = () => getUserAdventures(user.uid).then((adventuresArray) => {
    const toBeExploredAdventures = adventuresArray.filter((adventure) => adventure.toBeExplored === true);
    setAdventures(toBeExploredAdventures);
  });

  useEffect(() => {
    getToBeExploredAdventures();
  }, []);

  return (
    <>
      <HeaderContainer>
        <TitleContainer>
          <h1>Adventures to be Had</h1>
        </TitleContainer>
        <TitleButtonsContainer />
      </HeaderContainer>
      <AdventureJournalContainer>
        <CardDiv>
          {adventures?.map((adventureObj) => (
            <>
              <CardContainer>
                <LittleAdventureCard key={adventureObj.firebaseKey} adventureObj={adventureObj} onUpdate={getToBeExploredAdventures} />
              </CardContainer>
            </>
          ))}
        </CardDiv>
      </AdventureJournalContainer>
    </>
  );
}
const AdventureJournalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const CardDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 100%;
  height: 100vh;
`;

const CardContainer = styled.div`
  width: calc(50% - 20px);
  height: calc(33.33% - 10px);
  margin: 5px;
  padding: 10px;
`;
