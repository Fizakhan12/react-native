import { View, Text, Image, ScrollView, Alert } from "react-native";
import styles from "./style";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { TextInput } from "react-native-gesture-handler";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  GestureHandlerRootView,
  NativeViewGestureHandler,
} from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import axios from "axios";
import Feather from "react-native-vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from 'react-native-toast-message';
function LoginPage() {
  const [Password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [PasswordVerify, setPasswordVerify] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();
  function handlePassword(e) {
    const passwordVar = e.nativeEvent.text;
    setPassword(passwordVar);
    setPasswordVerify(false);
    if (
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(
        passwordVar
      )
    ) {
      setPassword(passwordVar);
      setPasswordVerify(true);
    }
  }
  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Successfully Logged In',
      text2: 'Login Successfully',
      visibilityTime:10000
    });
  } 
  const showToastError=(props)=>{
    console.log(props,"props")
    Toast.show({
      type: 'error',
      text1: props.response.data.message,
     text2: 'Password Mismatched',
      visibilityTime:10000
    });
  }

  function handleSubmit() {
    console.log(email, Password);
    const userData = {
      email,
      Password: Password,
    };
    axios
      .post("http://192.168.2.7:8080/login-user", userData)
      .then(async (res) => {
        console.log(res.data);
        if (res.data.message == "Successfully Login") {
            showToast()
            // Alert.alert("Success", "Successfully Logged In");
          console.log(res.data, "Login Token Data");
          await AsyncStorage.setItem("token", res.data.token);
         await  AsyncStorage.setItem("isLoggedIn",JSON.stringify(true))
          navigation.navigate("Home");
        }
      })
      .catch((err) => {
        showToastError(err)
        console.error(err);
      });
  }
  return (
    <GestureHandlerRootView>
      <ScrollView
        ContentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps={true}
      >
        <View>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={require("../../assets/key.png")}
            ></Image>
          </View>
          <View style={styles.loginContainer}>
            <Text style={styles.text_header}>Login !!!</Text>
            <View style={styles.action}>
              <FontAwesome
                name="user-o"
                color="#420475"
                style={styles.smallIcon}
              ></FontAwesome>
              <TextInput
                placeholder="Enter Email"
                style={styles.textInput}
                onChangeText={(text) => {
                  setEmail(text);
                }}
              ></TextInput>
            </View>
            <View style={styles.action}>
              <FontAwesome
                name="lock"
                color="#420475"
                style={styles.smallIcon}
              ></FontAwesome>
              <TextInput
                placeholder="Enter Password"
                style={styles.textInput}
                onChange={(e) => handlePassword(e)}
                secureTextEntry={showPassword}
              ></TextInput>
              <NativeViewGestureHandler>
                <TouchableOpacity
                  onPress={() => {
                    setShowPassword(!showPassword);
                  }}
                >
                  {Password.length < 1 ? null : !showPassword ? (
                    <Feather
                      name="eye-off"
                      style={{ marginRight: 10 }}
                      color={"black"}
                      size={23}
                    ></Feather>
                  ) : (
                    <Feather
                      name="eye"
                      style={{ marginRight: 10 }}
                      color={"red"}
                      size={23}
                    ></Feather>
                  )}
                </TouchableOpacity>
              </NativeViewGestureHandler>

              {Password.length < 1 ? null : PasswordVerify ? (
                <Feather name="check-circle" color="black" size={20} />
              ) : (
                <Feather name="delete" color="red" size={20} />
              )}
            </View>
            {Password.length < 1 ? null : PasswordVerify ? null : (
              <Text style={{ marginLeft: 20, color: "red" }}>
                Uppercase Lowercase and 6 more numbers
              </Text>
            )}
            <View
              style={{
                justifyContent: "center",
                alignItems: "flex-end",
                marginTop: 8,
                marginRight: 120,
              }}
            >
              <Text
                style={{
                  color: "#420475",
                  fontWeight: 700,
                }}
              >
                Forgot Password
              </Text>
            </View>
          </View>

          <View style={styles.button}>
            <NativeViewGestureHandler>
              <TouchableOpacity
                style={styles.inBut}
                onPress={() => {
                  handleSubmit();
                }}
              >
                <View>
                  <Text style={styles.textSign}>Log In</Text>
                </View>
              </TouchableOpacity>
            </NativeViewGestureHandler>
          </View>

          <View style={{ padding: 15 }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
                color: "#919191",
                textAlign: "center",
                marginRight: 100,
              }}
            >
              ----Or Continue As----
            </Text>
          </View>
          <View style={styles.bottomButton}>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <TouchableOpacity style={styles.inBut2}>
                <FontAwesome
                  name="user-circle-o"
                  color="white"
                  style={styles.smallIcon2}
                ></FontAwesome>
                <Text style={styles.bottomText}>Guest</Text>
              </TouchableOpacity>
            </View>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <TouchableOpacity
                style={styles.inBut2}
                onPress={() => {
                  navigation.navigate("Register");
                }}
              >
                <FontAwesome
                  name="user-plus"
                  color="white"
                  style={styles.smallIcon2}
                ></FontAwesome>
                <Text style={styles.bottomText}>Sign-Up</Text>
              </TouchableOpacity>
            </View>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <TouchableOpacity style={styles.inBut2}>
                <FontAwesome
                  name="google"
                  color="white"
                  style={styles.smallIcon2}
                ></FontAwesome>
                <Text style={styles.bottomText}>Google</Text>
              </TouchableOpacity>
            </View>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <TouchableOpacity style={styles.inBut2}>
                <FontAwesome
                  name="facebook-f"
                  color="white"
                  style={styles.smallIcon2}
                ></FontAwesome>
                <Text style={styles.bottomText}>Facebook</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
}
export default LoginPage;
