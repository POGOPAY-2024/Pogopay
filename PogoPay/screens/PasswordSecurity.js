/*import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, TextInput } from 'react-native';

export default function PasswordSecurity({ route, navigation }) {
  const { qrData } = route.params;
  const [password, setPassword] = useState('aaaa');

  const handlePasswordSubmit = () => {
    // Check the password here
    if (password === 'aaaa') {
    //   // Password is correct, you can now proceed with money transfer
    //   alert(`Successfully transferred money for QR data: ${qrData}`);
    //   // Navigate back to the scan screen
      navigation.navigate('Transfer');
    // } else {
    //   alert('Incorrect password. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Please enter your account password to proceed</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your account password"
        secureTextEntry
        onChangeText={(text) => setPassword(text)} // Update the password state
        defaultValue={password} // Set the initial value for the input
      />
      <Button title="Submit" onPress={handlePasswordSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    paddingLeft: 10,
  },
});
*/