import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../MainScreens/HomeScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import ProductScreen from '../MainScreens/ProductScreen';
import UserCartScreen from '../MainScreens/UserCartScreen';
import PaymentScreen from '../MainScreens/PaymentScreen';
import TrackOrderScreen from '../MainScreens/TrackOrderScreen';
import UserProfile from '../MainScreens/UserProfile';
import AccountAndSettings from '../MainScreens/AccountAndSettings';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const HomeStack = () => (
    <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />   
        <Stack.Screen name="ProductScreen" component={ProductScreen} options={{ headerShown: false }} /> 
        <Stack.Screen name="UserCartScreen" component={UserCartScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PaymentScreen" component={PaymentScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
)

const TabNavigator = () => (
    <Tab.Navigator screenOptions={({ route }) => ({
        tabBarStyle: styles.tabBar,
        tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home';
            }
            else if (route.name === 'Profile') {
              iconName = 'person';
            }
            else if (route.name === 'Settings') {
              iconName = 'settings';
            }
            else if (route.name ==='Cart') {
              iconName = 'cart';
            }
            else if (route.name === 'TrackOrders') {
              iconName = 'map';
            }
            return <Ionicons name={iconName} size={size} color={color} />
          },
          tabBarLabelStyle: styles.tabBarLabel
        })}>
      <Tab.Screen name="Home" component={HomeStack} options={{ headerShown: false }} />
      <Tab.Screen name="Cart" component={UserCartScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={UserProfile} options={{ headerShown: false }} />
      <Tab.Screen name="TrackOrders" component={TrackOrderScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Settings" component={AccountAndSettings} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
  
  const AppStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Main" component={TabNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    );
  }

export default AppStack

const styles = StyleSheet.create({
    tabBar: {
        height: 55,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderColor: 'grey'
      },
    tabBarLabel: {
        paddingBottom: 5
      }
})