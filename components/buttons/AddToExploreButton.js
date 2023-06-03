import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { cloneDiscovery, getSingleDiscovery } from '../../api/discoveriesData';
import { cloneAdventure, getSingleAdventure } from '../../api/adventuresData';

export default function AddToExploreButton({ firebaseKey, isDiscovery }) {
  const { user } = useAuth();

  const addToExplorePage = () => {
    if (isDiscovery) {
      getSingleDiscovery(firebaseKey).then((discovery) => {
        cloneDiscovery(discovery, user).then(console.warn('added to explore page'));
      });
    } else {
      getSingleAdventure(firebaseKey).then((adventure) => {
        cloneAdventure(adventure, user).then(console.warn('added to explore page'));
      });
    }
  };

  return (
    <>
      <Button type="button" onClick={addToExplorePage}>+</Button>
    </>
  );
}

AddToExploreButton.propTypes = {
  firebaseKey: PropTypes.string.isRequired,
  isDiscovery: PropTypes.bool.isRequired,
};
// get object from outside the function
// create clone of the object
// update the object with new users uid and firebaseKey
// need to make discoveries independent first
