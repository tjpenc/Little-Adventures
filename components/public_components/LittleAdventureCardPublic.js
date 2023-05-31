import { PropTypes } from 'prop-types';
import { Card } from 'react-bootstrap';
import styled from 'styled-components';
import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../utils/context/authContext';
import { deleteSingleAdventure } from '../../api/adventuresData';

export default function LittleAdventureCardPublic({ adventureObj, onUpdate }) {
  const [showMenu, setShowMenu] = useState(false);
  const { user } = useAuth();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const deleteThisAdventure = () => deleteSingleAdventure(adventureObj.firebaseKey).then(onUpdate);

  return (
    <MessageContainer>
      <Card.Img variant="top" src={adventureObj.imageUrl} alt="image" style={{ height: '50px', width: '50px' }} />
      <MessageInfo>
        <h4>
          {adventureObj.title}<span> {adventureObj.timeSubmitted}</span>
        </h4>
      </MessageInfo>
      {user.uid !== adventureObj.uid ? '' : <MenuButton onClick={toggleMenu}>⋮</MenuButton>}
      {showMenu ? (
        <OptionsMenu onMouseLeave={toggleMenu}>
          <ul>
            <OptionItem onClick={deleteThisAdventure}>Delete</OptionItem>
            <OptionItem><Link href={`/adventures/personal/edit/${adventureObj.firebaseKey}`} passHref>Edit</Link></OptionItem>
            <OptionItem><Link href={`/adventures/personal/${adventureObj.firebaseKey}`} passHref>View</Link></OptionItem>
          </ul>
        </OptionsMenu>
      ) : ''}
    </MessageContainer>
  );
}

LittleAdventureCardPublic.propTypes = {
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

LittleAdventureCardPublic.defaultProps = {
  adventureObj: {
    details: 'Adventure Details',
    firebaseKey: 'FirebaseKey',
    imageUrl: 'Image',
    intensity: 'Intensity',
    isCompleted: true,
    isPublic: false,
    parentAdventureId: 'Parent Adventure Id',
    rating: '3',
    timeSubmitted: 'Time Submitted',
    title: 'Adventure Title',
    uid: 'UID',
  },
};

const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;

  > img {
    height: 50px;
    border-radius: 8px;
  }
`;

const MessageInfo = styled.div`
  padding-left: 10px;
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
