import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Alert, Dimensions, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';

export default function Transfer({ route, navigation }) {
  const { qrData } = route.params;
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cards, setCards] = useState([]);
  
  const [token, setToken] = useState('');
  const [user, setUser] = useState({});

  useEffect(() => {
    fetchUserAndData();
    console.log('transfet',qrData);
  }, []);

  const fetchUserAndData = async () => {
    try {
      const userDataJson = await AsyncStorage.getItem('userData');
      const tk = await AsyncStorage.getItem('userToken');
      setToken(tk);
      if (userDataJson !== null) {
        const user = JSON.parse(userDataJson);
        setUser(user);
        await fetchUserCards(user.id, tk);  // Ensure await is used to wait for fetchUserCards to complete
      } else {
        console.log('userData is null');
      }
    } catch (error) {
      console.error('Error fetching user and data:', error.message);
      Alert.alert('Error', 'Failed to fetch data. Please try again.');
    }
  };

  const fetchUserCards = async (userId, token) => {
    try {
      const response = await axios.get(`http://192.168.1.131:8001/api/getCardsselct/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.status === 200) {
        setCards(response.data.cards);
        console.log('Cards fetched:', response.data.cards);
      } else {
        console.error('Error fetching cards:', response.data);
        Alert.alert('Error', 'Failed to fetch cards.');
      }
    } catch (error) {
      console.error('Error fetching cards:', error.message);
      Alert.alert('Error', 'Failed to fetch cards.');
    }
  };

  const handleTransfer = () => {
    if (amount && paymentMethod) {
      navigation.navigate('Confirm', { qrData, amount, paymentMethod });
    } else {
      Alert.alert('Error', 'Please enter the amount and select a payment method.', [{ text: 'OK' }]);
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
          {cards.map((card, index) => (
            <Picker.Item key={index} label={`Card: ${card.card_number}`} value={card.id} />
          ))}
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