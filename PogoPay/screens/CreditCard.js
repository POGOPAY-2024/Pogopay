import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Dimensions, Alert, RefreshControl, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';

const CreditCard = () => {
  const navigation = useNavigation();
  const [cardData, setCardData] = useState([]);
  const [token, setToken] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    fetchToken();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchUserAndData();
    }, [])
  );

  const fetchToken = async () => {
    try {
      const tk = await AsyncStorage.getItem('userToken');
      setToken(tk);
    } catch (error) {
      console.error('Error fetching token:', error.message);
      Alert.alert('Error', 'Failed to fetch token. Please try again.');
    }
  };

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
      const response = await axios.get(`http://192.168.1.133:8000/api/get-cards/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.status === 200) {
        setCardData(response.data);
      } else {
        console.error('Error fetching card data:', response.data);
        Alert.alert('Error', 'Failed to fetch card data');
      }
    } catch (error) {
      console.error('Error fetching card data:', error.message);
      Alert.alert('Error', 'Failed to fetch card data');
    }
  };

  const handleAddCard = () => {
    navigation.navigate('AddCard');
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchUserAndData().finally(() => setRefreshing(false));
  };

  const maskCardNumber = (cardNumber) => {
    if (!cardNumber) return '';
    const lastThree = cardNumber.slice(-3);
    return `**** **** **** ${lastThree}`;
  };

  const confirmDelete = (card) => {
    setSelectedCard(card);
    setModalVisible(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://192.168.1.133:8000/api/delete-card/${selectedCard.id}`, {
        headers: { Authorization: `Bearer ${token} `}
      });
      setCardData(cardData.filter(card => card.id !== selectedCard.id));
      setModalVisible(false);
    } catch (error) {
      console.error('Error deleting card:', error.message);
      Alert.alert('Error', 'Failed to delete card');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.cardList}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {cardData.map((card) => (
          <View key={card.id} style={styles.cardItem}>
            <View style={styles.cardInfoContainer}>
              <Text style={styles.cardNumber}>{maskCardNumber(card.card_number)}</Text>
              <TouchableOpacity onPress={() => confirmDelete(card)}>
                <Icon name="trash" size={24} color="#D9534F" />
              </TouchableOpacity>
            </View>
            <Text style={styles.cardInfo}>Expires: {card.expiry_date}</Text>
            <Text style={styles.cardInfo}>CVV: {card.cvv}</Text>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.addButton} onPress={handleAddCard}>
        <Text style={styles.addButtonLabel}>Add New Card</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Are you sure you want to delete this card?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={handleDelete}>
                <Text style={styles.modalButtonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  cardInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    backgroundColor: '#03D3B9',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '45%',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default CreditCard;