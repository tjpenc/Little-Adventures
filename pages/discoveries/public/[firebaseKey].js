// view single public discovery
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { getSingleDiscovery } from '../../../api/discoveriesData';
// import BigDiscoveryCardPublic from '../../../components/public_components/BigDiscoveryCardPublic';
import BigDiscoveryCard from '../../../components/cards/BigDIscoveryCard';

export default function ViewSinglePublicDiscovery() {
  const [discovery, setDiscovery] = useState({});

  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleDiscovery(firebaseKey).then(setDiscovery);
  }, [firebaseKey]);

  return (
    <>
      <h1>{discovery.name} from {discovery.adventureTitle}</h1>
      <Link href="/discoveries/public/publicDiscoveries" passHref>
        <Button variant="info">Return to Public Discoveries</Button>
      </Link>
      <BigDiscoveryCard key={discovery.firebaseKey} discoveryObj={discovery} onUpdate={() => {}} />;
    </>
  );
}
