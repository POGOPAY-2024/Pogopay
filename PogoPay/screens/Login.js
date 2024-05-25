// Updated code for Login component
import React, { useState } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [hidePassword, setHidePassword] = useState(true);

    const togglePasswordVisibility = () => {
        setHidePassword(!hidePassword);
    };

    const handleSignInPress = () => {
        navigation.navigate('home');
    };
    const handleSign = () => {
        navigation.navigate('Signup');
    };

    const handleForgotInPress = () => {
        navigation.navigate('Forgot');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Log In</Text>
            <Image style={styles.image} source={require('../assets/login.jpg')} />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    autoCapitalize="words"
                    onChangeText={text => setName(text)}
                    accessibilityLabel="Enter your name"
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
                <TouchableOpacity style={styles.forgotPasswordLinkContainer} onPress={handleForgotInPress}>
                    <Text style={styles.forgotPasswordLink}>Forgot password?</Text>
                </TouchableOpacity>
            </View>
                
        
            <TouchableOpacity style={styles.button} onPress={handleSignInPress}>
                <Text style={styles.buttonText}>Log In</Text>
            </TouchableOpacity  >
         
          <Text style={styles.bottomText}>Don't have an account? 
           <TouchableOpacity  onPress={handleSign}> 
          <Text style={styles.signupLink} >Sign up</Text> 
          </TouchableOpacity> 
          </Text>
          
        </View>
    );
}
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        flex: 1,
        alignItems: 'center',
        padding: width * 0.05,
    },
    text: {
        fontWeight: 'bold',
        fontSize: width * 0.06, // Responsive font size
        color: '#011A51',
        marginTop: height * 0.05,
    },
    subtitle: {
        fontSize: width * 0.035, // Responsive font size
        color: '#727E96',
        marginTop: height * 0.02,
    },
    image: {
        width: '60%',
        height: height * 0.25, // Responsive height
        marginTop: height * 0.05,
        resizeMode: 'contain', // Ensure image aspect ratio is maintained
    },
    inputContainer: {
        width: '100%',
        marginBottom: height * 0.05,
    },
    input: {
        width: '100%',
        height: height * 0.06, // Responsive height
        borderWidth: 1,
        borderColor: '#042552',
        borderRadius: 10,
        paddingLeft: width * 0.05, // Responsive padding
        marginBottom: height * 0.025, // Responsive margin
    },
    togglePassword: {
        textAlign: 'right',
        color: '#03D3B9',
    },
    forgotPasswordLinkContainer: {
        alignSelf: 'flex-end',
    },
    forgotPasswordLink: {
        color: '#FB847C',
        textDecorationLine: 'underline',
        fontSize: width * 0.035, // Responsive font size
        top: '-68%', // Center vertically within the input field

    },
    button: {
        width: '100%',
        height: height * 0.07, // Responsive height
        backgroundColor: '#03D3B9',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: height * 0.025, // Responsive margin
    },
    buttonText: {
        color: 'white',
        fontSize: width * 0.045, // Responsive font size
        fontWeight: 'bold',
    },
    bottomText: {
        marginTop: height * 0.025, // Responsive margin
        fontSize: width * 0.035, // Responsive font size
        color: '#727E96',
    },
    signupLink: {
        color: '#FB847C',
        textDecorationLine: 'underline',

    },
    passwordInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    passwordInput: {
        paddingRight: width * 0.1, // Responsive padding
    },
    icon: {
        position: 'absolute',
        right: width * 0.05, // Responsive positioning
        top: '38%', // Center vertically within the input field
        transform: [{ translateY: -10 }],
    },
});

export default Login;
