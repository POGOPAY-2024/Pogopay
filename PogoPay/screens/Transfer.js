import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, TextInput, TouchableOpacity, Alert, Dimensions, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function Transfer({ route, navigation }) {
  const { qrData } = route.params;
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const handleTransfer = () => {
    if (!paymentMethod) {
      // Set the default payment method (active card)
      setPaymentMethod("Default Card");
    }

    if (amount) {
      navigation.navigate('Confirm', { qrData, amount, paymentMethod });
    } else {
      Alert.alert('Error', 'Please enter the amount.', [{ text: 'OK' }]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transfer Money</Text>
      <Text style={styles.subtitle}>Please enter the amount and select the payment method.</Text>
      <Image style={styles.image} source={require('../assets/transfer1.png')} />

      <TextInput
        style={styles.input}
        placeholder="Enter amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={paymentMethod}
          style={styles.picker}
          onValueChange={(itemValue) => setPaymentMethod(itemValue)}
        >
          <Picker.Item label="Select payment method" value="" />
          <Picker.Item label="Default Card" value="Default Card" />
          <Picker.Item label="Credit Card" value="Credit Card" />
          <Picker.Item label="Bank Transfer" value="Bank Transfer" />
        </Picker>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleTransfer}>
        <Text style={styles.buttonText}>Transfer</Text>
      </TouchableOpacity>
    </View>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: width * 0.08,
    fontWeight: 'bold',
    marginBottom: height * 0.02,
  },
  subtitle: {
    fontSize: width * 0.045,
    color: '#666',
    textAlign: 'center',
    marginBottom: height * 0.04,
  },
  image: {
    width: '70%',
    height: 180,
    marginBottom: 60,
  },
  input: {
    height: height * 0.07,
    width: '100%',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: width * 0.045,
    marginBottom: height * 0.02,
    backgroundColor: '#fff',
  },
  pickerContainer: {
    width: '100%',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: height * 0.02,
    overflow: 'hidden',
  },
  picker: {
    height: height * 0.07,
    width: '100%',
  },
  button: {
    width: '100%',
    backgroundColor: '#03D3B9',
    paddingVertical: height * 0.02,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: width * 0.045,
    fontWeight: 'bold',
  },
});
