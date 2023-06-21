import PropTypes from 'prop-types';
import { useAuth } from '../../utils/context/authContext';
import { cloneDiscovery, getSingleDiscovery } from '../../api/discoveriesData';
import { cloneAdventure, getSingleAdventure } from '../../api/adventuresData';
import { BasicButton } from '../../styles/commonStyles';

export default function AddToExploreButton({ firebaseKey, isDiscovery }) {
  const { user } = useAuth();

  const addToExplorePage = () => {
    if (isDiscovery) {
      getSingleDiscovery(firebaseKey).then((discovery) => {
        cloneDiscovery(discovery, user).then(alert(`${discovery.name} was added to your explore page`));
      });
    } else {
      getSingleAdventure(firebaseKey).then((adventure) => {
        cloneAdventure(adventure, user).then(alert(`${adventure.title} was added to your explore page`));
      });
    }
  };

  return (
    <>
      <BasicButton type="button" onClick={addToExplorePage}>+</BasicButton>
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
