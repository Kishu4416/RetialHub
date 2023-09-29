import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import * as Animatable from "react-native-animatable";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { senddatatobackendLoginapi } from "../Api/userapi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";

const Login = (props) => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [mailError, setMailError] = useState("");
  const [seepasword, setseepassword] = useState(false);
  const [visible, setvisible] = useState("");

  const loginapi = async () => {
    const data = { email, password };
    if (!email || !password) {
      Alert.alert("all field are require");
    } else {
      // call login api and saved in res
      const res = await senddatatobackendLoginapi(data);

      // user already exit
      if (res.error) {
        setMailError(
          "Invalid Credentials: Please Enter Valid  Details to Sign-In"
        );
      }
      // If token present login
      if (res.token) {
        await AsyncStorage.setItem("token", `${res.token}`);
        await AsyncStorage.setItem("id", `${res.id}`);
        props.navigation.navigate("HomeScreen");
        handleclearbuttononpress();
      }
    }
  };

  useEffect(() => {
    AsyncStorage.getItem("token").then((value) => {
      // If token is already saved direct navigate to home page
      if (value != null) {
        props.navigation.navigate("HomeScreen");
      }
    });
  });

  const handleclearbuttononpress = () => {
    setEmail("");
    setpassword("");
    setMailError("");
  };

  const handleemailandpasswordonclear = () => {
    setEmail("");
    setpassword("");
  };

  const handleregister = () => {
    props.navigation.navigate("Register");
    handleclearbuttononpress();
  };
  const ref_input2 = useRef();

  return (
    <View style={Style.container}>
      <View style={Style.headerbg}>
        <Animatable.Text animation="bounce" style={Style.logintext}>
          Login
        </Animatable.Text>
      </View>

      <Animatable.View animation="fadeInUpBig" style={Style.footerbg}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={Style.emailview}>
            <TextInput
              placeholder="Please enter Email"
              value={email}
              keyboardType={"email-address"}
              onPressIn={() => setMailError(null)}
              returnKeyType="next"
              onSubmitEditing={() => ref_input2.current.focus()}
              onChangeText={(text) => setEmail(text)}
              style={[Style.emailtxt, Style.emailbox]}
            />

            <View style={{ flexDirection: "row" }}>
              <TextInput
                placeholder="Password"
                value={password}
                secureTextEntry={!visible}
                onPressIn={() => setMailError(null)}
                onChangeText={(text) => setpassword(text)}
                style={[Style.emailtxt, Style.passwordbox]}
                ref={ref_input2}
              />
              <TouchableOpacity
                style={Style.eyeposition}
                onPress={() => {
                  setvisible(!visible);
                  setseepassword(!seepasword);
                }}
              >
                <MaterialCommunityIcons
                  name={
                    seepasword === false ? "eye-off-outline" : "eye-outline"
                  }
                  size={20}
                  color={"black"}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={Style.signinbox} onPress={loginapi}>
              <Text style={Style.signtxt}>Sign-In</Text>
            </TouchableOpacity>
            <View style={Style.newaacounttxtview}>
              <Text>Don't Have Account then Register Here</Text>
            </View>
            <TouchableOpacity style={Style.signupbox} onPress={handleregister}>
              <Text style={Style.signtxt}>Register</Text>
            </TouchableOpacity>

            {mailError ? (
              <View style={Style.invalidcrederriconstyle}>
                <View
                  style={{
                    flexDirection: "column",
                    borderRightWidth: 1,
                    flex: 1,
                    justifyContent: "center",
                    borderRightColor: "red",
                    alignItems: "center",
                  }}
                >
                  <MaterialIcons
                    name="warning"
                    size={responsiveFontSize(3)}
                    color={"red"}
                    style={{
                      paddingLeft: responsiveWidth(1),
                      padding: responsiveWidth(1),
                    }}
                  />
                  <Text
                    style={{
                      color: "red",
                      paddingBottom: responsiveWidth(1),
                      paddingLeft: responsiveWidth(2),
                    }}
                  >
                    Warning
                  </Text>
                </View>
                <View style={Style.invalidcrederr}>
                  <Text
                    style={{ color: "red", paddingLeft: responsiveWidth(1) }}
                  >
                    {mailError}
                  </Text>
                </View>
              </View>
            ) : null}
          </View>
        </ScrollView>
      </Animatable.View>
    </View>
  );
};

const Style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#009387",
    paddingHorizontal: responsiveHeight(2.5),
  },
  headerbg: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  footerbg: {
    flex: 4,
    backgroundColor: "white",
    borderTopLeftRadius: responsiveWidth(5),
    borderTopRightRadius: responsiveWidth(5),
    borderBottomLeftRadius: responsiveWidth(5),
    borderBottomRightRadius: responsiveWidth(5),
    marginBottom: responsiveHeight(15),
    marginTop:responsiveHeight(5)
  },
  logintext: {
    fontSize: responsiveFontSize(6),
    color: "white",
    fontWeight: "bold",
    marginTop:responsiveHeight(10)
  },
  emailview: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: responsiveHeight(12),
  },
  emailbox: {
    height: responsiveHeight(5),
    width: responsiveWidth(70),
    padding: responsiveWidth(1),
    flexDirection: "row",
    borderRadius: responsiveWidth(3),
    borderColor: "skyblue",
    borderWidth: responsiveWidth(0.5),
    paddingLeft: responsiveWidth(3),
  },
  emailtxt: {
    fontSize: responsiveFontSize(2),
    // paddingLeft: 10,
  },
  passwordbox: {
    height: responsiveHeight(5),
    width: responsiveWidth(70),
    padding: responsiveWidth(1),
    flexDirection: "row",
    borderRadius: responsiveWidth(3),
    borderColor: "skyblue",
    borderWidth: responsiveWidth(0.5),
    marginTop: responsiveHeight(3),
    marginLeft: responsiveWidth(5),
    paddingLeft: responsiveWidth(3),
  },
  signinbox: {
    height: responsiveHeight(5),
    width: responsiveWidth(50),
    flexDirection: "row",
    borderRadius: responsiveWidth(7),
    borderColor: "black",
    backgroundColor: "#009387",
    justifyContent: "center",
    alignItems: "center",
    marginTop: responsiveHeight(8),
  },
  signtxt: {
    color: "white",
    fontSize: responsiveFontSize(2),
    fontWeight: "bold",
  },
  signupbox: {
    height: responsiveHeight(5),
    width: responsiveWidth(50),
    flexDirection: "row",
    borderRadius: responsiveWidth(7),
    borderColor: "black",
    backgroundColor: "#90a1f0",
    justifyContent: "center",
    alignItems: "center",
    marginTop: responsiveHeight(2),
  },
  newaacounttxtview: {
    marginTop: responsiveHeight(3),
  },
  invalidcrederriconstyle: {
    flex: 1,
    flexDirection: "row",
    marginTop: responsiveHeight(3),
    justifyContent: "center",
    alignItems: "center",
    borderColor: "red",
    borderWidth: responsiveWidth(0.1),
    height: responsiveHeight(10),
    width: responsiveWidth(60),
    borderRadius: responsiveWidth(5),
    marginBottom: responsiveHeight(10),
    backgroundColor: "#ededeb",
  },
  invalidcrederr: {
    color: "red",
    fontSize: responsiveFontSize(1.5),
    height: responsiveScreenHeight(10),
    width: responsiveScreenWidth(40),
    padding: responsiveWidth(1),
    paddingTop: responsiveWidth(5),
  },
  eyeposition: {
    right: responsiveWidth(8),
    top: responsiveWidth(9),
  },
});
export default Login;
