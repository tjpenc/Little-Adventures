import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getAllAdventures } from '../../../api/adventuresData';
import LittleAdventureCard from '../../../components/cards/LittleAdventureCard';
import { useAuth } from '../../../utils/context/authContext';
// import { getAllAdventuresAndDiscoveries } from '../../../api/mergedData';
import {
  HeaderContainer, TitleContainer, TitleButtonsContainer,
} from '../../../styles/commonStyles';

// view all public adventures
export default function ViewPublicAdventures() {
  const [adventures, setAdventures] = useState([]);
  // const [page, setPage] = useState(0);
  const { user } = useAuth();
  // const adventuresPerPage = 6;
  // const endPage = Math.ceil(adventures.length / 6) - 1;
  // const startIndex = page * adventuresPerPage;
  // const endIndex = startIndex + adventuresPerPage;
  // const displayedAdventures = adventures.slice(startIndex, endIndex);

  const getPublicAdventures = () => getAllAdventures().then((adventuresArray) => {
    const publicAdventures = adventuresArray.filter((adventure) => adventure.isPublic === true && adventure.uid !== user.uid);
    setAdventures(publicAdventures);
  });

  useEffect(() => {
    getPublicAdventures();
    // getAllAdventuresAndDiscoveries().then((array) => {
    //   console.warn(array);
    // });
  }, []);

  // const handleClickNext = () => {
  //   setPage((prevState) => prevState + 1);
  // };

  // const handleClickPrev = () => {
  //   setPage((prevState) => prevState - 1);
  // };

  return (
    <>
      <HeaderContainer>
        <TitleContainer>
          <h1>Public Adventures</h1>
        </TitleContainer>
        <TitleButtonsContainer>
          <input type="text" placeholder="Search..." />
        </TitleButtonsContainer>
      </HeaderContainer>
      <AdventureJournalContainer>
        <CardDiv>
          {adventures?.map((adventure) => (
            <>
              <CardContainer key={adventure.firebaseKey}>
                <LittleAdventureCard key={`${adventure.firebaseKey}1`} adventureObj={adventure} onUpdate={getPublicAdventures} />
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
