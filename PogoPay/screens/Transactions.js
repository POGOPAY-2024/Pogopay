import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';

const TransactionsHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [token, setToken] = useState('');

  useEffect(() => {
    fetchToken();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchUserAndData();
    }, [token])
  );

  const fetchToken = async () => {
    try {
      const tk = await AsyncStorage.getItem('userToken');
      setToken(tk);
    } catch (error) {
      console.error('Error fetching token:', error.message);
      Alert.alert('Error', 'Failed to fetch token. Please try again.');
    }
  };

  const fetchUserAndData = async () => {
    try {
      const userDataJson = await AsyncStorage.getItem('userData');
      if (userDataJson !== null) {
        const user = JSON.parse(userDataJson);
        await fetchTransactionData(user.id);
      } else {
        console.log('userData is null');
      }
    } catch (error) {
      console.error('Error fetching user and data:', error.message);
      Alert.alert('Error', 'Failed to fetch data. Please try again.');
    }
  };

  const fetchTransactionData = async (userId) => {
    try {
      const response = await axios.get(`http://192.168.1.131:8001/api/transaction-history/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.status === 200) {
        setTransactions(response.data);
      } else {
        console.error('Error fetching transaction data:', response.data);
        Alert.alert('Error', 'Failed to fetch transaction data');
      }
    } catch (error) {
      console.error('Error fetching transaction data:', error.message);
      Alert.alert('Error', 'Failed to fetch transaction data');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={transactions}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <FontAwesome name="exchange" size={Dimensions.get('window').width * 0.05} color="#FB847C" style={styles.icon} />
            <View style={styles.transactionDetails}>
              <Text style={styles.transactionDate}>{new Date(item.created_at).toLocaleString()}</Text>
            </View>
            <Text style={styles.transactionAmount}>{`${item.amountsansfrais} dh`}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Dimensions.get('window').width * 0.05,
    backgroundColor: '#EFF2F4',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    elevation: 3,
    padding: Dimensions.get('window').width * 0.04,
    marginBottom: Dimensions.get('window').width * 0.04,
  },
  icon: {
    marginRight: Dimensions.get('window').width * 0.03,
  },
  transactionDetails: {
    flex: 1,
    marginRight: Dimensions.get('window').width * 0.03,
  },
  transactionDate: {
    fontSize: Dimensions.get('window').width * 0.035,
    color: '#757575',
  },
  transactionAmount: {
    fontSize: Dimensions.get('window').width * 0.04,
    fontWeight: 'bold',
    color: '#03D3B9',
  },
});

export default TransactionsHistory;
