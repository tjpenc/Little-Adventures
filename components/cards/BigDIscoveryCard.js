import { PropTypes } from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import styled from 'styled-components';
import { AddToExploreContainer } from '../../styles/commonStyles';
import { useAuth } from '../../utils/context/authContext';
import { deleteSingleDiscovery } from '../../api/discoveriesData';
import AddToExploreButton from '../buttons/AddToExploreButton';
import photoStorage from '../../utils/photoStorage';
import Ratings from '../Ratings';
import CardImages from '../CardImages';
// import Slider from '../Slider';

export default function BigDiscoveryCard({ discoveryObj, onUpdate }) {
  const { user } = useAuth();
  const deleteThisDiscovery = () => deleteSingleDiscovery(discoveryObj.firebaseKey)
    .then(discoveryObj.filePath && photoStorage.delete(discoveryObj.filePath))
    .then(onUpdate);

  return (
    <>
      <BigDiscoveryCardContainer>
        <Card style={{ width: '18rem', margin: '10px' }}>
          {/* <Slider /> */}
          {discoveryObj.uid !== user.uid
            ? <AddToExploreContainer><AddToExploreButton firebaseKey={discoveryObj.firebaseKey} isDiscovery /></AddToExploreContainer>
            : ''}
          <CardImages obj={discoveryObj} />
          <Card.Body>
            <Card.Title>{discoveryObj.name}</Card.Title>
            <Card.Text>Type: {discoveryObj.type}</Card.Text>
            <Card.Text>Details: {discoveryObj.details}</Card.Text>
            <Card.Text><Ratings obj={discoveryObj} /></Card.Text>
            {discoveryObj.uid !== user.uid ? (
              <>
                <Link href={`/adventures/public/${discoveryObj.adventureId}`} passHref>
                  <Button variant="primary" className="m-2">VIEW ADVENTURE</Button>
                </Link>
              </>
            ) : (
              <>
                {discoveryObj.adventureId !== 'none'
                && (
                <Link href={`/adventures/personal/${discoveryObj.adventureId}`} passHref>
                  <Button variant="primary" className="m-2">VIEW ADVENTURE</Button>
                </Link>
                )}
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
    filePath: PropTypes.string,
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
    rating: 3,
    filePath: '',
  },
};

const BigDiscoveryCardContainer = styled.div`
  width: 500px;
  height: 1000px;
  display: flex;
  border: solid black 2px;
  align-items: center;
`;
