import PropTypes from 'prop-types';
import { useAuth } from '../../utils/context/authContext';
import { cloneDiscovery, getSingleDiscovery } from '../../api/discoveriesData';
import { cloneAdventure, getSingleAdventure } from '../../api/adventuresData';
import { BasicButton } from '../../styles/commonStyles';
// import { storage } from '../../utils/client';

export default function AddToExploreButton({ firebaseKey, isDiscovery }) {
  const { user } = useAuth();

  // const copyImage = (obj) => {
  //   const sourceFilePath = obj.filePath;
  //   const [, image] = sourceFilePath.split('/');
  //   const newFilePath = `${user.uid}/${image}`;
  //   const sourceRef = storage.ref(sourceFilePath);
  //   const newFileRef = storage.ref().child(newFilePath);

  //   sourceRef.getDownloadURL().then((Url) => {
  //     fetch(Url).then((response) => response.blob())
  //       .then((blob) => {
  //         newFileRef.put(blob);
  //       }).then(console.warn('copied image'));
  //   }).catch((error) => console.warn(error));
  // };

  const addToExplorePage = (e) => {
    e.stopPropagation();
    if (isDiscovery) {
      getSingleDiscovery(firebaseKey).then((discovery) => {
        // copyImage(discovery);
        cloneDiscovery(discovery, user).then(alert(`${discovery.name} was added to your explore page`));
      });
    } else {
      getSingleAdventure(firebaseKey).then((adventure) => {
        // copyImage(adventure);
        cloneAdventure(adventure, user).then(alert(`${adventure.title} was added to your explore page`));
      });
    }
  };

  return (
    <>
      <BasicButton type="button" onClick={(e) => { addToExplorePage(e); }}>+</BasicButton>
    </>
  );
}

AddToExploreButton.propTypes = {
  firebaseKey: PropTypes.string,
  isDiscovery: PropTypes.bool.isRequired,
};

AddToExploreButton.defaultProps = {
  firebaseKey: '',
};
// get object from outside the function
// create clone of the object
// update the object with new users uid and firebaseKey
// need to make discoveries independent first
