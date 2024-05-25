import React, { useEffect } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';

const SplashScreen = () => {
   
  

  return (
    <View style={styles.container}>
        <Image style={styles.image} source={require('../assets/pogo.png')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1721',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width : '49%',
    height :'5%',
  }
});

export default SplashScreen;