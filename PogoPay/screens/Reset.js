import React, { useState } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, TextInput, Dimensions } from 'react-native';

const Reset = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [hidePassword, setHidePassword] = useState(true);

    const togglePasswordVisibility = () => {
        setHidePassword(!hidePassword);
    };

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require('../assets/Security.png')} />
            <Text style={styles.text}>Reset Password</Text>
            <Text style={styles.t1}>Set a new password for your account</Text>
     
            <TextInput
                style={styles.input}
                placeholder="New Password"
                autoCapitalize="none"
                secureTextEntry={hidePassword}
                onChangeText={text => setNewPassword(text)}
            />
                
            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                autoCapitalize="none"
                secureTextEntry={hidePassword}
                onChangeText={text => setConfirmPassword(text)}
            />
            
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Reset</Text>
            </TouchableOpacity>
        </View>
    );

}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        flex: 1,
        alignItems: 'center',
    },
    text: {
        fontWeight: "bold",
        fontSize: 20,
        color: "#011A51",
        marginTop: 55,
    },
    image: {
        width: '60%',
        height: 180,
        marginTop: 80,
    },
    t1: {
        fontSize: 11,
        fontWeight: "bold",
        color: '#727E96',
        marginTop: 20,
    },
    button: {
        width: '60%',
        height: 52,
        backgroundColor: '#03D3B9',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
        marginTop: 90,
    },
    buttonText: {
        color: "white",
        fontSize: 19,
        fontWeight: 'bold',
    },
    input: {
        width: '76%',
        height: height * 0.06,
        borderWidth: 1,
        borderColor: '#042552',
        borderRadius: width * 0.03,
        paddingLeft: width * 0.02,
        marginBottom: height * 0.05,
        backgroundColor: '#EFF2F4',
        top:70
    },
});

export default Reset;
