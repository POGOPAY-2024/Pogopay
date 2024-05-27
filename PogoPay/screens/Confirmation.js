import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert, Dimensions } from 'react-native';

export default function Confirmation({ route, navigation }) {
  const { qrData, amount, paymentMethod } = route.params;

  const handleConfirm = () => {
    Alert.alert(
      "Confirm Transfer",
      "Are you sure you want to confirm this transfer?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "Confirm", onPress: () => navigation.navigate('Home') }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Transfer Confirmation</Text>
        <View style={styles.detail}>
          <Text style={styles.label}>Transferred Data:</Text>
          <Text style={styles.value}>{qrData}</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.label}>Amount:</Text>
          <Text style={styles.value}>{amount}</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.label}>Payment Method:</Text>
          <Text style={styles.value}>{paymentMethod}</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleConfirm}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  card: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  title: {
    fontSize: width * 0.08,
    fontWeight: 'bold',
    marginBottom: height * 0.02,
    textAlign: 'center',
  },
  detail: {
    alignItems: 'center', 
    justifyContent: 'space-between',
    marginVertical: height * 0.01,
    paddingHorizontal: width * 0.03,
    borderColor: '#ddd',
    borderBottomWidth: 1,
    paddingBottom: height * 0.015, 
  },
  label: {
    fontSize: width * 0.045,
    color: '#666',
  },
  value: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#333',
  },
  button: {
    backgroundColor: '#03D3B9',
    paddingVertical: height * 0.02,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: height * 0.03,
  },
  buttonText: {
    color: '#fff',
    fontSize: width * 0.045,
    fontWeight: 'bold',
  },
});

