import { useEffect, useState } from 'react';
import { getAllAdventures } from '../../../api/adventuresData';
import LittleAdventureCard from '../../../components/cards/LittleAdventureCard';
import { useAuth } from '../../../utils/context/authContext';
import { getAllAdventuresAndDiscoveries } from '../../../api/mergedData';

// view all public adventures
export default function ViewPublicAdventures() {
  const [adventures, setAdventures] = useState([]);
  const { user } = useAuth();

  const getPublicAdventures = () => getAllAdventures().then((adventuresArray) => {
    const publicAdventures = adventuresArray.filter((adventure) => adventure.isPublic === true);
    setAdventures(publicAdventures);
  });

  useEffect(() => {
    getPublicAdventures();
    getAllAdventuresAndDiscoveries().then((array) => {
      console.warn(array);
    });
  }, []);

  return (
    <>
      <h1>Public Adventures</h1>
      {adventures?.map((adventure) => (
        adventure.uid !== user.uid
          ? <LittleAdventureCard key={adventure.firebaseKey} adventureObj={adventure} onUpdate={() => {}} />
          : ''
      ))}
    </>
  );
}
