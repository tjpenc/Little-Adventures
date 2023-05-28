import { PropTypes } from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import styled from 'styled-components';

export default function LittleDiscoveryCardPublic({ discoveryObj }) {
  return (
    <LittleDiscoveryCardContainer>
      <Card style={{ width: '18rem', margin: '10px' }}>
        <AddToExploreContainer><div>+</div></AddToExploreContainer>
        <Card.Img variant="top" src={discoveryObj.imageUrl} alt={discoveryObj.name} style={{ height: '200px' }} />
        <Card.Body>
          <Card.Title>{discoveryObj.name}</Card.Title>
          <Card.Text>{discoveryObj.type}</Card.Text>
          <Card.Text>{discoveryObj.details}</Card.Text>
          <Card.Text>{discoveryObj.rating}</Card.Text>
          <Link href={`/discoveries/public/${discoveryObj.firebaseKey}`} passHref>
            <Button variant="primary" className="m-2">VIEW</Button>
          </Link>
        </Card.Body>
      </Card>
    </LittleDiscoveryCardContainer>
  );
}

LittleDiscoveryCardPublic.propTypes = {
  discoveryObj: PropTypes.shape({
    adventureId: PropTypes.string,
    details: PropTypes.string,
    firebaseKey: PropTypes.string,
    imageUrl: PropTypes.string,
    toBeDiscovered: PropTypes.bool,
    isPublic: PropTypes.bool,
    name: PropTypes.string,
    parentDiscoveryId: PropTypes.string,
    timeSubmitted: PropTypes.string,
    type: PropTypes.string,
    uid: PropTypes.string,
    rating: PropTypes.string,
  }),
};

LittleDiscoveryCardPublic.defaultProps = {
  discoveryObj: {
    adventureId: 'Adventure Id',
    details: 'Adventure Details',
    firebaseKey: 'Firebase Key',
    imageUrl: 'Image',
    toBeDiscovered: true,
    isPublic: false,
    name: 'Adventure Name',
    parentDiscoveryId: 'Parent Discovery Id',
    timeSubmitted: 'Time Submitted',
    type: 'Flora',
    uid: 'UID',
    rating: '3',
  },
};

const LittleDiscoveryCardContainer = styled.div`
  width: 300px;
  height: 500px;
  display: flex;
  border: solid black 2px;
  align-items: center;
`;

const AddToExploreContainer = styled.div`
`;
