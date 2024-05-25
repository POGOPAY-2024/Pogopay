import React, { useState } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PhoneInput from "react-native-phone-number-input";

const Registration = () => {
    const navigation = useNavigation();
    const [phoneNumber, setPhoneNumber] = useState('+212707543213');

    const handleSignInPress = () => {
        navigation.navigate('Code');
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Registration</Text>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={require('../assets/register.png')} />
            </View>
            <View style={styles.formContainer}>
                <Text style={styles.subtitle}>Enter your mobile phone number</Text>
                <Text style={styles.subtitle}>We will send you OTP to verify later</Text>
                <PhoneInput
                    defaultCode='MA'
                    placeholder='Enter your mobile number'
                    value={phoneNumber}
                    onChangeText={(text) => setPhoneNumber(text)}
                    autoFocus
                />
                <TouchableOpacity style={styles.button} onPress={handleSignInPress}>
                    <Text style={styles.buttonText}>SEND VIA SMS</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.termsText}>By creating and/or using an account, you agree to our Terms & Conditions.</Text>
        </SafeAreaView>
    );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontWeight: "bold",
        fontSize: 24,
        color: "#011A51",
        marginBottom: 20,
        textAlign: 'center',
    },
    imageContainer: {
        marginBottom: 20,
    },
    image: {
        width: '80%',
        height: 180,
        resizeMode: 'contain',
        left:35
    },
    formContainer: {
        width: '100%',
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 16,
        color: '#727E96',
        marginBottom: 10,
        textAlign: 'center',
    },
    button: {
        width: '100%',
        height: 52,
        backgroundColor: '#03D3B9',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
        marginTop: 20,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: 'bold',
    },
    termsText: {
        fontSize: 12,
        color: '#727E96',
        textAlign: 'center',
    },
});

export default Registration;
