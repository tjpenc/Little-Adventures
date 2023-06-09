import axios from 'axios';
import { clientCredentials } from '../utils/client';
import { deleteSingleDiscovery, getAllDiscoveries } from './discoveriesData';
import { deleteSingleAdventure, getAllAdventures } from './adventuresData';

const dbUrl = clientCredentials.databaseURL;

const getAdventureFromDiscovery = (adventureId) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/adventures.json?orderBy="firebaseKey"&equalTo="${adventureId}"`)
    .then((response) => response.data)
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const getDiscoveriesFromAdventure = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/discoveries.json?orderBy="adventureId"&equalTo="${firebaseKey}"`)
    .then((response) => response.data)
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const deleteDiscoveriesOfAdventure = (firebaseKey) => new Promise((resolve, reject) => {
  getDiscoveriesFromAdventure(firebaseKey).then((adventuresArray) => {
    const deleteAdventurePromises = adventuresArray?.map((adventure) => deleteSingleDiscovery(adventure.firebaseKey));

    Promise.all(deleteAdventurePromises).then(() => {
      deleteSingleAdventure(firebaseKey).then(resolve);
    });
  }).catch((error) => reject(error));
});

const getAllAdventuresAndDiscoveries = () => new Promise((resolve, reject) => {
  getAllAdventures().then((adventures) => {
    const adventuresArray = adventures;
    getAllDiscoveries().then((discoveries) => {
      const allObjectsArray = adventuresArray.concat(discoveries);
      resolve(allObjectsArray);
    });
  })
    .catch(reject);
});

export {
  getAdventureFromDiscovery,
  getDiscoveriesFromAdventure,
  deleteDiscoveriesOfAdventure,
  getAllAdventuresAndDiscoveries,
};
