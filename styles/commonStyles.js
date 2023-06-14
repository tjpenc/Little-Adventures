import styled from 'styled-components';

const AddToExploreContainer = styled.div`

`;

const HeaderContainer = styled.div`

`;

const BasicButton = styled.button`
  margin: 10px;
  background-color: transparent;
  padding: 10px 20px;
  height: 60px;
  width: fit-content;

  &:hover {
    background-color: black;
    color: white;
  }

  &.big_round_button {
    border-radius: 50%;
    height: 90%;
    width: 20%;
    margin-bottom: 5%;
  }
`;

export {
  AddToExploreContainer,
  HeaderContainer,
  BasicButton,
};
