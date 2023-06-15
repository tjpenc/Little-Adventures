import { PropTypes } from 'prop-types';
import { Card } from 'react-bootstrap';
import styled from 'styled-components';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '../../utils/context/authContext';
// import { deleteSingleAdventure } from '../../api/adventuresData';
import { deleteDiscoveriesOfAdventure } from '../../api/mergedData';
import { AddToExploreContainer } from '../../styles/commonStyles';
import AddToExploreButton from '../buttons/AddToExploreButton';

export default function LittleAdventureCard({ adventureObj, onUpdate }) {
  const [showMenu, setShowMenu] = useState(false);
  const { user } = useAuth();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const deleteThisAdventure = () => deleteDiscoveriesOfAdventure(adventureObj.firebaseKey).then(onUpdate);

  const numSlots = Number(adventureObj.rating);
  const ratingArray = Array(numSlots).fill(null);

  return (
    <AdventureContainer>
      <ImageContainer>
        <Card.Img variant="top" src={adventureObj.imageUrl} alt="image" style={{ height: '50px', width: '50px', borderRadius: '8px' }} />
      </ImageContainer>
      <AdventureInfo>
        <h4>
          {adventureObj.title}<span> {adventureObj.timeSubmitted}</span>
        </h4>
        <p className="details">{adventureObj.details}</p>
        <p>{adventureObj.intensity}</p>
        <p>Rating: {ratingArray.map(() => (
          <Image src="/star.png" width="10px" height="10px" />
        ))}
        </p>
      </AdventureInfo>
      <MenuContainer>
        <MenuButton onClick={toggleMenu}>⋮</MenuButton>
        {showMenu ? (
          <OptionsMenu onMouseLeave={toggleMenu}>
            <ul>
              {adventureObj.uid !== user.uid ? (
                <>
                  <OptionItem><Link href={`/adventures/public/${adventureObj.firebaseKey}`} passHref>View</Link></OptionItem>
                  <AddToExploreContainer><AddToExploreButton firebaseKey={adventureObj.firebaseKey} isDiscovery={false} /></AddToExploreContainer>
                </>
              ) : (
                <>
                  <OptionItem><Link href={`/adventures/personal/${adventureObj.firebaseKey}`} passHref>View</Link></OptionItem>
                  <OptionItem><Link href={`/adventures/personal/edit/${adventureObj.firebaseKey}`} passHref>Edit</Link></OptionItem>
                  <OptionItem onClick={deleteThisAdventure}>Delete</OptionItem>
                </>
              )}
            </ul>
          </OptionsMenu>
        ) : ''}
      </MenuContainer>
    </AdventureContainer>
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
  },
};

const AdventureContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 4%;
  border: solid black 3px;
  width: 70%;
  margin: 0 60px;
`;

const ImageContainer = styled.div`
  flex-basis: 15%;
  height: 50%;
  width: 15%;
`;

const AdventureInfo = styled.div`
  width: 70%;
  flex-basis: 80%;
  padding-left: 2%;
  font-size: 15px;

  > h4 {
    font-size: 20px;
  }

  > h4 > span {
    color: gray;
    font-weight: 300;
    margin-left: 4px;
    font-size: 10px;
  }
  > .details {
    width: 70%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

const MenuContainer = styled.div`
 flex-basis: 2%;
`;

const MenuButton = styled.button`
  background-color: transparent;
  border: none;
  color: #666;
  font-size: 24px;
  cursor: pointer;
`;

const OptionsMenu = styled.div`
  position: relative;
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 3px;
`;

const OptionItem = styled.h6`
  border-bottom: 1px solid #ccc;
  cursor: pointer;
  padding-right: 10px;
  padding-bottom: 3px;

  &:last-child {
    border-bottom: none;
  }
`;
