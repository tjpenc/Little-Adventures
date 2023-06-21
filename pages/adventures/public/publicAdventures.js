import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getAllAdventures } from '../../../api/adventuresData';
import LittleAdventureCard from '../../../components/cards/LittleAdventureCard';
import { useAuth } from '../../../utils/context/authContext';
// import { getAllAdventuresAndDiscoveries } from '../../../api/mergedData';
import { HeaderContainer } from '../../../styles/commonStyles';

// view all public adventures
export default function ViewPublicAdventures() {
  const [adventures, setAdventures] = useState([]);
  const [page, setPage] = useState(0);
  const adventuresPerPage = 6;
  const { user } = useAuth();

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

  const handleClickNext = () => {
    setPage((prevState) => prevState + 1);
  };

  const handleClickPrev = () => {
    setPage((prevState) => prevState - 1);
  };

  const endPage = Math.ceil(adventures.length / 6) - 1;
  const startIndex = page * adventuresPerPage;
  const endIndex = startIndex + adventuresPerPage;
  const displayedAdventures = adventures.slice(startIndex, endIndex);

  return (
    <>
      <HeaderContainer>
        <h1>Public Adventures</h1>
      </HeaderContainer>
      <AdventureJournalContainer>
        <AdventuresContainer>
          {displayedAdventures?.map((adventure) => (
            <LittleAdventureCard key={adventure.firebaseKey} adventureObj={adventure} onUpdate={() => {}} />
          ))}
        </AdventuresContainer>
      </AdventureJournalContainer>
      {page === 0
        ? <button type="button" disabled onClick={handleClickPrev}>Prev</button>
        : <button type="button" onClick={handleClickPrev}>Prev</button>}
      {page === endPage
        ? <button type="button" disabled onClick={handleClickNext}>Next</button>
        : <button type="button" onClick={handleClickNext}>Next</button>}
    </>
  );
}
const AdventureJournalContainer = styled.div`
  display: flex;
  height: 80vh;
  width: 80%;
  margin: auto;
  border: solid black 3px;
  justify-content: center;
`;

const AdventuresContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-around;
  margin-right: 40%;
`;
