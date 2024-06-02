import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const instance = axios.create({
  baseURL: 'http://192.168.1.125:8000/api',
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