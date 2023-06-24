import { PropTypes } from 'prop-types';
import { Card } from 'react-bootstrap';
import Link from 'next/link';
import styled from 'styled-components';
import { AddToExploreContainer, BasicButton } from '../../styles/commonStyles';
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
                  <BasicButton variant="primary" className="m-2">VIEW ADVENTURE</BasicButton>
                </Link>
              </>
            ) : (
              <>
                {discoveryObj.adventureId !== 'none'
                && (
                <Link href={`/adventures/personal/${discoveryObj.adventureId}`} passHref>
                  <BasicButton variant="primary" className="m-2">VIEW ADVENTURE</BasicButton>
                </Link>
                )}
                <Link href={`/discoveries/personal/edit/${discoveryObj.firebaseKey}`} passHref>
                  <BasicButton variant="info">EDIT</BasicButton>
                </Link>
                <BasicButton variant="danger" onClick={deleteThisDiscovery} className="m-2">
                  DELETE
                </BasicButton>
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
  width: 30%;
  height: 250%;
  display: flex;
  align-items: center;
`;
