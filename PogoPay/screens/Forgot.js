import React, { useState } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, TextInput, Dimensions } from 'react-native';
// import { isValidEmail } from '../utils/validation'; // Assuming you have a validation utility function
import { useNavigation } from '@react-navigation/native';


const Forgot = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [isValidEmailInput, setIsValidEmailInput] = useState(true);

    const handleNextPress = () => {
        navigation.navigate('Reset');
    };

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require('../assets/Forgot.png')} />
            <Text style={styles.text}>Forgot Password</Text>
            <Text style={styles.subtitle}>Enter the email associated with your account to reset your password.</Text>

            <TextInput
                style={[styles.input, !isValidEmailInput && styles.invalidInput]}
                placeholder="Email"
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={text => setEmail(text)}
                onBlur={() => setIsValidEmailInput(isValidEmail(email))}
                accessibilityLabel="Enter your email"
            />

            {!isValidEmailInput && <Text style={styles.errorText}>Please enter a valid email address.</Text>}

            <TouchableOpacity style={styles.button} onPress={handleNextPress}>
                <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
        </View>
    );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 24,
        color: '#011A51',
        marginTop: 40,
    },
    subtitle: {
        fontSize: 14,
        color: '#727E96',
        marginTop: 20,
        textAlign: 'center',
    },
    image: {
        width: '60%',
        height: 180,
        marginTop: 40,
    },
    input: {
        width: '90%',
        height: 50,
        borderWidth: 1,
        borderColor: '#042552',
        borderRadius: 10,
        paddingLeft: 20,
        marginTop: 30,
    },
    invalidInput: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginTop: 5,
        alignSelf: 'flex-start',
        marginLeft: width * 0.05,
    },
    button: {
        width: '90%',
        height: 52,
        backgroundColor: '#03D3B9',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
        marginTop: 30,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Forgot;
