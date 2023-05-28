import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getUserAdventures = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/adventures.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => (response.data))
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const getSingleUserAdventure = (firebaseKey) => new Promise((resolve, reject) => {
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

export {
  getUserAdventures, getSingleUserAdventure, deleteSingleAdventure, getAllAdventures,
};
