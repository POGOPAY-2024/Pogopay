import React from 'react';
import { View, StyleSheet, Image, Dimensions, TouchableOpacity, Text } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const CodeQr = () => {
  // Transfer details (replace with actual data)
  const transferDetails = {
    recipient: 'John Doe',
    amount: '$100',
    transactionId: '123456789',
  };

  // Generate QR code data
  const qrData = JSON.stringify(transferDetails);

  const handleScan = () => {
    // Add your logic for scanning here
    // This function will be called when the button is pressed
    console.log('Scan button pressed');
  };

  return (
    <View style={styles.container}>
      {/* <Image style={styles.image} source={require('../assets/user1.png')} />
      <Text style={styles.username}>khaoula</Text> */}

      <View style={styles.card}>
        <QRCode value={qrData} size={200} style={styles.codeqr} />
      </View>
      <Text style={styles.codeText}>Scan this QR code to receive money</Text>


      <TouchableOpacity style={styles.scanButton} onPress={handleScan}>
        <Text style={styles.scanButtonText}>Scan QR Code</Text>
      </TouchableOpacity>
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 30, // Adjust this value as needed
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
    top: -90,
  },
  image: {
    width: width * 0.3,
    height: width * 0.3,
    borderRadius: (width * 0.3) / 2,
    marginBottom: height * 0.06,
    top: -110,
  },
  codeqr: {
    // Add any additional styles for the QR code
  },
  codeText: {
    marginTop: 10,
    fontSize: 16,
    top:-50
  },
  scanButton: {
    marginTop: 20, // Adjust this value as needed
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
