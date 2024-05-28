import React, { useState } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, TextInput, Dimensions, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PhoneInput from 'react-native-phone-number-input';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Signup = () => {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [rib, setRIB] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [hidePassword, setHidePassword] = useState(true);
    const [phone, setPhone] = useState('');
    const [formattedValue, setFormattedValue] = useState('');

    const togglePasswordVisibility = () => {
        setHidePassword(!hidePassword);
    };

    const handleSignInPress = () => {
        navigation.navigate('Login');
    };

    const handleSignUpPress = async () => {
        try {
            const response = await axios.post(' https://0fc3-196-113-159-192.ngrok-free.app/api/register', {
                name,
                email,
                phone: formattedValue,
                rib,
                password,
                password_confirmation: passwordConfirmation,
            });

            if (response.status === 201) {
                Alert.alert('Success', 'Account created successfully');
                const token = response.data.token;
                await AsyncStorage.setItem('token', token);
                navigation.navigate('Login');
            } else {
                Alert.alert('Error', 'Something went wrong');
            }
        } catch (error) {
            console.error(error);
            if (error.response) {
                const errors = error.response.data.errors;
                if (errors) {
                    const errorMessages = Object.values(errors).flat().join('\n');
                    Alert.alert('Validation Error', errorMessages);
                } else {
                    Alert.alert('Error', `Response error: ${error.response.data.message}`);
                }
            } else if (error.request) {
                Alert.alert('Error', 'Request error: No response received from server');
            } else {
                Alert.alert('Error', `Request setup error: ${error.message}`);
            }
        }
    };

    const isValidEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Sign up</Text>
            <Image style={styles.image} source={require('../assets/sign up.png')} />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    autoCapitalize="words"
                    onChangeText={text => setName(text)}
                    accessibilityLabel="Enter your name"
                />
                <PhoneInput
                    defaultCode='MA'
                    placeholder='Mobile number'
                    value={phone}
                    onChangeText={(text) => setPhone(text)}
                    onChangeFormattedText={(text) => setFormattedValue(text)}
                    containerStyle={styles.phoneInputContainer}
                    textContainerStyle={styles.phoneInputTextContainer}
                    textInputStyle={styles.phoneInputText}
                    codeTextStyle={styles.phoneInputCodeText}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    onChangeText={text => setEmail(text)}
                    onBlur={() => {
                        if (!isValidEmail(email)) {
                            Alert.alert('Invalid Email', 'Please enter a valid email address');
                        }
                    }}
                    accessibilityLabel="Enter your email"
                />
                <TextInput
                    style={styles.input}
                    placeholder="RIB"
                    autoCapitalize="words"
                    onChangeText={text => setRIB(text)}
                />
                <View style={styles.passwordInputContainer}>
                    <TextInput
                        style={[styles.input, styles.passwordInput]}
                        placeholder="Password"
                        autoCapitalize="none"
                        secureTextEntry={hidePassword}
                        onChangeText={text => setPassword(text)}
                    />
                    <TouchableOpacity
                        style={styles.icon}
                        onPress={togglePasswordVisibility}
                    >
                        <Icon
                            name={hidePassword ? 'eye-slash' : 'eye'}
                            size={20}
                            color="#000"
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.passwordInputContainer}>
                    <TextInput
                        style={[styles.input, styles.passwordInput]}
                        placeholder="Confirm Password"
                        autoCapitalize="none"
                        secureTextEntry={hidePassword}
                        onChangeText={text => setPasswordConfirmation(text)}
                    />
                </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleSignUpPress}>
                <Text style={styles.buttonText}>SIGN UP</Text>
            </TouchableOpacity>
            <Text style={styles.bottomText}>Already have an account? <Text style={styles.loginLink} onPress={handleSignInPress}>Log in</Text></Text>
        </View>
    );
}
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        backgroundColor: '#FFFFFF',
        flex: 1,
        alignItems: 'center',
        paddingTop: height * 0.1,
        paddingHorizontal: width * 0.05,
    },
    text: {
        fontWeight: "bold",
        fontSize: width * 0.06,
        color: "#011A51",
        marginBottom: height * 0.02,
    },
    subText: {
        fontSize: width * 0.04,
        color: '#727E96',
        marginBottom: height * 0.02,
        textAlign: 'center',
    },
    image: {
        width: '60%',
        height: height * 0.25,
        marginBottom: height * 0.05,
        resizeMode: 'contain',
        marginTop: height * -0.03,
    },
    inputContainer: {
        width: '100%',
        marginBottom: height * -0.001,
        marginTop: height * -0.05,
    },
    input: {
        width: '100%',
        height: height * 0.06,
        borderWidth: 1,
        borderColor: '#042552',
        borderRadius: 10,
        paddingLeft: 20,
        marginBottom: height * 0.02,
        marginTop: height * -0.004,
    },
    phoneInputContainer: {
        width: '100%',
        height: height * 0.06,
        borderWidth: 1,
        borderColor: '#042552',
        borderRadius: 10,
        marginBottom: height * 0.02,
    },
    phoneInputTextContainer: {
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
    },
    phoneInputText: {
        height: height * 0.06,
        fontSize: width * 0.04,
    },
    phoneInputCodeText: {
        fontSize: width * 0.04,
        marginTop: -3,
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
    passwordInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    passwordInput: {
        paddingRight: 40,
    },
    icon: {
        position: 'absolute',
        right: 19,
        top: '35%',
        transform: [{ translateY: -10 }],
    },
});

export default Signup;