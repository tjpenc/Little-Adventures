import styled from 'styled-components';

const HeaderContainer = styled.div`
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
`;

const TitleButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const BasicButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  background-color: transparent;
  padding: 10px 20px;
  height: 4%;
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

  &.thicker {
    height: 20%
  }
`;

export {
  HeaderContainer,
  TitleContainer,
  TitleButtonsContainer,
  BasicButton,
};
