import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { getSingleUserDiscovery } from '../../../api/discoveriesData';
import BigDiscoveryCard from '../../../components/cards/BigDIscoveryCard';
import { getAdventureFromDiscovery } from '../../../api/mergedData';

// view single discovery form
export default function ViewSingleDiscovery() {
  const [discovery, setDiscovery] = useState({});
  const [adventure, setAdventure] = useState([]);

  const router = useRouter();
  const { firebaseKey } = router.query;

  const routeToMyDiscoveries = () => {
    router.push('/discoveries/personal/myDiscoveries');
  };

  useEffect(() => {
    getSingleUserDiscovery(firebaseKey).then((discoveryObj) => {
      setDiscovery(discoveryObj);
      getAdventureFromDiscovery(discoveryObj.adventureId).then((adventureObj) => {
        setAdventure(adventureObj);
      });
    });
  }, [firebaseKey]);

  return (
    <>
      <h1>{discovery.name} from {adventure[0]?.title}</h1>
      <Link href="/discoveries/personal/myDiscoveries" passHref>
        <Button variant="info">My Discoveries</Button>
      </Link>
      <BigDiscoveryCard key={discovery.firebaseKey} discoveryObj={discovery} onUpdate={routeToMyDiscoveries} />;
    </>
  );
}
