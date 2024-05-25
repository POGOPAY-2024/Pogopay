import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text,Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const CreditCard = ({ cardNumber, cardHolder, expirationDate, balance }) => {
  return (
      <View style={styles.cardContainer}>
          <View style={styles.infoRow}>
              {/* <Icon name="money" size={24} color="white" /> */}
              <Text style={styles.balanceText}>credit card: default</Text>
          </View>
       
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
    const handleForgotInPress = () => {
        navigation.navigate('CodeQr');
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
            {/* <Image
                source={require('../assets/pogo.png')}
                style={styles.logo}
                resizeMode="contain"
            /> */}

            {/* Button Container */}
            <View style={styles.buttonContainer}>

                {/* QR Code Button */}
                <TouchableOpacity
                    style={[styles.button, styles.primaryButton]}
                    onPress={handleForgotInPress}
                    
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

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: width * 0.05, // Responsive padding
        paddingTop: height * 0.05, // Responsive padding top
    },
    cardContainer: {
        width: '100%',
        backgroundColor: '#011A51',
        borderRadius: 10,
        padding: width * 0.05, // Responsive padding
        marginBottom: height * 0.025, // Responsive margin bottom
        alignItems: 'center',
        height: height * 0.1, // Responsive height
        top: -height * 0.33, // Responsive top positioning
    },
    cardText: {
        color: 'white',
        fontSize: width * 0.04, // Responsive font size
        marginBottom: height * 0.005, // Responsive margin bottom
    },
    logo: {
        width: width * 0.45, // Responsive width
        height: height * 0.25, // Responsive height
        marginBottom: -height * 0.0125, // Responsive margin bottom
        marginTop: -height * 0.0875, // Responsive margin top
        top: -height * 0.125, // Responsive top positioning
    },
    buttonContainer: {
        flexDirection: 'row', // Arrange buttons in a row
        justifyContent: 'space-between', // Distribute space between buttons
        width: '100%',
        top: -height * 0.125, // Responsive top positioning
        height: height * 0.09, // Responsive height
    },
    button: {
        flex: 1, // Each button takes up equal space
        paddingVertical: height * 0.01875, // Responsive padding vertical
        borderRadius: 10,
        marginHorizontal: width * 0.0125, // Responsive margin horizontal
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
        top: height * 0.0075, // Responsive top positioning
    },
    balanceText: {
        color: 'white',
        fontSize: width * 0.04, // Responsive font size
    },
});

export default HomeScreen;
