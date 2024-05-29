import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dimensions } from 'react-native';

const Profile = () => {
  const [user, setUser] = useState({});
  
  useEffect(() => {
    fetchUserId();
  }, []);

  const fetchUserId = async () => {
    try {    
      const userDataJson = await AsyncStorage.getItem('userData');
      if (userDataJson !== null) {
        setUser(JSON.parse(userDataJson));
      } else {
        console.log('userData is null');
      }
    } catch (error) {
      console.error('Error fetching user ID:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Text style={styles.personal}>Personal information</Text>
        <View style={styles.horizontalLine} />
        <View style={styles.userInfo}>
          <View style={styles.userInfoItem}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{user.name}</Text>
          </View>
          <View style={styles.userInfoItem}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{user.email}</Text>
          </View>
          <View style={styles.userInfoItem}>
            <Text style={styles.label}>Phone:</Text>
            <Text style={styles.value}>{user.rib}</Text>
          </View>
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
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    padding: width * 0.05, 
  },
  info: {
    backgroundColor: 'rgba(4, 37, 82, 0.2)',
    borderRadius: width * 0.1,
    width: '90%',
    height: '65%',
  },
  personal: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: width * 0.04, 
    marginTop: height * 0.02, 
    color:"#042552",
  },
  horizontalLine: {
    borderBottomWidth: 1, 
    borderBottomColor: 'white', 
    width: '80%', 
    marginLeft:35,
    marginTop:10
  },
  userInfo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.02,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.3)',
    width: '100%',
  },
  label: {
    color: '#fff',
    fontSize: width * 0.035,
  },
  value: {
    color: '#fff',
    fontSize: width * 0.035,
    fontWeight: 'bold',
  },
});

export default Profile;
