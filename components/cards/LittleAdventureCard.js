import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { deleteDiscoveriesOfAdventure } from '../../api/mergedData';
import { BasicButton, TitleButtonsContainer } from '../../styles/commonStyles';
import AddToExploreButton from '../buttons/AddToExploreButton';
import photoStorage from '../../utils/photoStorage';
import Ratings from '../Ratings';
import CardImages from '../CardImages';

export default function LittleAdventureCard({ adventureObj, onUpdate }) {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const deleteThisAdventure = () => deleteDiscoveriesOfAdventure(adventureObj.firebaseKey)
    .then(adventureObj.filePath && photoStorage.delete(adventureObj.filePath))
    .then(onUpdate);

  const viewCard = () => {
    if (adventureObj.uid === user.uid) {
      router.push(`/adventures/personal/${adventureObj.firebaseKey}`);
    } else {
      router.push(`/adventures/public/${adventureObj.firebaseKey}`);
    }
  };

  return (
    <>
      <AdventureContainer
        style={{
          transform: isHovered ? 'scale(1.01)' : '',
          boxShadow: isHovered ? '0 0 10px rgba(0, 0, 0, 0.3)' : '',
        }}
        onClick={viewCard}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Header>
          <ImageContainer>
            <CardImages obj={adventureObj} />
          </ImageContainer>
        </Header>
        <Container>
          <Title>
            <h4>{adventureObj.title}</h4>
            {user.uid !== adventureObj.uid && <AddToExploreButton firebaseKey={adventureObj.firebaseKey} isDiscovery={false} />}
          </Title>
          <InfoContainer className="details">{adventureObj.details}</InfoContainer>
          <InfoContainer>{adventureObj.intensity}</InfoContainer>
          <InfoContainer><Ratings obj={adventureObj} /></InfoContainer>
          {user.uid === adventureObj.uid
          && (
            <TitleButtonsContainer>
              <Link href={`/adventures/personal/edit/${adventureObj.firebaseKey}`} passHref>
                <BasicButton>Edit</BasicButton>
              </Link>
              <BasicButton onClick={deleteThisAdventure}>Delete</BasicButton>
            </TitleButtonsContainer>
          )}
        </Container>
      </AdventureContainer>
    </>
  );
}

LittleAdventureCard.propTypes = {
  adventureObj: PropTypes.shape({
    details: PropTypes.string,
    firebaseKey: PropTypes.string,
    imageUrl: PropTypes.string,
    intensity: PropTypes.string,
    isCompleted: PropTypes.bool,
    isPublic: PropTypes.bool,
    parentAdventureId: PropTypes.string,
    rating: PropTypes.string,
    timeSubmitted: PropTypes.string,
    title: PropTypes.string,
    uid: PropTypes.string,
    filePath: PropTypes.string,
  }),
  onUpdate: PropTypes.func.isRequired,
};

LittleAdventureCard.defaultProps = {
  adventureObj: {
    details: 'Adventure Details',
    firebaseKey: 'FirebaseKey',
    imageUrl: 'Image',
    intensity: 'Intensity',
    isCompleted: true,
    isPublic: false,
    parentAdventureId: 'Parent Adventure Id',
    rating: 3,
    timeSubmitted: 'Time Submitted',
    title: 'Adventure Title',
    uid: 'UID',
    filePath: '',
  },
};

const AdventureContainer = styled.div`
 display: flex;
 align-items: center;
 width: 100%;
 height: 100%;
 cursor: pointer;
 border: solid black 3px;
`;

const Header = styled.div`
  display: flex;
  width: 60%;
  align-items: center;
  justify-content: center;
  height: 200px;
  margin: 2%;
`;

const Title = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const ImageContainer = styled.div`
 width: 100%;
 object-fit: cover;
`;

const Container = styled.div`
  width: 100%;
  margin-left: 10px;
`;

const InfoContainer = styled.div`
  > .details {
    width: 70%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;
