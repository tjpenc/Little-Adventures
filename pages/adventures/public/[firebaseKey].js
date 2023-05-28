// view single public adventure
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import BigAdventureCardPublic from '../../../components/public_components/BigAdventureCardPublic';
import { getSingleAdventure } from '../../../api/adventuresData';
import { getDiscoveriesFromAdventure } from '../../../api/mergedData';

// view single adventure form
export default function ViewSinglePublicAdventure() {
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
      <BigAdventureCardPublic key={firebaseKey} adventureObj={adventure} />
      {discoveries?.map((discovery) => (
        <p>This will be the place for {discovery.name}</p>
      ))}
    </>
  );
}
