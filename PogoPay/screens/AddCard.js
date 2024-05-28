import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const AddCard = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCVV] = useState('');

  const handleAddCard = () => {
    fetch('https://9ab4-105-191-8-107.ngrok-free.app/api/add-card', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        card_number: cardNumber,
        expiry_date: expirationDate,
        cvv: cvv,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to add card');
        }
        return response.json();
      })
      .then(data => {
        console.log('Card added successfully:', data);
        // Vous pouvez ajouter ici des actions supplémentaires après l'ajout réussi de la carte
      })
      .catch(error => {
        console.error('Error adding card:', error);
        // Gérez les erreurs ici
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Credit Card</Text>
      <Image style={styles.image} source={require('../assets/credit-card.png')} />

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
    top: -40,
  },
  image: {
    width: '70%',
    height: 180,
    marginBottom: 60,
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
