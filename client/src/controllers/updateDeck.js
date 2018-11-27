import axios from 'axios';
import { LOCAL_IP } from './../../../config.js';

const updateDeck = (data) => new Promise((resolve, reject) => {
  axios.put(`http://${LOCAL_IP}:3000/momento/deck/edit`, data)
    .then(resolve)
    .catch(reject);
});

export default updateDeck;