// edit adventure form
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleAdventure } from '../../../../api/adventuresData';
import AdventureForm from '../../../../components/forms/AdventureForm';

export default function EditAdventure() {
  const [adventure, setAdventure] = useState({});

  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleAdventure(firebaseKey).then(setAdventure);
  }, [firebaseKey]);

  return (
    <>
      <h1>Edit {adventure.title} Adventure </h1>
      <AdventureForm adventureObj={adventure} />
    </>
  );
}
