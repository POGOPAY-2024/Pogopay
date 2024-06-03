import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Alert, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function Password({ route, navigation }) {
  const { qrData } = route.params;
  const [password, setPassword] = useState('');
  const [user, setUser] = useState({});
  const [token, setToken] = useState('');
  useEffect(() => {
    fetchUserAndData();

  }, []);

  const fetchUserAndData = async () => {
    try {
      const userDataJson = await AsyncStorage.getItem('userData');
      const tk = await AsyncStorage.getItem('userToken');
      setToken(tk);
      if (userDataJson !== null) {
        const user = JSON.parse(userDataJson);
        setUser(user);
      } else {
        console.log('userData is null');
      }
    } catch (error) {
      console.error('Error fetching user and data:', error.message);
      Alert.alert('Error', 'Failed to fetch data. Please try again.');
    }
  };

  const handlePasswordSubmit = async () => {
    try {
      const response = await axios.post(
        `http://192.168.1.131:8001/api/passwordverif/${user.id}`,
        { password },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        navigation.navigate('Transfer', { qrData });
      } else {
        console.error('Error:', response.data);
        Alert.alert('Error', 'Failed to verify password.');
      }
    } catch (error) {
      console.error('Error:', error.message);
      Alert.alert('Error', 'Failed to verify password.');
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
