import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, Alert, TextInput, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

const Profile = () => {
  const navigation = useNavigation();

  const [username, setUsername] = useState('KHAOULA');
  const [email, setEmail] = useState('khaoula@example.com');
  const [password, setPassword] = useState('******');
  const [phone, setPhone] = useState('123-456-7890');
  const [editingField, setEditingField] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

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
      case 'password':
        setPassword(value);
        break;
      case 'phone':
        setPhone(value);
        break;
      default:
        break;
    }
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
              onBlur={() => setEditingField(null)}
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
              onBlur={() => setEditingField(null)}
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
          <FontAwesome name="lock" size={20} color="#374151" style={styles.icon} />
          {editingField === 'password' ? (
            <TextInput
              style={styles.input}
              value={password}
              secureTextEntry
              onChangeText={(value) => handleInputChange('password', value)}
              onBlur={() => setEditingField(null)}
            />
          ) : (
            <>
              <Text style={styles.text}>{password}</Text>
              <TouchableOpacity onPress={() => handleEdit('password')}>
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
              onBlur={() => setEditingField(null)}
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
});

export default Profile;
