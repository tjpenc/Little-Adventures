import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import BigAdventureCard from '../../../components/cards/BigAdventureCard';
import { getSingleAdventure } from '../../../api/adventuresData';
import { getDiscoveriesFromAdventure } from '../../../api/mergedData';
import LittleDiscoveryCard from '../../../components/cards/LittleDiscoveryCard';
import { BasicButton } from '../../../styles/commonStyles';

// view single adventure form
export default function ViewSingleAdventure() {
  const [adventure, setAdventure] = useState({});
  const [discoveries, setDiscoveries] = useState([]);

  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleAdventure(firebaseKey).then(setAdventure);
    getDiscoveriesFromAdventure(firebaseKey).then(setDiscoveries);
  }, [firebaseKey]);

  const onUpdate = () => {
    getSingleAdventure(firebaseKey).then(setAdventure);
    getDiscoveriesFromAdventure(firebaseKey).then(setDiscoveries);
  };

  return (
    <>
      {adventure.toBeExplored !== true
        ? (
          <Link href="/adventures/personal/myAdventures" passHref>
            <BasicButton variant="info">My Adventures</BasicButton>
          </Link>
        )
        : (
          <Link href="/toExplore/adventures" passHref>
            <Button variant="info">Discoveries to Find</Button>
          </Link>
        )}
      <BigAdventureCard key={firebaseKey} adventureObj={adventure} />
      {discoveries?.map((discovery) => (
        <LittleDiscoveryCard key={discovery.firebaseKey} discoveryObj={discovery} onUpdate={onUpdate} />
      ))}
    </>
  );
}
