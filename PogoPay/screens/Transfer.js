import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Modal, FlatList, Image, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';

const Transfer = () => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentMethods, setPaymentMethods] = useState([
    { id: '1', name: 'Credit Card' },
    { id: '2', name: 'Debit Card' },
    { id: '3', name: 'PayPal' },
    { id: '4', name: 'Bank Transfer' },
  ]);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleTransfer = () => {
    if (!recipient.trim() || !amount.trim() || !selectedMethod) {
      Alert.alert('Error', 'Please enter recipient, amount, and select a payment method.');
      return;
    }
    // Perform transfer logic here
    Alert.alert('Success', `Transferred $${amount} to ${recipient} successfully using ${selectedMethod.name}.`);
    setRecipient('');
    setAmount('');
    setSelectedMethod(null);
  };

  const handleMethodSelection = (method) => {
    setSelectedMethod(method);
    setModalVisible(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>SEND MONEY</Text>
        <Image
          source={require('../assets/transfer1.png')} // Placeholder profile image
          style={styles.image}
        />
        <TextInput
          style={styles.input}
          placeholder="Recipient"
          value={recipient}
          onChangeText={setRecipient}
        />
        <TextInput
          style={styles.input}
          placeholder="Amount"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.selectButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.selectButtonText}>{selectedMethod ? selectedMethod.name : 'Select Payment Method'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleTransfer}>
          <Text style={styles.buttonText}>SEND MONEY</Text>
        </TouchableOpacity>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={paymentMethods}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.methodItem} onPress={() => handleMethodSelection(item)}>
                  <Text style={styles.methodText}>{item.name}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFF2F4',
  },
  scrollContent: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 100, // Adjust as needed
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 130,
    top:70
  },
  image: {
    width: '60%',
    height: 180,
    marginBottom: 60,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    padding: 14,
    marginBottom: 20,
    width: '100%',
    backgroundColor: '#FFFFFF',
  },
  selectButton: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    padding: 14,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginBottom: 29,
  },
  selectButtonText: {
    fontSize: 16,
    color: '#4B5563',
  },
  button: {
    backgroundColor: '#03D3B9',
    padding: 18,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    maxHeight: '80%',
    width: '80%',
  },
  methodItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#D1D5DB',
  },
  methodText: {
    fontSize: 16,
    color: '#4B5563',
  },
});

export default Transfer;
