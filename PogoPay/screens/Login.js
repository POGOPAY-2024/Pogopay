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
            <Text style={styles.subtitle}>Set a name for your profile, here's the password</Text>
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
    },
    image: {
        width: '60%',
        height: 180,
        marginTop: 40,
    },
    inputContainer: {
        width: '100%',
        marginBottom: 30,
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#042552',
        borderRadius: 10,
        paddingLeft: 20,
        marginBottom: 40,
        top:36
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
        fontSize: 14,
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#03D3B9',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    bottomText: {
        marginTop: 20,
        fontSize: 14,
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
        paddingRight: 40, 
    },
    icon: {
        position: 'absolute',
        right: 19,
        top: '68%',
        transform: [{ translateY: -10 }],
    },
});

export default Login;
