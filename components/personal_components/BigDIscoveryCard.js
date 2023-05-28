import { PropTypes } from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import styled from 'styled-components';
import { deleteSingleDiscovery } from '../../api/discoveriesData';

export default function BigDiscoveryCard({ discoveryObj, onUpdate }) {
  const deleteThisDiscovery = () => deleteSingleDiscovery(discoveryObj.firebaseKey).then(onUpdate);

  return (
    <>
      <BigDiscoveryCardContainer>
        <Card style={{ width: '18rem', margin: '10px' }}>
          <Card.Img variant="top" src={discoveryObj.imageUrl} alt={discoveryObj.name} style={{ height: '200px' }} />
          <Card.Body>
            <Card.Title>{discoveryObj.name}</Card.Title>
            <Card.Text>{discoveryObj.type}</Card.Text>
            <Card.Text>{discoveryObj.details}</Card.Text>
            <Card.Text>{discoveryObj.rating}</Card.Text>
            <Link href={`/adventures/personal/${discoveryObj.adventureId}`} passHref>
              <Button variant="primary" className="m-2">VIEW ADVENTURE</Button>
            </Link>
            <Link href={`/discoveries/personal/edit/${discoveryObj.firebaseKey}`} passHref>
              <Button variant="info">EDIT</Button>
            </Link>
            <Button variant="danger" onClick={deleteThisDiscovery} className="m-2">
              DELETE
            </Button>
          </Card.Body>
        </Card>
      </BigDiscoveryCardContainer>
    </>
  );
}

BigDiscoveryCard.propTypes = {
  discoveryObj: PropTypes.shape({
    adventureId: PropTypes.string,
    adventureTitle: PropTypes.string,
    details: PropTypes.string,
    firebaseKey: PropTypes.string,
    imageUrl: PropTypes.string,
    isComplete: PropTypes.bool,
    isPublic: PropTypes.bool,
    name: PropTypes.string,
    parentAdventureId: PropTypes.string,
    timeSubmitted: PropTypes.string,
    type: PropTypes.string,
    uid: PropTypes.string,
    rating: PropTypes.string,
  }),
  onUpdate: PropTypes.func.isRequired,
};

BigDiscoveryCard.defaultProps = {
  discoveryObj: {
    adventureId: 'Adventure Id',
    adventureTitle: 'Adventure Title',
    details: 'Adventure Details',
    firebaseKey: 'Firebase Key',
    imageUrl: 'Image',
    isComplete: true,
    isPublic: false,
    name: 'Adventure Name',
    parentAdventureId: 'Parent Adventure Id',
    timeSubmitted: 'Time Submitted',
    type: 'Flora',
    uid: 'UID',
    rating: '3',
  },
};

const BigDiscoveryCardContainer = styled.div`
  width: 500px;
  height: 1000px;
  display: flex;
  border: solid black 2px;
  align-items: center;
`;