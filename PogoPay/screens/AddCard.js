import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importez AsyncStorage
import instance from '../axiosConfig'; // Importez votre instance Axios configurée

const AddCard = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCVV] = useState('');
  const [user, setUser] = useState({});

  useEffect(() => {
    fetchUserAndData();
  }, []);

  const fetchUserAndData = async () => {
    try {
      const userDataJson = await AsyncStorage.getItem('userData');
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

  const handleAddCard = async () => {
    try {
      if (!cardNumber.trim() || !expirationDate.trim() || !cvv.trim()) {
        Alert.alert('Error', 'Please fill in all fields');
        return;
      }
  
      const response = await instance.post('/add-card', {
        user_id: user.id, // Utilisez user.id au lieu de 'use_id=user.id'
        card_number: cardNumber,
        expiry_date: expirationDate,
        cvv: cvv,
      });
  
      if (response.status === 201) {
        console.log('Card added successfully:', response.data);
        Alert.alert('Success', 'Card added successfully');
        
        setCardNumber('');
        setExpirationDate('');
        setCVV('');
      } else {
        console.error('Error adding card:', response.data);
        Alert.alert('Error', 'Failed to add card');
      }
    } catch (error) {
      console.error('Error adding card:', error);
      Alert.alert('Error', 'Failed to add card');
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Credit Card</Text>

      <TextInput
        style={styles.input}
        placeholder="Card Number"
        value={cardNumber}
        onChangeText={setCardNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Expiration Date"
        value={expirationDate}
        onChangeText={setExpirationDate}
      />
      <TextInput
        style={styles.input}
        placeholder="CVV"
        value={cvv}
        onChangeText={setCVV}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={handleAddCard}>
        <Text style={styles.buttonText}>Add Card</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    padding: 14,
    marginBottom: 20,
    width: '100%',
  },
  button: {
    backgroundColor: '#03D3B9',
    padding: 18,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddCard;
