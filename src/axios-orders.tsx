import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-pakamore-burger-default-rtdb.firebaseio.com/'
});

export default instance;