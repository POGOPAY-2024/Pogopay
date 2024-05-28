import 'react-native-gesture-handler';
import * as React from 'react';
import { useEffect } from 'react';
import NavigationService from './NavigationService';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { Feather } from '@expo/vector-icons';

// Import screens
import HomeScreen from './screens/HomeScreen';
import AboutUs from './screens/AboutUs';
import Transactions from './screens/Transactions';
import CreditCard from './screens/CreditCard';
import Profile from './screens/Profile';
import SplashScreen from './screens/SplashScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import Registration from './screens/Registration';
import CodeScreen from './screens/CodeScreen';
import Signup from './screens/Signup';
import Login from './screens/Login';
import Forgot from './screens/Forgot';
import CodeQr from './screens/CodeQr';
import Reset from './screens/Reset';
import Transfer from './screens/Transfer';
import Logout from './screens/Logout';
import AddCard from './screens/AddCard';
import Scan from './screens/Scan';
import Confirmation from './screens/Confirmation';
//import PasswordSecurity from './screens/Passwordsecurity';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

// Define a custom component to render drawer icons
      //<Stack.Screen name="Security" component={PasswordSecurity} options={{ headerShown: false }} />

const DrawerIcon = ({ name, color }) => {
  return <Feather name={name} size={24} color={color} />;
};

// Stack for screens without drawer
function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={Registration} options={{ headerShown: false }} />
      <Stack.Screen name="Code" component={CodeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Forgot" component={Forgot} options={{ headerShown: false }} />
      <Stack.Screen name="home" component={MainStack} options={{ headerShown: false }} />
      <Stack.Screen name="AddCard" component={AddCard} options={{ headerShown: false }} />
      <Stack.Screen name="CodeQr" component={CodeQr} options={{ headerShown: true }} />
      <Stack.Screen name="Transfer" component={Transfer} options={{ headerShown: false }} />
      <Stack.Screen name="Confirm" component={Confirmation} options={{ headerShown: false }} />
      <Stack.Screen name="Scan" component={Scan} options={{ headerShown: false }} />







    </Stack.Navigator>
  );
}

// Main stack with drawer
function MainStack() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        drawerActiveTintColor: '#03D3B9', // Active icon color
        drawerInactiveTintColor: '#757575', // Inactive icon color
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerIcon: ({ color }) => <DrawerIcon name="home" color={color} />,
          headerShown: true,
        }}
      />
      <Drawer.Screen
        name="My Payment Methods"
        component={CreditCard}
        options={{
          drawerIcon: ({ color }) => <DrawerIcon name="credit-card" color={color} />,
          headerShown: true,
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          drawerIcon: ({ color }) => <DrawerIcon name="user" color={color} />,
          headerShown: true,
        }}
      />
      <Drawer.Screen
        name="Transactions"
        component={Transactions}
        options={{
          drawerIcon: ({ color }) => <DrawerIcon name="list" color={color} />,
          headerShown: true,
        }}
      />
      <Drawer.Screen
        name="About Us"
        component={AboutUs}
        options={{
          drawerIcon: ({ color }) => <DrawerIcon name="info" color={color} />,
          headerShown: true,
        }}
      />
      <Drawer.Screen
        name="Log Out"
        component={Logout}
        options={{
          drawerIcon: ({ color }) => <DrawerIcon name="log-out" color={color} />,
          headerShown: true,
        }}
      />
    </Drawer.Navigator>
  );
}

// Root stack to combine both auth and main stacks
function RootStack() {
  return (
    <Stack.Navigator initialRouteName="Auth">
      <Stack.Screen name="Auth" component={AuthStack} options={{ headerShown: false }} />
      <Stack.Screen name="Main" component={MainStack} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

function App() {
  useEffect(() => {
    const timer = setTimeout(() => {
      NavigationService.navigate('Welcome');
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <NavigationContainer ref={NavigationService.setTopLevelNavigator}>
      <RootStack />
    </NavigationContainer>
  );
}

export default App;


