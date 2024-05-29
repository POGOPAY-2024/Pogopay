import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Dimensions, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importez AsyncStorage
import { useNavigation } from '@react-navigation/native';
import instance from '../axiosConfig'; // Importez votre instance Axios configurée

const CreditCard = () => {
  const navigation = useNavigation();
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    fetchUserAndData();
  }, []);

  const fetchUserAndData = async () => {
    try {
      const userDataJson = await AsyncStorage.getItem('userData');
      if (userDataJson !== null) {
        const user = JSON.parse(userDataJson);
        await fetchCardData(user.id);
      } else {
        console.log('userData is null');
      }
    } catch (error) {
      console.error('Error fetching user and data:', error.message);
      Alert.alert('Error', 'Failed to fetch data. Please try again.');
    }
  };

  const fetchCardData = async (userId) => {
    try {
      const response = await instance.get(`/get-cards/${userId}`);
      setCardData(response.data.data);
    } catch (error) {
      console.error('Error fetching cards:', error.message);
      Alert.alert('Error', 'Failed to fetch cards. Please try again.');
    } 
  };

  const handleAddCard = () => {
    navigation.navigate('AddCard');
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.cardList}>
        {cardData.map((card) => (
          <TouchableOpacity key={card.id} style={styles.cardItem}>
            <Text style={styles.cardNumber}>{card.card_number}</Text>
            <Text style={styles.cardInfo}>
              Expires: {card.expiry_date}
            </Text>
            <Text style={styles.cardInfo}>
              CVV: {card.cvv}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.addButton} onPress={handleAddCard}>
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
