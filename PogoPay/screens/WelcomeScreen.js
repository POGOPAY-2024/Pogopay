
import { StyleSheet, View, Image, Text,TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';



const WelcomeScreen =()=>{
  const navigation = useNavigation();
  
  const handleSignInPress = () => {
    navigation.navigate('Signup');
  };

    return(
        <View style={styles.container}>
            <Text style={styles.text}>Welcome to Pogopay</Text>
            <Image style={styles.image} source={require('../assets/transfer.png')} />
            <Text style={styles.t1}>Experience the </Text>
            <Text style={styles.t2}>easier way</Text>
            <Text style={styles.t3}>for transaction!</Text>
            <Text style={styles.t4}>Connect your money to your</Text>
            <Text style={styles.t5}>friends and brands.</Text>
            <TouchableOpacity style={styles.button}onPress={handleSignInPress} >
            <Text style={styles.buttonText}>GET STARTED</Text>
           </TouchableOpacity>
        </View>
    );
     
}
const styles = StyleSheet.create({
    container:{
        backgroundColor:'#03D3B9',
        flex: 1,
    },
    text: {
        fontWeight: "bold",
     
        fontSize: 20,
        marginLeft: -12,
        color:"#011A51",
        top:75,
        textAlign:'center',
        
      },
      image: {
        width: '82%',
        height: 270,
        top: 160,
        left:30,
      },
      t1:{
        fontSize: 32,
        top:200,
        left:50,
        fontWeight: "bold",

      },
      t2:{
        fontSize: 32,
        color:'#CC4C4C',
        top:190,
        left:50,
        fontWeight: "bold",

      },
      t3:{
        fontSize: 32,
        top:180,
        left:50,
        fontWeight: "bold",

      },
      t4:{
        top:185,
        left:50,
        color:'#848484',
        fontWeight: "bold",
        fontSize: 17,

      },
      t5:{
        top:190,
        left:50,
        color:'#848484',
        fontWeight: "bold", 
        fontSize: 17,

      },
      button: {
        width: '60%',
        height: 52,
        backgroundColor: '#CC4C4C',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
        top: 268,
        left:82,
      },
      buttonText: {
        color:"white",
        fontSize: 19,
        fontWeight: 'bold',
      },
    
  });
  
  export default WelcomeScreen;