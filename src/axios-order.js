import axios from 'axios';

const instance = axios.create({
    baseUrl: 'https://react-my-burger-54868-default-rtdb.firebaseio.com/'
});

export default instance;