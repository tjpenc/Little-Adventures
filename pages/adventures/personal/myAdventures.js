import { useEffect, useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import LittleAdventureCard from '../../../components/cards/LittleAdventureCard';
import { getUserAdventures } from '../../../api/adventuresData';
import { useAuth } from '../../../utils/context/authContext';
import {
  HeaderContainer, BasicButton, TitleContainer, TitleButtonsContainer,
} from '../../../styles/commonStyles';

// view my adventures
export default function ViewMyAdventures() {
  const [adventures, setAdventures] = useState([]);
  // const [page, setPage] = useState(0);
  // const [toggleButtons, setToggleButtons] = useState('');
  const { user } = useAuth();
  // const adventuresPerPage = 6;
  // const endPage = Math.ceil(adventures.length / 6) - 1;
  // const startIndex = page * adventuresPerPage;
  // const endIndex = startIndex + adventuresPerPage;
  // const displayedAdventures = adventures.slice(startIndex, endIndex);

  const getAllUsersAdventures = () => getUserAdventures(user.uid).then((adventuresArray) => {
    const completedAdventures = adventuresArray.filter((adventure) => adventure.toBeExplored === false);
    setAdventures(completedAdventures);
  });

  // const handleClickNext = () => {
  //   setPage((prevState) => prevState + 1);
  // };

  // const handleClickPrev = () => {
  //   setPage((prevState) => prevState - 1);
  // };

  // const renderToggleButtons = () => {
  //   let buttons = '';
  //   if (adventures && page === 0) {
  //     buttons = <button type="button" onClick={handleClickNext}>Next</button>;
  //   } else if (page > 0 && page === endPage) {
  //     buttons = (
  //       <>
  //         <button type="button" disabled onClick={() => {}}>Next</button>
  //         <button type="button" onClick={handleClickPrev}>Prev</button>
  //       </>
  //     );
  //   } else if (!adventures) {
  //     buttons = (
  //       <>
  //         <button type="button" disabled onClick={handleClickNext}>Next</button>
  //         <button type="button" disabled onClick={handleClickPrev}>Prev</button>
  //       </>
  //     );
  //   } else {
  //     buttons = (
  //       <>
  //         <button type="button" onClick={handleClickNext}>Next</button>
  //         <button type="button" onClick={handleClickPrev}>Prev</button>
  //       </>
  //     );
  //   }
  //   setToggleButtons(buttons);
  // };

  useEffect(() => {
    getAllUsersAdventures();
  }, []);

  // useEffect(() => {
  //   renderToggleButtons();
  // }, [page]);

  return (
    <>
      <HeaderContainer>
        <TitleContainer>
          <h1>My Adventures</h1>
        </TitleContainer>
        <TitleButtonsContainer>
          <input type="text" placeholder="Search..." />
          <Link href="/adventures/personal/createAdventure" passHref>
            <BasicButton>Log an Adventure!</BasicButton>
          </Link>
        </TitleButtonsContainer>
      </HeaderContainer>
      <AdventureJournalContainer>
        <CardDiv>
          {adventures?.map((adventure) => (
            <>
              <CardContainer>
                <LittleAdventureCard key={adventure.firebaseKey} adventureObj={adventure} onUpdate={getAllUsersAdventures} />
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
