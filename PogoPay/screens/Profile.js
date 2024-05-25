import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, Alert,editingField } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';


const Profile = () => {
  const navigation = useNavigation();

  
  const [username, setUsername] = useState('KHAOULA');

   

  const handleEdit = (field) => {
    console.log(`Editing ${field}`);
  };
  const handleAbout = (field) => {
    navigation.navigate('About Us');
  };
  const handleLogout = () => {
    navigation.navigate('Login');
  
  };

  const selectImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
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

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={selectImage}>
      <Image style={styles.image} source={require('../assets/user1.png')} />
        <FontAwesome name="camera" size={24} color="white" style={styles.cameraIcon} />

      </TouchableOpacity>
      <Text style={styles.username}>khaoula</Text>
      <View style={styles.infoContainer}>
        <View style={styles.info}>
          <FontAwesome name="user" size={20} color="#374151" style={styles.icon} />
          {editingField === 'Name' ? (
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={handleInputChange}
              onBlur={() => setEditingField('')}
            />
          ) : (
            <>
              <Text>{username}</Text>
              <TouchableOpacity onPress={() => handleEdit('Name')}>
            <FontAwesome name="edit" size={20} color="#374151" style={styles.editIcon4} />
          </TouchableOpacity>
            </>
          )}
          
        </View>
        <View style={styles.info}>
          <FontAwesome name="envelope" size={20} color="#374151" style={styles.icon} />
          <Text style={styles.text}>Email</Text>
          <TouchableOpacity onPress={() => handleEdit('Email')}>
            <FontAwesome name="edit" size={20} color="#374151" style={styles.editIcon1} />
          </TouchableOpacity>
        </View>
        <View style={styles.info}>
          <FontAwesome name="lock" size={20} color="#374151" style={styles.icon} />
          <Text style={styles.text}>Password</Text>
          <TouchableOpacity onPress={() => handleEdit('Password')}>
            <FontAwesome name="edit" size={20} color="#374151" style={styles.editIcon2} />
          </TouchableOpacity>
        </View>
        <View style={styles.info}>
          <FontAwesome name="phone" size={20} color="#374151" style={styles.icon} />
          <Text style={styles.text}>Phone number</Text>
          <TouchableOpacity onPress={() => handleEdit('Phone')}>
            <FontAwesome name="edit" size={20} color="#374151" style={styles.editIcon3} />
          </TouchableOpacity>
        </View>
        <View style={styles.info}>
          <FontAwesome name="map-marker" size={20} color="#374151" style={styles.icon} />
          <Text style={styles.text}>Adresse</Text>
          <TouchableOpacity onPress={() => handleEdit('Phone')}>
            <FontAwesome name="edit" size={20} color="#374151" style={styles.editIcon5} />
          </TouchableOpacity>
        </View>
        <View style={styles.info}>
          <TouchableOpacity onPress={handleAbout}>
            <FontAwesome name="info" size={20} color="#374151" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleAbout}>
            <Text style={styles.text}>About Us</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.info}>
          <TouchableOpacity onPress={handleLogout }>
            <FontAwesome name="sign-out" size={20} color="#374151" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout }>
            <Text style={styles.text}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFF2F4',
    padding: width * 0.05,
  },
  image: {
    width: width * 0.3,
    height: width * 0.3,
    borderRadius: (width * 0.3) / 2,
    marginBottom: height * 0.03,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: height * 0.02,
    color: '#042552',
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
  editIcon1: {
    marginLeft: '83%', 
  },
  editIcon2: {
    marginLeft: '78%',
  },
  editIcon3: {
    marginLeft: '70%', 
  },
  editIcon4: {
    marginLeft: '80%', 
  },
  editIcon5: {
    marginLeft: '81%', 
  },
  text: {
    fontSize: 16,
    color: '#374151',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 8,
    borderRadius: 20,
  },
});

export default Profile;
