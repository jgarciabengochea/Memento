import axios from 'axios';
import { LOCAL_IP } from './../../../config.js';

const getDecks = () => new Promise((resolve, reject) => {
  axios.get(`http://${LOCAL_IP}:3000/momento/decks`)
    .then((response) => {
      resolve(response.data);
    })
    .catch(err => { reject(err) });
});

export default getDecks;