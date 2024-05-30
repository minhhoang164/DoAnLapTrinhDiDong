import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import LoginScreen from './src/LoginSignupScreen/LoginScreen';
import SignupScreen from './src/LoginSignupScreen/SignupScreen';
import SignupNextScreen from './src/LoginSignupScreen/SignupNextScreen';
import AppNav from './src/Navigation/AppNav';
import { AuthProvider } from './src/Context/AuthContext';


export default function Page() {
  return (
    <View style={styles.container}>
        <AuthProvider>
          <AppNav />
        </AuthProvider>
    </View>
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
