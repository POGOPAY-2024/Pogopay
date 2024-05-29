import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ActivityIndicator, Image, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import instance from "../axiosConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailFocused, setEmailFocused] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEmailFocus = () => {
    setEmailFocused(true);
  };

  const handleEmailBlur = () => {
    if (!email.trim()) {
      setEmailFocused(false);
    }
  };

  const handleLogin = async () => {
    try {
      if (!email.trim() || !password.trim()) {
        Alert.alert('Error', 'Please enter both email and password');
        return;
      }
  
      setLoading(true);
  
      const response = await instance.post('/login', { email, password });
  
      if (response.data && response.data.token) {
        await AsyncStorage.setItem('userToken', JSON.stringify(response.data.token));
        await AsyncStorage.setItem('userData', JSON.stringify(response.data.user));
  
        setEmail('');
        setPassword('');
  
        navigation.navigate('home');
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Login failed:', error.message);
      Alert.alert('Error', 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -height * 0.1} // Adjust this value as needed
    >
      <View style={[styles.inputContainer, emailFocused && styles.emailInputFocused]}>
        <Text style={styles.connexion}>Connexion</Text>
        <Text style={styles.text}>C'est notre grand plaisir de vous avoir ici</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          onFocus={handleEmailFocus}
          placeholderTextColor="#042552"
          onBlur={handleEmailBlur}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#042552" 
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={styles.buttonText}>Sign in</Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  text: {
    fontSize: width * 0.03,
    color:"#042552",
    marginBottom: height * 0.02,
  },
  inputContainer: {
    width: width * 0.9,
    paddingTop: height * 0.05,
    paddingRight: width * 0.06,
    paddingBottom: height * 0.06,
    paddingLeft: width * 0.06,
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: height * 0.02,
    borderWidth: 1,
    borderColor: '#042552',
    borderRadius: width * 0.1,
  },
  input: {
    width: '100%',
    height: height * 0.06,
    borderWidth: 1,
    borderColor: '#042552',
    borderRadius: width * 0.03,
    paddingLeft: width * 0.05,
    backgroundColor:'white',
    marginBottom: height * 0.02,
  },
  connexion: {
    fontWeight:'bold',
    fontSize: width * 0.06,
    color:"#042552",
    marginBottom: height * 0.01,
  },
  button: {
    width: '100%',
    height: height * 0.06,
    backgroundColor: '#042552',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: width * 0.03,
  },
  buttonText: {
    color:"white",
    fontSize: width * 0.05,
    fontWeight:'bold',
  }
});

export default Login;