import React from 'react';
import { View, StyleSheet, Image, Dimensions, TouchableOpacity, Text } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const CodeQr = () => {
  // User details (replace with actual data)
  const userDetails = {
    username: 'khaoula', // Replace with actual username
    rib: '123456789012345678901234', // Replace with actual RIB
  };

  // Generate QR code data
  const qrData = JSON.stringify(userDetails);

 

  return (
    <View style={styles.container}>
     

      <View style={styles.card}>
        <QRCode value={qrData} size={200} style={styles.codeqr} />
      </View>
      <Text style={styles.codeText}>Scan this QR code</Text>

      
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 30,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#042552',
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
  image: {
    width: width * 0.3,
    height: width * 0.3,
    borderRadius: (width * 0.3) / 2,
    marginBottom: height * 0.06,
  },
  codeqr: {
   
  },
  codeText: {
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
  },
  scanButton: {
    marginTop: 20, 
    backgroundColor: '#03D3B9',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  scanButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default CodeQr;
