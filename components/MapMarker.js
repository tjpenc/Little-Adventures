import { Card } from 'react-bootstrap';
import { PropTypes } from 'prop-types';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';

export default function MapMarker({ discoveryObj }) {
  const router = useRouter();
  const { user } = useAuth();
  const viewDiscovery = () => {
    if (user.uid === discoveryObj.uid) {
      router.push(`/discoveries/personal/${discoveryObj.firebaseKey}`);
    } else {
      router.push(`/discoveries/public/${discoveryObj.firebaseKey}`);
    }
  };

  return (
    <Card style={{ width: '50px' }} onClick={viewDiscovery}>
      <Card.Img variant="top" src={discoveryObj.imageUrl} alt="thing" style={{ height: '50px' }} />
    </Card>
  );
}

MapMarker.propTypes = {
  discoveryObj: PropTypes.shape({
    imageUrl: PropTypes.string.isRequired,
    firebaseKey: PropTypes.string.isRequired,
    uid: PropTypes.string.isRequired,
  }).isRequired,
};
