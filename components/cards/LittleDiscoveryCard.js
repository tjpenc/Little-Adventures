import { PropTypes } from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import styled from 'styled-components';
import { deleteSingleDiscovery } from '../../api/discoveriesData';
import { useAuth } from '../../utils/context/authContext';
import { AddToExploreContainer } from '../../styles/commonStyles';
import AddToExploreButton from '../buttons/AddToExploreButton';

export default function LittleDiscoveryCard({ discoveryObj, onUpdate }) {
  const { user } = useAuth();
  const deleteThisDiscovery = () => deleteSingleDiscovery(discoveryObj.firebaseKey).then(onUpdate);

  return (
    <LittleDiscoveryCardContainer>
      <Card style={{ width: '18rem', margin: '10px' }}>
        {discoveryObj.uid !== user.uid
          ? <AddToExploreContainer><AddToExploreButton firebaseKey={discoveryObj.firebaseKey} isDiscovery /></AddToExploreContainer>
          : '' }
        <Card.Img variant="top" src={discoveryObj.imageUrl} alt={discoveryObj.name} style={{ height: '200px' }} />
        <Card.Body>
          <Card.Title>{discoveryObj.name}</Card.Title>
          <Card.Text>Type: {discoveryObj.type}</Card.Text>
          <Card.Text>Details: {discoveryObj.details}</Card.Text>
          <Card.Text>Rating: {discoveryObj.rating}</Card.Text>
          {discoveryObj.uid !== user.uid ? (
            <>
              <Link href={`/discoveries/public/${discoveryObj.firebaseKey}`} passHref>
                <Button variant="primary" className="m-2">VIEW</Button>
              </Link>
            </>
          ) : (
            <>
              <Link href={`/discoveries/personal/${discoveryObj.firebaseKey}`} passHref>
                <Button variant="primary" className="m-2">VIEW</Button>
              </Link>
              <Link href={`/discoveries/personal/edit/${discoveryObj.firebaseKey}`} passHref>
                <Button variant="info">EDIT</Button>
              </Link>
              <Button variant="danger" onClick={deleteThisDiscovery} className="m-2">
                DELETE
              </Button>
            </>
          )}
        </Card.Body>
      </Card>
    </LittleDiscoveryCardContainer>
  );
}

LittleDiscoveryCard.propTypes = {
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
  onUpdate: PropTypes.func.isRequired,
};

LittleDiscoveryCard.defaultProps = {
  discoveryObj: {
    adventureId: 'Adventure Id',
    details: 'Adventure Details',
    firebaseKey: 'Firebase Key',
    imageUrl: 'Image',
    toBeDiscovered: false,
    isPublic: false,
    name: 'Adventure Name',
    parentDiscoveryId: 'Parent Discovery Id',
    timeSubmitted: 'Time Submitted',
    type: 'Flora',
    uid: 'UID',
    rating: 3,
  },
};

const LittleDiscoveryCardContainer = styled.div`
  width: 300px;
  height: 500px;
  display: flex;
  border: solid black 2px;
  align-items: center;
`;
