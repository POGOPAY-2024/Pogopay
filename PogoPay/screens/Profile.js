import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, Dimensions, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetchUserId();
  }, []);

  const fetchUserId = async () => {
    try {    
      const userDataJson = await AsyncStorage.getItem('userData');
      if (userDataJson !== null) {
        setUser(JSON.parse(userDataJson));
      } else {
        setError('User data not found');
      }
    } catch (error) {
      console.error('Error fetching user ID:', error.message);
      setError('Failed to fetch user data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#042552" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <View style={styles.info}>
          <TouchableOpacity style={styles.imageContainer}>
            <Image style={styles.image} source={require('../assets/user1.png')} />
          </TouchableOpacity>
          <UserDataItem label="Name" value={user.name} />
          <UserDataItem label="Email" value={user.email} />
          <UserDataItem label="Phone" value={user.phone} />
        </View>
      )}
    </View>
  );
};

const UserDataItem = ({ label, value }) => (
  <View style={styles.userDataItem}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: width * 0.05,
  },
  info: {
    backgroundColor: '#F5F7FA',
    borderRadius: 20,
    padding: width * 0.05,
    width: '90%',
    maxWidth: 400,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: height * 0.03,
  },
  image: {
    width: width * 0.3,
    height: width * 0.3,
    borderRadius: (width * 0.3) / 2,
  },
  userDataItem: {
    marginBottom: height * 0.02,
  },
  label: {
    color: '#374151',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: height * 0.01,
  },
  value: {
    color: '#374151',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default Profile;
