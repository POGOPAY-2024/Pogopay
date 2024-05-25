import React, { useState } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { OtpInput } from 'react-native-otp-entry';

const CodeScreen = () => {
    const [otp, setOtp] = useState('');
    const navigation = useNavigation();
  
    const handleSignInPress = () => {
        navigation.navigate('Signup');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Enter Verification Code</Text>
            <Text style={styles.subText}>Enter the 6-digit code sent to</Text>
            <Text style={styles.phoneNumber}>+707429663</Text>
            <Image style={styles.image} source={require('../assets/code.png')} />
            <OtpInput
                numberOfDigits={6}
                autoFocus
                onChange={(code) => setOtp(code)}
                otp={otp}
                otpType="number"
                tintColor="#03D3B9"
                offTintColor="#727E96"
                secureTextEntry={false}
                style={styles.otpInput}
            />
            <TouchableOpacity style={styles.button} onPress={handleSignInPress}>
                <Text style={styles.buttonText}>CONTINUE</Text>
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
    subText: {
        fontSize: 14,
        color: '#727E96',
        marginTop: 10,
    },
    phoneNumber: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#011A51',
    },
    image: {
        width: '60%',
        height: 180,
        marginTop: 20,
    },
    otpInput: {
        marginTop: 40,
        width: '80%',
        alignSelf: 'center',
    },
    button: {
        width: '80%',
        height: 52,
        backgroundColor: '#03D3B9',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
        marginTop: 40,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default CodeScreen;
