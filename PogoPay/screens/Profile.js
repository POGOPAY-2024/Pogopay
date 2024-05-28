import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, Alert, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [editingField, setEditingField] = useState(null);
    const [profileImage, setProfileImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(''); 

    useEffect(() => {
        fetchProfileData();
    }, []);

    const fetchProfileData = async () => {
        try {
            const storedToken = await AsyncStorage.getItem('token'); 
            if (!storedToken) {
                throw new Error('No token found');
            }
            setToken(storedToken); 
            const response = await axios.get('https://9ab4-105-191-8-107.ngrok-free.app/api/profile', {
                headers: {
                    Authorization: `Bearer ${storedToken}`, 
                },
            });
            const { name, email, phone } = response.data;
            setUsername(name);
            setEmail(email);
            setPhone(phone);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching profile data:', error);
            if (error.response && error.response.status === 401) {
                Alert.alert('Authorization Error', 'Please log in again.');
                navigation.navigate('Login');
            } else if (error.response && error.response.status === 404) {
                Alert.alert('Profile Not Found', 'Please create a profile.');
                navigation.navigate('CreateProfile');
            } else {
                Alert.alert('Error', 'Failed to fetch profile data');
            }
            setLoading(false);
        }
    };

    const handleEdit = (field) => {
        setEditingField(field);
    };

    const handleInputChange = (field, value) => {
        switch (field) {
            case 'username':
                setUsername(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'phone':
                setPhone(value);
                break;
            default:
                break;
        }
    };

    const handleLogout = async () => {
        try {
            await axios.post('https://9ab4-105-191-8-107.ngrok-free.app/api/logout', {}, {
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
            });
            await AsyncStorage.removeItem('token'); 
            navigation.navigate('Login');
        } catch (error) {
            console.error('Error logging out:', error);
            Alert.alert('Error', 'Failed to log out');
        }
    };

    const selectImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            Alert.alert('Permission to access camera roll is required!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.cancelled) {
            setProfileImage({ uri: result.uri });
        }
    };
    const handleSave = async () => {
      try {
          const storedToken = await AsyncStorage.getItem('token');
          if (!storedToken) {
              throw new Error('No token found');
          }
  
        
  
          const updatedProfile = {
              name: username,
              email,
              phone
          };
  
          const response = await axios.put('https://9ab4-105-191-8-107.ngrok-free.app/api/profile', updatedProfile, {
              headers: {
                  Authorization: `Bearer ${storedToken}`,
              },
          });
  
          console.log('Profile update response:', response.data);
  
          Alert.alert('Success', 'Profile updated successfully');
          setEditingField(null); // Reset the editing field
      } catch (error) {
          console.error('Error updating profile data:', error);
  
          if (error.response) {
              if (error.response.status === 401) {
                  Alert.alert('Authorization Error', 'Please log in again.');
                  navigation.navigate('Login'); 
              } else if (error.response.status === 400) {
                  Alert.alert('Validation Error', 'Please check the entered data.');
              } else {
                  Alert.alert('Error', 'Failed to update profile');
              }
          } else {
              Alert.alert('Network Error', 'Failed to update profile due to network issues.');
          }
      }
  };
  
    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#374151" />
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity onPress={selectImage}>
                <Image style={styles.image} source={profileImage ? profileImage : require('../assets/user1.png')} />
                <FontAwesome name="camera" size={24} color="white" style={styles.cameraIcon} />
            </TouchableOpacity>
            <View style={styles.infoContainer}>
                <View style={styles.info}>
                    <FontAwesome name="user" size={20} color="#374151" style={styles.icon} />
                    {editingField === 'username' ? (
                        <TextInput
                            style={styles.input}
                            value={username}
                            onChangeText={(value) => handleInputChange('username', value)}
                            onBlur={handleSave}
                        />
                    ) : (
                        <>
                            <Text style={styles.text}>{username}</Text>
                            <TouchableOpacity onPress={() => handleEdit('username')}>
                                <FontAwesome name="edit" size={20} color="#374151" style={styles.editIcon} />
                            </TouchableOpacity>
                        </>
                    )}
                </View>
                <View style={styles.info}>
                    <FontAwesome name="envelope" size={20} color="#374151" style={styles.icon} />
                    {editingField === 'email' ? (
                        <TextInput
                            style={styles.input}
                            value={email}
                            onChangeText={(value) => handleInputChange('email', value)}
                            onBlur={handleSave}
                        />
                    ) : (
                        <>
                            <Text style={styles.text}>{email}</Text>
                            <TouchableOpacity onPress={() => handleEdit('email')}>
                                <FontAwesome name="edit" size={20} color="#374151" style={styles.editIcon} />
                            </TouchableOpacity>
                        </>
                    )}
                </View>
                <View style={styles.info}>
                    <FontAwesome name="phone" size={20} color="#374151" style={styles.icon} />
                    {editingField === 'phone' ? (
                        <TextInput
                            style={styles.input}
                            value={phone}
                            keyboardType="phone-pad"
                            onChangeText={(value) => handleInputChange('phone', value)}
                            onBlur={handleSave}
                        />
                    ) : (
                        <>
                            <Text style={styles.text}>{phone}</Text>
                            <TouchableOpacity onPress={() => handleEdit('phone')}>
                                <FontAwesome name="edit" size={20} color="#374151" style={styles.editIcon} />
                            </TouchableOpacity>
                        </>
                    )}
                </View>
                <View style={styles.info}>
                    <TouchableOpacity onPress={handleLogout}>
                        <FontAwesome name="sign-out" size={20} color="#374151" style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleLogout}>
                        <Text style={styles.text}>Log Out</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EFF2F4',
        paddingHorizontal: width * 0.05,
        paddingBottom: height * 0.05,
    },
    image: {
        width: width * 0.3,
        height: width * 0.3,
        borderRadius: (width * 0.3) / 2,
        marginBottom: height * 0.03,
    },
    infoContainer: {
        width: '100%',
    },
    info: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: width * 0.02,
        marginBottom: height * 0.02,
        paddingHorizontal: width * 0.05,
        paddingVertical: height * 0.02,
    },
    icon: {
        marginRight: width * 0.02,
    },
    editIcon: {
        marginLeft: 'auto',
    },
    text: {
        fontSize: 16,
        color: '#374151',
        flex: 1,
    },
    input: {
        flex: 1,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 8,
    },
    cameraIcon: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 8,
        borderRadius: 20,
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EFF2F4',
    },
});

export default Profile;
