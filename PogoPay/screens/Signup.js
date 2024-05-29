import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Dimensions, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import instance from "../axiosConfig"; // Importing Axios instance

const Signup = () => {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [rib, setRib] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignInPress = () => {
        navigation.navigate('Login');
    };

    const handleSignUpPress = async () => {
        try {
            if (!name.trim() || !phone.trim() || !email.trim() || !password.trim() || !passwordConfirmation.trim() || !rib.trim()) {
                Alert.alert('Error', 'Please fill in all fields');
                return;
            }

            if (password !== passwordConfirmation) {
                Alert.alert('Error', 'Passwords do not match');
                return;
            }

            setLoading(true);

            const response = await instance.post('/register', {
                name,
                phone,
                email,
                password,
                password_confirmation: passwordConfirmation,
                rib,
            });

            if (response.status === 201) {
                Alert.alert('Success', 'Account created successfully');
                navigation.navigate('Login');
            } else {
                Alert.alert('Error', 'Something went wrong');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Sign up</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    autoCapitalize="words"
                    onChangeText={text => setName(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Phone Number"
                    keyboardType="phone-pad"
                    onChangeText={text => setPhone(text)}
                />
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
                <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    autoCapitalize="none"
                    secureTextEntry={true}
                    onChangeText={text => setPasswordConfirmation(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="RIB"
                    autoCapitalize="words"
                    onChangeText={text => setRib(text)}
                />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleSignUpPress} disabled={loading}>
                <Text style={styles.buttonText}>{loading ? 'Signing Up...' : 'SIGN UP'}</Text>
            </TouchableOpacity>
            <Text style={styles.bottomText}>Already have an account? <Text style={styles.loginLink} onPress={handleSignInPress}>Log in</Text></Text>
        </View>
    );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
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
    inputContainer: {
        width: '100%',
        marginBottom: height * 0.02,
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
export default Signup;