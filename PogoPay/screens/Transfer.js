import React, { useState } from 'react';
import { Text, View, StyleSheet, Button,TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function Transfer({ route, navigation }) {
  const { qrData } = route.params;
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const handleTransfer = () => {
    // Validate amount and payment method
    if (amount && paymentMethod) {
      navigation.navigate('Confirm', { qrData, amount, paymentMethod });
    } else {
      alert('Please enter amount and select payment method.');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Transferred Data:</Text>
      <Text>{qrData}</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      <Picker
        selectedValue={paymentMethod}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setPaymentMethod(itemValue)}
      >
        <Picker.Item label="Select payment method" value="" />
        <Picker.Item label="Credit Card" value="Credit Card" />
        <Picker.Item label="Bank Transfer" value="Bank Transfer" />
      </Picker>
      <Button title="Transfer" onPress={handleTransfer} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
});
