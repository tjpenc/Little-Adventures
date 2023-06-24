import { Card } from 'react-bootstrap';
import { PropTypes } from 'prop-types';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useAuth } from '../utils/context/authContext';

export default function MapMarker({ discoveryObj }) {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  const viewDiscovery = () => {
    if (user.uid === discoveryObj.uid) {
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
    <Card
      style={{
        width: '50px',
        transform: isHovered ? 'scale(1.01)' : '',
        boxShadow: isHovered ? '0 0 10px rgba(0, 0, 0, 0.3)' : '',
        cursor: isHovered ? 'pointer' : '',
      }}
      onClick={viewDiscovery}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* <Card style={{ width: '50px' }} onClick={viewDiscovery}> */}
      <Card.Img variant="top" src={discoveryObj.imageUrl} alt="thing" style={{ height: '50px' }} />
    </Card>
  );
}

MapMarker.propTypes = {
  discoveryObj: PropTypes.shape({
    imageUrl: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }),
};

MapMarker.defaultProps = {
  discoveryObj: {
    imageUrl: '',
    firebaseKey: '',
    uid: '',
  },
};
