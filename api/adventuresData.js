import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getUserAdventures = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/adventures.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => (response.data))
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const getSingleAdventure = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/adventures/${firebaseKey}.json`)
    .then((response) => (resolve(response.data)))
    .catch(reject);
});

const getAllAdventures = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/adventures.json`)
    .then((response) => (response.data))
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const deleteSingleAdventure = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/adventures/${firebaseKey}.json`)
    .then((response) => (response.data))
    .then((data) => resolve(data))
    .catch(reject);
});

const createAdventure = (payload) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/adventures.json`, payload)
    .then((response) => {
      const patchPayload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/adventures/${response.data.name}.json`, patchPayload)
        .then(resolve);
    }).catch(reject);
});

export {
  getUserAdventures, getSingleAdventure, deleteSingleAdventure, getAllAdventures, createAdventure,
};
