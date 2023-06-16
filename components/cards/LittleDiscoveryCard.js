import { PropTypes } from 'prop-types';
import { Card } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Image from 'next/image';
import { deleteSingleDiscovery } from '../../api/discoveriesData';
import { useAuth } from '../../utils/context/authContext';
import { AddToExploreContainer, BasicButton } from '../../styles/commonStyles';
import AddToExploreButton from '../buttons/AddToExploreButton';

export default function LittleDiscoveryCard({ discoveryObj, onUpdate }) {
  const [ratingType, setRatingType] = useState('');
  const { user } = useAuth();
  const router = useRouter();
  const numSlots = Number(discoveryObj.rating);
  const ratingArray = Array(numSlots).fill(null);
  const deleteThisDiscovery = () => deleteSingleDiscovery(discoveryObj.firebaseKey).then(onUpdate);

  const viewCard = () => {
    if (discoveryObj.uid === user.uid) {
      router.push(`/discoveries/personal/${discoveryObj.firebaseKey}`);
    } else {
      router.push(`/discoveries/public/${discoveryObj.firebaseKey}`);
    }
  };

  const getRatingType = () => {
    if (discoveryObj.type === 'Flora' || discoveryObj.type === 'Fauna') {
      setRatingType('Rarity');
    } else if (discoveryObj.type === 'Landmark') {
      setRatingType('Neatness');
    } else {
      setRatingType('Spooks');
    }
  };

  useEffect(() => {
    getRatingType();
  }, [discoveryObj]);

  return (
    <LittleDiscoveryCardContainer>
      <Card style={{ width: '18rem', margin: '10px' }} onClick={viewCard}>
        {discoveryObj.uid !== user.uid
          ? <AddToExploreContainer><AddToExploreButton firebaseKey={discoveryObj.firebaseKey} isDiscovery /></AddToExploreContainer>
          : '' }
        <Card.Img variant="top" src={discoveryObj.imageUrl} alt={discoveryObj.name} style={{ height: '200px' }} />
        <Card.Body>
          <Card.Title>{discoveryObj.name}</Card.Title>
          <Card.Text>Type: {discoveryObj.type}</Card.Text>
          <Card.Text>
            <p>{ratingType}: {ratingArray.map(() => (
              <Image src="/star.png" width="10px" height="10px" />
            ))}
            </p>
          </Card.Text>
          {discoveryObj.uid === user.uid && (
            <>
              <Link href={`/discoveries/personal/edit/${discoveryObj.firebaseKey}`} passHref>
                <BasicButton onClick={(e) => e.stopPropagation()}>
                  <Image src="/edit.png" width="20px" height="20px" />
                </BasicButton>
              </Link>
              <BasicButton onClick={(e) => e.stopPropagation()}>
                <Image src="/delete.png" width="20px" height="20px" onClick={deleteThisDiscovery} />
              </BasicButton>
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
  align-items: center;
`;
