import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { getSingleDiscovery } from '../../../api/discoveriesData';
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
    getSingleDiscovery(firebaseKey).then((discoveryObj) => {
      setDiscovery(discoveryObj);
      getAdventureFromDiscovery(discoveryObj.adventureId).then((adventureObj) => {
        setAdventure(adventureObj);
      });
    });
  }, [firebaseKey]);

  return (
    <>
      {adventure[0]?.title
        ? <h1>{discovery.name} from {adventure[0]?.title} Adventure</h1>
        : <h1>{discovery.name}</h1>}
      {discovery.toBeDiscovered !== true
        ? (
          <Link href="/discoveries/personal/myDiscoveries" passHref>
            <Button variant="info">My Discoveries</Button>
          </Link>
        )
        : (
          <Link href="/toExplore/discoveries" passHref>
            <Button variant="info">Discoveries to Find</Button>
          </Link>
        )}
      <BigDiscoveryCard key={discovery.firebaseKey} discoveryObj={discovery} onUpdate={routeToMyDiscoveries} />;
    </>
  );
}
