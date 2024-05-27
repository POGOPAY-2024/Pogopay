import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Alert, Dimensions } from 'react-native';

export default function Password({ route, navigation }) {
  const { qrData } = route.params; // Receive qrData from route params
  const [password, setPassword] = useState('');

  const handlePasswordSubmit = () => {
    if (password === '0000') {
      navigation.navigate('Transfer', { qrData }); // Pass qrData to the next screen
    } else {
      Alert.alert('Incorrect Password', 'Please try again.', [{ text: 'OK' }]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Password</Text>
      <Text style={styles.subtitle}>Please enter your account password to proceed</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your account password"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />
      <TouchableOpacity style={styles.button} onPress={handlePasswordSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
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
    fontSize: width * 0.06,
    fontWeight: 'bold',
    marginBottom: height * 0.02,
  },
  subtitle: {
    fontSize: width * 0.04,
    color: '#666',
    textAlign: 'center',
    marginBottom: height * 0.02,
    paddingHorizontal: 10,
  },
  input: {
    height: height * 0.07,
    width: '100%',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: width * 0.04,
    marginBottom: height * 0.02,
    backgroundColor: '#fff',
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
