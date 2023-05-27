import { PropTypes } from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import styled from 'styled-components';

export default function BigDiscoveryCardPublic({ discoveryObj }) {
  return (
    <>
      <BigDiscoveryCardContainer>
        <Card style={{ width: '18rem', margin: '10px' }}>
          <AddToExploreContainer><div>+</div></AddToExploreContainer>
          <Card.Img variant="top" src={discoveryObj.imageUrl} alt={discoveryObj.name} style={{ height: '200px' }} />
          <Card.Body>
            <Card.Title>{discoveryObj.name}</Card.Title>
            <Card.Text>{discoveryObj.type}</Card.Text>
            <Card.Text>{discoveryObj.details}</Card.Text>
            <Card.Text>{discoveryObj.rating}</Card.Text>
            <Link href={`/adventures/public/${discoveryObj.adventureId}`} passHref>
              <Button variant="primary" className="m-2">VIEW ADVENTURE</Button>
            </Link>
          </Card.Body>
        </Card>
      </BigDiscoveryCardContainer>
    </>
  );
}

BigDiscoveryCardPublic.propTypes = {
  discoveryObj: PropTypes.shape({
    adventureId: PropTypes.string,
    adventureTitle: PropTypes.string,
    details: PropTypes.string,
    firebaseKey: PropTypes.string,
    imageUrl: PropTypes.string,
    isComplete: PropTypes.bool,
    name: PropTypes.string,
    parentAdventureId: PropTypes.string,
    timeSubmitted: PropTypes.string,
    type: PropTypes.string,
    uid: PropTypes.string,
    isPublic: PropTypes.string,
    rating: PropTypes.string,
  }),
};

BigDiscoveryCardPublic.defaultProps = {
  discoveryObj: {
    adventureId: 'Adventure Id',
    adventureTitle: 'Adventure Title',
    details: 'Adventure Details',
    firebaseKey: 'Firebase Key',
    imageUrl: 'Image',
    isComplete: true,
    name: 'Adventure Name',
    parentAdventureId: 'Parent Adventure Id',
    timeSubmitted: 'Time Submitted',
    type: 'Flora',
    uid: 'UID',
    isPublic: false,
    rating: 3,
  },
};

const AddToExploreContainer = styled.div`
`;

const BigDiscoveryCardContainer = styled.div`
  width: 500px;
  height: 1000px;
  display: flex;
  border: solid black 2px;
  align-items: center;
`;
