import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getUserDiscoveries = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/discoveries.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => (response.data))
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const deleteSingleDiscovery = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/discoveries/${firebaseKey}.json`)
    .then((response) => (response.data))
    .then((data) => resolve(data))
    .catch(reject);
});

export { getUserDiscoveries, deleteSingleDiscovery };
