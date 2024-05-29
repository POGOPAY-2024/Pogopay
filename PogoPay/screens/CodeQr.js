import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import instance from "../axiosConfig"; // Import Axios instance

const CodeQr = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await instance.post('/generate-qr-code'); // Adjust the endpoint as per your API
      const { name, rib } = response.data; // Destructure the response data to extract name and rib
      setUserData({ name, rib });
    } catch (error) {
      console.error('Error fetching user data:', error);
      // Handle error fetching user data
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
        <Text>Loading.</Text>
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
