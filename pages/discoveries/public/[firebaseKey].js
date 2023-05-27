// view single public discovery
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { getSingleUserDiscovery } from '../../../api/discoveriesData';
import BigDiscoveryCardPublic from '../../../components/BigDiscoveryCardPublic';

export default function ViewSinglePublicDiscovery() {
  const [discovery, setDiscovery] = useState({});

  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleUserDiscovery(firebaseKey).then(setDiscovery);
  }, [firebaseKey]);

  return (
    <>
      <h1>{discovery.name} from {discovery.adventureTitle}</h1>
      <Link href="/discoveries/personal/myDiscoveries" passHref>
        <Button variant="info">Return to Public Discoveries</Button>
      </Link>
      <BigDiscoveryCardPublic key={discovery.firebaseKey} discoveryObj={discovery} />;
    </>
  );
}
