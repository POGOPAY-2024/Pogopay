import React from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const TransactionsHistory = () => {
  // Dummy data for illustration
  const transactions = [
    { id: '1', type: 'Purchase', date: 'May 1, 2024', amount: '$25.00' },
    { id: '2', type: 'Deposit', date: 'April 28, 2024', amount: '$50.00' },
    { id: '3', type: 'Withdrawal', date: 'April 25, 2024', amount: '$30.00' },
    { id: '4', type: 'Purchase', date: 'April 20, 2024', amount: '$15.00' },
    { id: '5', type: 'Deposit', date: 'April 18, 2024', amount: '$100.00' },
    { id: '6', type: 'Purchase', date: 'May 1, 2024', amount: '$25.00' },
    { id: '7', type: 'Deposit', date: 'April 28, 2024', amount: '$50.00' },
    { id: '8', type: 'Withdrawal', date: 'April 25, 2024', amount: '$30.00' },
    { id: '9', type: 'Purchase', date: 'April 20, 2024', amount: '$15.00' },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={transactions}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <FontAwesome name="exchange" size={Dimensions.get('window').width * 0.05} color="#FB847C" style={styles.icon} />
            <View style={styles.transactionDetails}>
              <Text style={styles.transactionType}>{item.type}</Text>
              <Text style={styles.transactionDate}>{item.date}</Text>
            </View>
            <Text style={styles.transactionAmount}>{item.amount}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
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
  transactionType: {
    fontSize: Dimensions.get('window').width * 0.04,
    fontWeight: 'bold',
    marginBottom: Dimensions.get('window').width * 0.012,
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
