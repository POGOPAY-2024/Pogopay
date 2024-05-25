import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const CreditCard = ({ cardNumber, cardHolder, expirationDate, balance }) => {
  return (
      <View style={styles.cardContainer}>
          <View style={styles.infoRow}>
              {/* <Icon name="money" size={24} color="white" /> */}
              <Text style={styles.balanceText}>credit card: default</Text>
              {/* <Text style={styles.defaultText}>Your Balance</Text> */}
          </View>
          {/* <Text style={styles.cardText}>**** **** **** {cardNumber.slice(-4)}</Text> */}
          {/* <Text style={styles.cardText}>{cardHolder}</Text> */}
          {/* <Text style={styles.defaultText}>Valid Thru: {expirationDate}</Text> */}
      </View>
  );
};

const HomeScreen = () => {
    const navigation = useNavigation();
    const activeCard = {
        cardNumber: '1234567812345678',
        cardHolder: 'John Doe',
        expirationDate: '12/24'
    };

    return (
        <View style={styles.container}>
            {/* Active Credit Card */}
            <CreditCard
                cardNumber={activeCard.cardNumber}
                cardHolder={activeCard.cardHolder}
                expirationDate={activeCard.expirationDate}
            />

            {/* Logo */}
            <Image
                source={require('../assets/pogo.png')}
                style={styles.logo}
                resizeMode="contain"
            />

            {/* Button Container */}
            <View style={styles.buttonContainer}>

                {/* QR Code Button */}
                <TouchableOpacity
                    style={[styles.button, styles.primaryButton]}
                    onPress={() => {
                        navigation.navigate('CODE QR'); // Navigate to QRScreen
                    }}
                >
                    <Text style={styles.buttonText}>QR Code</Text>
                </TouchableOpacity>

                {/* Scan QR Code Button */}
                <TouchableOpacity
                    style={[styles.button, styles.secondaryButton]}
                    onPress={() => {
                        // Handle button press for scanning QR code
                    }}
                >
                    <Text style={styles.buttonText}>Scan QR Code</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 40, // Add padding top to avoid overlap with status bar
    },
    cardContainer: {
        width: '100%',
        backgroundColor: '#011A51',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        alignItems: 'center',
        height: '10%',
        top: -210
    },
    cardText: {
        color: 'white',
        fontSize: 16,
        marginBottom: 5,
    },
    logo: {
        width: 180,
        height: 200,
        marginBottom: -10,
        marginTop: -70,
        top: -100

    },
    buttonContainer: {
        flexDirection: 'row', // Arrange buttons in a row
        justifyContent: 'space-between', // Distribute space between buttons
        width: '100%',
        marginTop: 30,
        height:'9%'
          },
    button: {
        flex: 1, // Each button takes up equal space
        paddingVertical: 15,
        borderRadius: 10,
        marginHorizontal: 5, // Space between buttons
    },
    primaryButton: {
        backgroundColor: '#03D3B9',
    },
    secondaryButton: {
        backgroundColor: '#011A51',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
        top:6


    },
    balanceText:{
      color:'white',
      fontSize:16
    }
});

export default HomeScreen;
