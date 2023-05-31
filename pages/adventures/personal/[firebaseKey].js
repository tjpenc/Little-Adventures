import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import BigAdventureCard from '../../../components/personal_components/BigAdventureCard';
import { getSingleAdventure } from '../../../api/adventuresData';
import { getDiscoveriesFromAdventure } from '../../../api/mergedData';

// view single adventure form
export default function ViewSingleAdventure() {
  const [adventure, setAdventure] = useState();
  const [discoveries, setDiscoveries] = useState();

  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleAdventure(firebaseKey).then(setAdventure);
    getDiscoveriesFromAdventure(firebaseKey).then(setDiscoveries);
  }, [firebaseKey]);

  // map over little discoveries once styled
  return (
    <>
      <Link href="/adventures/personal/myAdventures" passHref>
        <Button variant="info">Return to My Adventures</Button>
      </Link>
      <BigAdventureCard key={firebaseKey} adventureObj={adventure} />
      {discoveries?.map((discovery) => (
        <p key={discovery.firebaseKey}>This will be the place for {discovery.name}</p>
      ))}
    </>
  );
}
