import { View, Text, Image, ScrollView, Alert } from "react-native";
import styles from "./style";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { TextInput } from "react-native-gesture-handler";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import Feather from "react-native-vector-icons/Feather";
import axios from "axios";
import {
  GestureHandlerRootView,
  NativeViewGestureHandler,
} from "react-native-gesture-handler";
import Toast from 'react-native-toast-message';
function RegisterComponent() {
  // const navigation=useNavigation();
  const [name, setName] = useState("");
  const [nameVerify, setNameVerify] = useState(false);
  const [email, setEmail] = useState("");
  const [emailVerify, setEmailVerify] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneVerify, setPhoneVerify] = useState(false);
  const [Password, setPassword] = useState("");
  const [PasswordVerify, setPasswordVerify] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  //SignUp Related Code
  const navigation = useNavigation();
  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Successfully registered!',
      visibilityTime:10000
      // text2: 'Successfully Logged In'
      
    });
  }
  const showToastError = (props) => {
    Toast.show({
      type: 'error',
      text1: props.res.data,
      // text2: 'Successfully Logged In'
      visibilityTime:10000
      
    });
  }
  function registerSubmit() {
    if (nameVerify && emailVerify && PasswordVerify && phoneVerify) {
      console.log("called");
      const userData = {
        name: name,
        phone: phone,
        email: email,
        Password: Password,
      };

      axios
        .post("http://192.168.2.7:8080/register", userData)
        .then((res) => {
          console.log(res.data);
          if (res.data.message == "Successfully Registered") {
            // Alert.alert("Registered Successfully");
            showToast();
            navigation.navigate("Login");
          } else {
            showToastError(res.data)
            Alert.alert(JSON.stringify(res.data));
          }
        })
        .catch((error) => {
          console.error(error); // Log the error
        });
    } else {
      Alert.alert("Fill Mandotory Field");
    }
  }

  function handleName(e) {
    const nameVar = e.nativeEvent.text;
    console.log(nameVar.length, "NameVar");
    setName(nameVar);
    setNameVerify(false);
    if (nameVar.length > 1) {
      setNameVerify(true);
    }
  }

  function handleEmail(e) {
    const emailVar = e.nativeEvent.text;
    setEmail(emailVar);
    setEmailVerify(false);
    if (/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(emailVar)) {
      setEmail(emailVar);
      setEmailVerify(true);
    }
  }
  function handlePhone(e) {
    const phoneVar = e.nativeEvent.text;
    setPhone(phoneVar);
    setPhoneVerify(false);
    if (/[6-9]{1}[0-9]{9}/.test(phoneVar)) {
      setPhone(phoneVar);
      setPhoneVerify(true);
    }
  }
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
  return (
    <GestureHandlerRootView>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps={true}
      >
        <View>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={require("../../assets/SignUp.jpg")}
            ></Image>
          </View>
          <View style={styles.loginContainer}>
            <Text style={styles.text_header}>Register !!!</Text>
            <View style={styles.action}>
              <FontAwesome
                name="user-o"
                color="#420475"
                style={styles.smallIcon}
              ></FontAwesome>
              <TextInput
                placeholder="Enter First Name"
                style={styles.textInput}
                onChange={(e) => handleName(e)}
              ></TextInput>
              {name.length < 1 ? null : nameVerify ? (
                <Feather name="check-circle" color="green" size={20} />
              ) : (
                <Feather name="delete" color="red" size={20} />
              )}
            </View>
            {name.length < 1 ? null : nameVerify ? null : (
              <Text style={{ marginLeft: 20, color: "red" }}>
                Name Should be more than 1 character
              </Text>
            )}
            <View style={styles.action}>
              <FontAwesome
                name="envelope-o"
                color="#420475"
                style={styles.smallIcon}
              ></FontAwesome>
              <TextInput
                placeholder="Enter Email"
                style={styles.textInput}
                onChange={(e) => handleEmail(e)}
              ></TextInput>
              {email.length < 1 ? null : emailVerify ? (
                <Feather name="check-circle" color="green" size={20} />
              ) : (
                <Feather name="delete" color="red" size={20} />
              )}
            </View>
            {email.length < 1 ? null : emailVerify ? null : (
              <Text style={{ marginLeft: 20, color: "red" }}>
                Email Should be more than 1 character
              </Text>
            )}
            <View style={styles.action}>
              <FontAwesome
                name="phone"
                color="#420475"
                style={styles.smallIcon}
              ></FontAwesome>
              <TextInput
                placeholder="Enter Your Phone Number"
                style={styles.textInput}
                onChange={(e) => handlePhone(e)}
                maxLength={10}
              ></TextInput>
              {phone.length < 1 ? null : phoneVerify ? (
                <Feather name="check-circle" color="green" size={20} />
              ) : (
                <Feather name="delete" color="red" size={20} />
              )}
            </View>
            {phone.length < 1 ? null : phoneVerify ? null : (
              <Text style={{ marginLeft: 20, color: "red" }}>
                Please Enter Your Valid Phone Number
              </Text>
            )}
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
            ></View>
          </View>
          <View style={styles.button}>
            <NativeViewGestureHandler>
              <TouchableOpacity
                style={styles.inBut}
                onPress={() => {
                  registerSubmit();
                }}
              >
                <View>
                  <Text style={styles.textSign}>Register</Text>
                </View>
              </TouchableOpacity>
            </NativeViewGestureHandler>
            
          </View>
          <View> 
            <Text></Text>
          </View>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
}
export default RegisterComponent;
