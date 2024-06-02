import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions, Alert } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'; // Assurez-vous d'importer axios

const CodeQr = () => {
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState('');
  const [user, setUser] = useState({});

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const userDataJson = await AsyncStorage.getItem('userData');
      const tk = await AsyncStorage.getItem('userToken');
      setToken(tk);
      if (userDataJson !== null) {
        const user = JSON.parse(userDataJson);
        setUser(user);
        const userId=user.id;
        fetchQRData(userId, tk);
       
      } else {
        console.log('userData is null');
      }
     
      
      
    } catch (error) {
      console.error('Error fetching user data:', error.message);
      Alert.alert('Error', 'Failed to fetch data. Please try again.');
    }
  };

  const fetchQRData = async (userId, token) => {
    try {
      const response = await axios.get(`http://192.168.1.125:8000/api/generate-qr-code/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.status === 200) {
        setUserData(response.data);      } else {
        console.error('Error fetching card data 1:', response.data);
        Alert.alert('Error', 'Failed to fetch card ');
      }
    } catch (error) {
      console.error('Error fetching card data:', error.message);
      Alert.alert('Error', 'Failed to fetch card data');
    }
  };
  return (
    <View style={styles.container}>
      {userData ? (
        <View style={styles.card}>
          <QRCode
            value={JSON.stringify({ name: userData.name, rib: userData.rib })}
            size={200}
          />
          <Text style={styles.codeText}>Scan this QR code</Text>
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: height * 0.05,
  },
  codeText: {
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default CodeQr;
