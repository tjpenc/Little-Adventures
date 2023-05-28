import axios from 'axios';
import { clientCredentials } from '../utils/client';

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

export { getAdventureFromDiscovery, getDiscoveriesFromAdventure };
