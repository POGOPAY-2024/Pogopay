import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';



const HomeScreen = ({navigation}) => {



   const [cards, setCards] = useState([
    { id: '1', card_number: 	
    '9876 0197 5067 3560', expiry_date: '12/25', cvv: '000' },
  ]);

  

  const handleForgotInPress = () => {
    navigation.navigate('CodeQr');
  };

  const handleScanQr = () => {
    navigation.navigate('Scan');
  };



  return (
    <View style={styles.container}>
    
      <ScrollView style={styles.cardList}>
        {cards.map((card) => (
          <View key={card.id} style={styles.cardItem}>
            <View style={styles.cardInfoContainer}>
              <Text style={styles.cardNumber}>{card.card_number}</Text>
              <Text style={styles.cardInfo}>Expires: {card.expiry_date}</Text>
              <Text style={styles.cardInfo}>CVV: {card.cvv}</Text>
            </View>
         
          </View>
        ))}
      </ScrollView>

      {/* Button Container */}
      <View style={styles.buttonContainer}>
        {/* QR Code Button */}
        <TouchableOpacity
          style={[styles.button, styles.primaryButton]}
          onPress={handleForgotInPress}
        >
          <Text style={styles.buttonText}>Generate QR Code</Text>
        </TouchableOpacity>

        {/* Scan QR Code Button */}
        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={handleScanQr}
        >
          <Text style={styles.buttonText}>Scan QR Code</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: width * 0.05, // Responsive padding
    paddingTop: height * 0.05, // Responsive padding top
    backgroundColor:'white'
  },
  cardContainer: {
    width: width * 0.9, // Responsive width
    height: height * 0.20, // Responsive height
    backgroundColor: '#011A51',
    borderRadius: 10,
    padding: width * 0.05, // Responsive padding
    marginBottom: height * 0.025, // Responsive margin bottom
    justifyContent: 'space-between',
  },
  cardList: {
    flex: 1,
  },
  cardItem: {
    backgroundColor: '#011A51',
    borderRadius: 10,
    padding: width * 0.05,
    marginBottom: height * 0.025,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardInfoContainer: {
    flex: 1,
  },
  cardNumber: {
    color: 'white',
    fontSize: width * 0.04,
    marginBottom: height * 0.01,
    fontWeight: 'bold',
  },
  cardInfo: {
    color: 'white',
    fontSize: width * 0.04,
    marginBottom: height * 0.01,
  },
  deleteIcon: {
    padding: width * 0.02,
  },

  cardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardText: {
    color: 'white',
    fontSize: width * 0.04, // Responsive font size
  },
  cardList: {
    flex: 1,
    width: '100%',
  },
  cardListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: height * 0.025, // Responsive margin bottom
  },
  deleteButton: {
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row', // Arrange buttons in a row
    justifyContent: 'space-between', // Distribute space between buttons
    width: '100%',
    marginTop: height * 0.05, // Adjust margin top for better spacing
    top:-330
  },
  button: {
    flex: 1, // Each button takes up equal space
    paddingVertical: height * 0.02, // Responsive padding vertical
    borderRadius: 10,
    marginHorizontal: width * 0.025, // Responsive margin horizontal
    alignItems: 'center', // Center text within buttons
    justifyContent: 'center', // Center text within buttons
  },
  primaryButton: {
    backgroundColor: '#03D3B9',
  },
  secondaryButton: {
    backgroundColor: '#011A51',
  },
  buttonText: {
    fontSize: width * 0.045, // Responsive font size
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
});

export default HomeScreen;