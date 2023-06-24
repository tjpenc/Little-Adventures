import { PropTypes } from 'prop-types';
import { Card } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';
import Image from 'next/image';
import { useState } from 'react';
import { deleteSingleDiscovery } from '../../api/discoveriesData';
import { useAuth } from '../../utils/context/authContext';
import { BasicButton } from '../../styles/commonStyles';
import AddToExploreButton from '../buttons/AddToExploreButton';
import photoStorage from '../../utils/photoStorage';
import Ratings from '../Ratings';
import CardImages from '../CardImages';

export default function LittleDiscoveryCard({ discoveryObj, onUpdate }) {
  const [isHovered, setIsHovered] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  const handleDelete = (e) => {
    e.stopPropagation();
    deleteSingleDiscovery(discoveryObj.firebaseKey)
      .then(discoveryObj.filePath && photoStorage.delete(discoveryObj.filePath))
      .then(onUpdate);
  };

  const viewCard = () => {
    if (discoveryObj.uid === user.uid) {
      router.push(`/discoveries/personal/${discoveryObj.firebaseKey}`);
    } else {
      router.push(`/discoveries/public/${discoveryObj.firebaseKey}`);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <LittleDiscoveryCardContainer>
      <Card
        style={{
          width: '18rem',
          margin: '10px',
          transform: isHovered ? 'scale(1.01)' : '',
          boxShadow: isHovered ? '0 0 10px rgba(0, 0, 0, 0.3)' : '',
        }}
        onClick={viewCard}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* <Card.Img variant="top" src="/compass.png" alt={discoveryObj.name} style={{ height: '200px' }} /> */}
        <CardImages obj={discoveryObj} />
        <Card.Body>
          <Card.Title>{discoveryObj.name}</Card.Title>
          <Card.Text>Type: {discoveryObj.type}</Card.Text>
          <Card.Text><Ratings obj={discoveryObj} /></Card.Text>
          {discoveryObj.uid === user.uid ? (
            <>
              <Link href={`/discoveries/personal/edit/${discoveryObj.firebaseKey}`} passHref>
                <BasicButton onClick={(e) => e.stopPropagation()}>
                  <Image src="/edit.png" width="20px" height="20px" />
                </BasicButton>
              </Link>
              <BasicButton onClick={handleDelete}>
                <Image src="/delete.png" width="20px" height="20px" />
              </BasicButton>
            </>
          ) : <AddToExploreButton firebaseKey={discoveryObj.firebaseKey} isDiscovery />}
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
    filePath: PropTypes.string,
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
    filePath: '',
  },
};

const LittleDiscoveryCardContainer = styled.div`
  width: 300px;
  height: 500px;
  display: flex;
  align-items: center;
  cursor: pointer;

  /* &:hover {
    transform: scale(1.1);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  } */
`;
