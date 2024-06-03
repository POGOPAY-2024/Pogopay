import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function Confirmation({ route, navigation }) {
  const { qrData, amount, paymentMethod } = route.params;
<<<<<<< HEAD
=======
  const [fee, setFee] = useState(0);
  const [totalAmount, setTotalAmount] = useState(amount);
  const [token, setToken] = useState('');
  const [user, setUser] = useState({});

  useEffect(() => {
    const calculateFee = () => {
      const calculatedFee = amount * 0.05;
      setFee(calculatedFee);
      setTotalAmount(Number(amount) + Number(calculatedFee));
    };
    calculateFee();
  }, [amount]);
>>>>>>> 0d7c3b3 (commit)

  useEffect(() => {
    const fetchUserData = async () => {
      const userDataJson = await AsyncStorage.getItem('userData');
      const tk = await AsyncStorage.getItem('userToken');
      if (userDataJson) {
        const user = JSON.parse(userDataJson);
        setUser(user);
      }
      if (tk) {
        setToken(tk);
      }
    };

    fetchUserData();
  }, []);

  const handleConfirm = async () => {
    try {
      const response = await axios.post(
        'http://192.168.1.131:8001/api/process-payment',
        {
          amountsansfrais: amount,
          amountavecfrais: totalAmount,
          recipient_rib: qrData,
          card_id: paymentMethod,
          user_id: user.id,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.status === 'success') {
        Alert.alert('Success', 'Payment completed successfully.', [
          { text: 'OK', onPress: () => navigation.navigate('Home') },
        ]);
      } else {
        Alert.alert('Error', response.data.message);
      }
    } catch (error) {
      console.error('Error processing payment:', error.message);
      Alert.alert('Error', 'Failed to process payment.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Transfer Confirmation</Text>
<<<<<<< HEAD
<<<<<<< HEAD
        <View style={styles.detail}>
          <Text style={styles.label}>Transferred Data:</Text>
          <Text style={styles.value}>{qrData}</Text>
        </View>
=======
      
>>>>>>> 0d7c3b3 (commit)
=======
>>>>>>> 62138f2 (commit)
        <View style={styles.detail}>
          <Text style={styles.label}>Amount:</Text>
          <Text style={styles.value}>{amount}</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.label}>Payment Method:</Text>
          <Text style={styles.value}>{paymentMethod}</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleConfirm}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  card: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  title: {
    fontSize: width * 0.08,
    fontWeight: 'bold',
    marginBottom: height * 0.02,
    textAlign: 'center',
  },
  detail: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: height * 0.01,
    paddingHorizontal: width * 0.03,
    borderColor: '#ddd',
    borderBottomWidth: 1,
    paddingBottom: height * 0.015,
  },
  label: {
    fontSize: width * 0.045,
    color: '#666',
  },
  value: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#333',
  },
  button: {
    backgroundColor: '#03D3B9',
    paddingVertical: height * 0.02,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: height * 0.03,
  },
  buttonText: {
    color: '#fff',
    fontSize: width * 0.045,
    fontWeight: 'bold',
  },
});

