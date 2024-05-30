import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider } from './src/Context/AuthContext';
import AppNav from './src/Navigation/AppNav';

const Stack = createStackNavigator();

export default function Page() {
  return (
    <NavigationContainer independent = {true}>
      <AuthProvider>
        <Stack.Navigator initialRouteName="AppNav" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="AppNav" component={AppNav} />
        </Stack.Navigator>
      </AuthProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'fff',
    // alignItems: "center",
    // justifyContent: "center"
  },
});
