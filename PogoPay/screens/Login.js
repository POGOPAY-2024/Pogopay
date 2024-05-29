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

  const handleLogInPress = () => {
    navigation.navigate('Signup');
};

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
    <View style={styles.container}>
        <Text style={styles.text}>Log In</Text>
        <Image style={styles.image} source={require('../assets/login.jpg')} />

        <View style={styles.inputContainer}>
         
            <TextInput
                style={styles.input}
                placeholder="Email"
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={text => setEmail(text)}
            />
            
            <TextInput
                style={styles.input}
                placeholder="Password"
                autoCapitalize="none"
                secureTextEntry={true}
                onChangeText={text => setPassword(text)}
            />
          
           
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
            <Text style={styles.buttonText}>{loading ? 'LOGING IN...' : 'LOG IN'}</Text>
        </TouchableOpacity>
        <Text style={styles.bottomText}>D'ont have an account? <Text style={styles.loginLink} onPress={handleLogInPress}>Sign up</Text></Text>
    </View>
);
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        flex: 1,
        alignItems: 'center',
        paddingTop: height * 0.1,
        paddingHorizontal: width * 0.05,
    },
    image: {
        width: width * 0.5, // Adjusted width based on screen width
        height: height * 0.2, // Adjusted height based on screen height
        marginBottom: height * 0.03, // Adjusted margin based on screen height
    },
    text: {
        fontWeight: "bold",
        fontSize: width * 0.06,
        color: "#011A51",
        marginBottom: height * 0.02,
    },
    inputContainer: {
        width: '100%',
        marginBottom: height * 0.0,
    },
    input: {
        width: '100%',
        height: height * 0.06,
        borderWidth: 1,
        borderColor: '#042552',
        borderRadius: 10,
        paddingLeft: 20,
        marginBottom: height * 0.02,
    },
    button: {
        width: '100%',
        height: height * 0.07,
        backgroundColor: '#03D3B9',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: height * 0.01,
    },
    buttonText: {
        color: "white",
        fontSize: width * 0.045,
        fontWeight: 'bold',
    },
    bottomText: {
        fontSize: width * 0.04,
        color: '#727E96',
        textAlign: 'center',
        marginTop: height * 0.02,
    },
    loginLink: {
        color: '#03D3B9',
        textDecorationLine: 'underline',
    },
});
export default Login;