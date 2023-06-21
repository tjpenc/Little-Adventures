import { Card } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { getSingleDiscovery } from '../api/discoveriesData';

export default function TestPage() {
  const [discovery, setDiscovery] = useState({});
  const firebaseKey = '-NYQmfBr6UAsxauQE09K';

  useEffect(() => {
    getSingleDiscovery(firebaseKey).then(setDiscovery);
  }, [firebaseKey]);

  return (
    <>
      <Card.Img variant="top" target="_blank" src={discovery.uploadedUrl} alt={discovery.name} style={{ height: '200px' }} />
      {console.warn(discovery.imageUrl)}
    </>
  );
}
