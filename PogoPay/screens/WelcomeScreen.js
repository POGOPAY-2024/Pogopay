import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const WelcomeScreen = () => {
  const navigation = useNavigation();

  const handleSignInPress = () => {
    navigation.navigate('Signup');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Pogopay</Text>
      <Image style={styles.image} source={require('../assets/transfer.png')} />
      <Text style={styles.t1}>Experience the </Text>
      <Text style={styles.t2}>easier way</Text>
      <Text style={styles.t3}>for transaction!</Text>
      <Text style={styles.t4}>Connect your money to your</Text>
      <Text style={styles.t5}>friends and brands.</Text>
      <TouchableOpacity style={styles.button} onPress={handleSignInPress}>
        <Text style={styles.buttonText}>GET STARTED</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#03D3B9',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '10%',
  },
  text: {
    fontWeight: 'bold',
    fontSize: width * 0.05,
    color: '#011A51',
    marginTop: height * 0.01,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: height * 0.3,
    resizeMode: 'contain',
    marginTop: height * 0.05,
  },
  t1: {
    fontSize: width * 0.08,
    fontWeight: 'bold',
    marginTop: height * 0.05,
    textAlign: 'center',
  },
  t2: {
    fontSize: width * 0.08,
    color: '#CC4C4C',
    fontWeight: 'bold',
    textAlign: 'center',
    right: height * 0.045

    
  },
  t3: {
    fontSize: width * 0.08,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  t4: {
    fontSize: width * 0.045,
    color: '#848484',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: height * 0.02,
  },
  t5: {
    fontSize: width * 0.045,
    color: '#848484',
    fontWeight: 'bold',
    textAlign: 'center',
    right: height * 0.045
  },
  button: {
    width: '80%',
    height: height * 0.07,
    backgroundColor: '#CC4C4C',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    marginTop: height * 0.05,
  },
  buttonText: {
    color: 'white',
    fontSize: width * 0.05,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
