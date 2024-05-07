import React, { useEffect, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeComponent from './component/HomeComponent';
import LoginPage from './component/Login&Register/Login';
import RegisterComponent from './component/Login&Register/Register';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigation ,DrawerActions} from "@react-navigation/native";
import DrawerContent from './DrawerContent';
import Icon from 'react-native-vector-icons/Entypo';
import Toast from 'react-native-toast-message';
const Stack = createNativeStackNavigator();

const StackNav = () => {
  const navigation=useNavigation()
  return (
    <Stack.Navigator initialRouteName='Home' screenOptions={{
      statusBarColor: 'purple',
      headerStyle: { backgroundColor: 'purple' },
      headerTintColor: 'white',
      headerShown: false,
      headerLeft: () => {
        return (
          <Icon name="menu"
            size={30}
            color='white'
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}></Icon>
        )
      }
    }}>
      <Stack.Screen name='Home' component={HomeComponent} options={{}}></Stack.Screen>
      <Stack.Screen name="Login" component={LoginNav}></Stack.Screen>
      {/* <Stack.Screen name="SignIn" component={RegisterComponent}></Stack.Screen> */}
      {/* <Stack.Screen name="Profile" component={ProfileComponent}></Stack.Screen> */}
      {/* <Stack.Screen name="User" component={UserComponent}></Stack.Screen>
      <Stack.Screen name="Logout" component={SignOutComponent}></Stack.Screen> */}
    </Stack.Navigator>
  )
}

const DrawerNav = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />} screenOptions={{ headerShown: false }}>
      <Drawer.Screen name='Home' component={StackNav} />
    </Drawer.Navigator>
  )
}

const LoginNav = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Login' component={LoginPage}></Stack.Screen>
      <Stack.Screen name='Register' component={RegisterComponent}></Stack.Screen>
      <Stack.Screen name='Home' component={DrawerNav}></Stack.Screen>
    </Stack.Navigator>
  )
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function getData() {
      const data = await AsyncStorage.getItem("isLoggedIn");
      const isLoggedIn = data === "true";
      setIsLoggedIn(isLoggedIn);
      console.log(isLoggedIn, "App.js");
    }

    getData();
  }, []);

  return (
    <NavigationContainer>
      {isLoggedIn ? <DrawerNav /> : <LoginNav />}
      <Toast />
    </NavigationContainer>
  );
}
