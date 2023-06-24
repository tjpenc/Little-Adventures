import styled from 'styled-components';
import AdventuresButton from '../../components/buttons/AdventuresButton';
import DiscoveriesButton from '../../components/buttons/DiscoveriesButton';
import { HeaderContainer, TitleContainer } from '../../styles/commonStyles';

export default function ToBeExplored() {
  return (
    <>
      <HeaderContainer>
        <TitleContainer>
          <h1>What would you like to explore?</h1>
        </TitleContainer>
      </HeaderContainer>
      <ExploreContainer>
        <AdventuresButton toExplore />
        <DiscoveriesButton toExplore />
      </ExploreContainer>
    </>
  );
}

const ExploreContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  justify-content: space-around;
  align-items: top;
`;
