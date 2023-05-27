import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { getSingleUserDiscovery } from '../../../api/discoveriesData';
import BigDiscoveryCard from '../../../components/BigDiscoveryCard';

// view single discovery form
export default function ViewSingleDiscovery() {
  const [discovery, setDiscovery] = useState({});

  const router = useRouter();
  const { firebaseKey } = router.query;

  const routeToMyDiscoveries = () => {
    router.push('/discoveries/personal/myDiscoveries');
  };

  useEffect(() => {
    getSingleUserDiscovery(firebaseKey).then(setDiscovery);
  }, [firebaseKey]);

  return (
    <>
      <h1>{discovery.name} from {discovery.adventureTitle}</h1>
      <Link href="/discoveries/personal/myDiscoveries" passHref>
        <Button variant="info">Return to My Discoveries</Button>
      </Link>
      <BigDiscoveryCard key={discovery.firebaseKey} discoveryObj={discovery} onUpdate={routeToMyDiscoveries} />;
    </>
  );
}
