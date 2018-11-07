import axios from 'axios';

 const instance = axios.create({
	baseURL: 'https://react-my-burger-a9222.firebaseio.com/'
});

 export default instance;