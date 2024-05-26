import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

export default function Confirmation({ route, navigation }) {
  const { qrData, amount, paymentMethod } = route.params;

  const handleConfirm = () => {
    // Logic to confirm transfer
    // Navigate back to home screen
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text>Transfer Details:</Text>
      <Text>Transferred Data: {qrData}</Text>
      <Text>Amount: {amount}</Text>
      <Text>Payment Method: {paymentMethod}</Text>
      <Button title="Confirm" onPress={handleConfirm} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
