// screens/LogoutScreen.js

import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Logout = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // Add your logout logic here (e.g., clear tokens, update state, etc.)
    const performLogout = async () => {
      // Clear user data and tokens here
      // For example:
      // await AsyncStorage.clear();

      // Navigate to login or welcome screen after logout
      navigation.replace('Login');
    };

    performLogout();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#03D3B9" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Logout;