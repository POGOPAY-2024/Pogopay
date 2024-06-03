import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const instance = axios.create({
<<<<<<< HEAD
<<<<<<< HEAD
  baseURL: 'http://192.168.1.125:8000/api',
=======
  baseURL: 'http://192.168.1.129:8000/api',
>>>>>>> 0d7c3b3 (commit)
=======
  baseURL: 'http://192.168.1.131:8000/api',
>>>>>>> 62138f2 (commit)
  headers: {'Content-Type': 'application/json'},
});

instance.interceptors.request.use(
    async (config) => {
      const userToken = await AsyncStorage.getItem('userToken');
      config.headers.Authorization = `Bearer ${userToken}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

export default instance;