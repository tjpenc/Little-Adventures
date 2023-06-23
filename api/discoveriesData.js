import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getUserDiscoveries = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/discoveries.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const getSingleDiscovery = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/discoveries/${firebaseKey}.json`)
    .then((response) => (resolve(response.data)))
    .catch(reject);
});

const getAllDiscoveries = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/discoveries.json`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const deleteSingleDiscovery = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/discoveries/${firebaseKey}.json`)
    .then((response) => (response.data))
    .then((data) => resolve(data))
    .catch(reject);
});

const createDiscovery = (payload) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/discoveries.json`, payload)
    .then((response) => {
      const patchPayload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/discoveries/${response.data.name}.json`, patchPayload)
        .then(resolve);
    }).catch(reject);
});

const updateDiscovery = (patchPayload) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/discoveries/${patchPayload.firebaseKey}.json`, patchPayload)
    .then(resolve)
    .catch(reject);
});

const cloneDiscovery = (payload, user) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/discoveries.json`, payload)
    .then((response) => {
      const patchPayload = {
        firebaseKey: response.data.name,
        uid: user.uid,
        toBeDiscovered: true,
        adventureId: 'none',
        timeSubmitted: Date().toString(),
        parentDiscoveryId: payload.firebaseKey,
        filePath: '',
        imageUrl: '',
      };
      axios.patch(`${dbUrl}/discoveries/${response.data.name}.json`, patchPayload)
        .then(resolve);
    }).catch(reject);
});

export {
  getUserDiscoveries, deleteSingleDiscovery, getSingleDiscovery, getAllDiscoveries, createDiscovery, updateDiscovery, cloneDiscovery,
};
