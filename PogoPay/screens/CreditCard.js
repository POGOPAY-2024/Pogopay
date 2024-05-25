import React from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const CreditCard = () => {
  
  const navigation = useNavigation();

  const handleCodeQr = () => {
    navigation.navigate('AddCard');
};
  // Mock data for credit cards
  const creditCards = [
    {
      id: 1,
      cardNumber: '**** **** **** 1234',
      cardholderName: 'John Doe',
      expirationDate: '12/23',
    },
    {
      id: 2,
      cardNumber: '**** **** **** 5678',
      cardholderName: 'Jane Smith',
      expirationDate: '06/24',
    },
    // Add more credit card objects as needed
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.cardList}>
        {creditCards.map((card) => (
          <TouchableOpacity key={card.id} style={styles.cardItem}>
            <Text style={styles.cardNumber}>{card.cardNumber}</Text>
            <Text style={styles.cardInfo}>
              {card.cardholderName} | Expires: {card.expirationDate}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.addButton}  onPress={handleCodeQr}>
        <Text style={styles.addButtonLabel}>Add New Card</Text>
      </TouchableOpacity>
    </View>
  );
};

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingVertical: height * 0.05,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#011A51',
    marginBottom: 20,
    textAlign: 'center',
  },
  cardList: {
    flex: 1,
    marginBottom: 20,
  },
  cardItem: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
  },
  cardNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardInfo: {
    fontSize: 16,
    color: '#6E6E6E',
  },
  addButton: {
    backgroundColor: '#03D3B9',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  addButtonLabel: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CreditCard;
