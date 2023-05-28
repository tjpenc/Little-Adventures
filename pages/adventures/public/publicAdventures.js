import { useEffect, useState } from 'react';
import { getAllAdventures } from '../../../api/adventuresData';
import LittleAdventureCard from '../../../components/personal_components/LittleAdventureCard';

// view all public adventures
export default function ViewPublicAdventures() {
  const [adventures, setAdventures] = useState([]);

  const getPublicAdventures = () => getAllAdventures().then((adventuresArray) => {
    const publicAdventures = adventuresArray.filter((adventure) => adventure.isPublic === true);
    setAdventures(publicAdventures);
  });

  useEffect(() => {
    getPublicAdventures();
  }, []);

  return (
    <>
      {adventures?.map((adventure) => (
        <LittleAdventureCard key={adventure.firebaseKey} adventureObj={adventure} />
      ))}
    </>
  );
}
