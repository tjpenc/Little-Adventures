import { PropTypes } from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import styled from 'styled-components';
import { deleteSingleAdventure } from '../../api/adventuresData';

export default function BigAdventureCard({ adventureObj, onUpdate }) {
  const deleteThisAdventure = () => deleteSingleAdventure(adventureObj.firebaseKey).then(onUpdate);

  return (
    <>
      <BigDiscoveryCardContainer>
        <Card style={{ width: '18rem', margin: '10px' }}>
          <Card.Img variant="top" src={adventureObj.imageUrl} alt={adventureObj.title} style={{ height: '200px' }} />
          <Card.Body>
            <Card.Title>{adventureObj.title}</Card.Title>
            <Card.Text>{adventureObj.intensity}</Card.Text>
            <Card.Text>{adventureObj.details}</Card.Text>
            <Card.Text>{adventureObj.rating}</Card.Text>
            <Link href={`/adventures/personal/edit/${adventureObj.firebaseKey}`} passHref>
              <Button variant="info">EDIT</Button>
            </Link>
            <Button variant="danger" onClick={deleteThisAdventure} className="m-2">
              DELETE
            </Button>
          </Card.Body>
        </Card>
      </BigDiscoveryCardContainer>
    </>
  );
}

BigAdventureCard.propTypes = {
  adventureObj: PropTypes.shape({
    details: PropTypes.string,
    firebaseKey: PropTypes.string,
    imageUrl: PropTypes.string,
    intensity: PropTypes.string,
    isCompleted: PropTypes.bool,
    isPublic: PropTypes.bool,
    parentAdventureId: PropTypes.string,
    rating: PropTypes.number,
    timeSubmitted: PropTypes.string,
    title: PropTypes.string,
    uid: PropTypes.string,
  }),
  onUpdate: PropTypes.func.isRequired,
};

BigAdventureCard.defaultProps = {
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

const BigDiscoveryCardContainer = styled.div`
  width: 500px;
  height: 1000px;
  display: flex;
  border: solid black 2px;
  align-items: center;
`;
