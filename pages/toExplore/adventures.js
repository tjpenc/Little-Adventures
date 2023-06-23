import { useState, useEffect } from 'react';
import { useAuth } from '../../utils/context/authContext';
import { getUserAdventures } from '../../api/adventuresData';
import LittleAdventureCard from '../../components/cards/LittleAdventureCard';

export default function ViewAdvneturesToExplore() {
  const [adventures, setAdventures] = useState([]);
  const { user } = useAuth();

  const getToBeExploredAdventures = () => getUserAdventures(user.uid).then((adventuresArray) => {
    const toBeExploredAdventures = adventuresArray.filter((adventure) => adventure.toBeExplored === true);
    setAdventures(toBeExploredAdventures);
  });

  useEffect(() => {
    getToBeExploredAdventures();
  }, []);

  return (
    <>
      <h1>Adventures to be Had</h1>
      {adventures?.map((adventure) => (
        <LittleAdventureCard key={adventure.firebaseKey} adventureObj={adventure} onUpdate={getToBeExploredAdventures} />
      ))}
    </>
  );
}
