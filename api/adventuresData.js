import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getUserAdventures = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/adventures.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve((Object.values(response.data)));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const getSingleAdventure = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/adventures/${firebaseKey}.json`)
    .then((response) => (resolve(response.data)))
    .catch(reject);
});

const getAllAdventures = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/adventures.json`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
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

const updateAdventure = (patchPayload) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/adventures/${patchPayload.firebaseKey}.json`, patchPayload)
    .then(resolve)
    .catch(reject);
});

const cloneAdventure = (payload, user) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/adventures.json`, payload)
    .then((response) => {
      const patchPayload = {
        firebaseKey: response.data.name,
        uid: user.uid,
        toBeExplored: true,
        timeSubmitted: Date().toString(),
        parentAdventureId: payload.firebaseKey,
        filePath: '',
        imageUrl: '',
      };
      axios.patch(`${dbUrl}/adventures/${response.data.name}.json`, patchPayload)
        .then(resolve);
    }).catch(reject);
});

export {
  getUserAdventures, getSingleAdventure, deleteSingleAdventure, getAllAdventures, createAdventure, updateAdventure, cloneAdventure,
};
