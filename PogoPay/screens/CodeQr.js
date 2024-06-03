import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions, ActivityIndicator } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CodeQr = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const userDataJson = await AsyncStorage.getItem('userData');
      if (userDataJson !== null) {
        const user = JSON.parse(userDataJson);
        const { name, rib } = user; 
        setUserData({ name, rib });
      } else {
        setError('User data not found');
      }
    } catch (error) {
      console.error('Error fetching user data:', error.message);
      setError('Failed to fetch user data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        userData && (
          <View style={styles.card}>
            <QRCode
              value={JSON.stringify({ name: userData.name , rib: userData.rib })}
              size={200}
            />
            <Text style={styles.codeText}>Scan this QR code</Text>
          </View>
        )
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
    backgroundColor: '#fff',
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
  errorText: {
    color: 'red',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default CodeQr;