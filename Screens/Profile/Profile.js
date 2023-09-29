import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { userInfo } from "../../Api/userapi";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

const Profile = () => {
  const navigation = useNavigation();
  const [results, setResults] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const userDetails = async () => {
    try {
      const res = await userInfo();
      setResults(res);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    userDetails();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator style={styles.loader} color={"red"} size={"large"} />
      ) : (
        <View>
          <View style={styles.header}>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Image
                style={styles.image}
                source={require("../../assets/profile1.png")}
              />
            </View>
          </View>
          <Text style={styles.borderline1} />
          <View style={styles.details}>
            <Text>First Name:</Text>
            <Text style={styles.name}>{results.firstName}</Text>

            <Text style={styles.borderline} />
            <Text>Last Name:</Text>
            <Text style={styles.name}>{results.lastname}</Text>
            <Text style={styles.borderline} />
            <Text>Email ID:</Text>
            <Text style={styles.name}>{results.email}</Text>
            <Text style={styles.borderline} />
            <Text>Mobile No:</Text>
            <Text style={styles.name}>{results.mobileNo}</Text>
            <Text style={styles.borderline} />
            <Text>Address:</Text>
            <Text style={styles.name}>{results.address}</Text>
          </View>
          <Text style={styles.borderline1} />

          <View style={styles.logoutView}>
            <Pressable
              onPress={() => {
                AsyncStorage.removeItem("token");
                navigation.navigate("Login");
              }}
            >
              <View style={styles.logoutbox}>
                <AntDesign
                  name="logout"
                  size={responsiveFontSize(3)}
                  color="red"
                />
                <Text style={styles.logouttxt}>Logout</Text>
              </View>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: responsiveHeight(5),
    //  backgroundColor: "black",
    paddingHorizontal: responsiveHeight(3),
  },
  header: {
    alignItems: "center",
    marginBottom: responsiveHeight(2),
    marginTop: responsiveHeight(2),
  },
  name: {
    fontSize: responsiveFontSize(2),
    fontWeight: "bold",
    paddingHorizontal: responsiveWidth(1),
    paddingLeft: responsiveWidth(3),
  },

  details: {
    backgroundColor: "grey",
    paddingVertical: responsiveWidth(5),
    paddingLeft: responsiveWidth(5),
    backgroundColor: "white",
    padding: responsiveWidth(2),
    borderRadius: responsiveWidth(2),
    shadowOffset: {
      width: responsiveWidth(1),
      height: responsiveHeight(1),
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  image: {
    width: responsiveWidth(32),
    height: responsiveHeight(15),
    borderRadius: responsiveWidth(15),
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoutbox: {
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#309682",
    padding: responsiveWidth(4),
    borderRadius: responsiveWidth(2),
    shadowOffset: {
      width: responsiveWidth(1),
      height: responsiveHeight(1),
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  logoutView: {
    justifyContent: "center",
    alignItems: "center",
    // marginTop: responsiveHeight(2),
  },
  logouttxt: {
    color: "white",
    alignContent: "flex-start",
    fontSize: responsiveFontSize(2),
    padding: responsiveWidth(2),
  },
  imagebackground: {
    flex: 1,
    justifyContent: "center",
  },
  borderline: {
    height: 1,
    borderColor: "#D0D0D0",
    borderWidth: 1,
    marginBottom: responsiveHeight(1),
    marginTop: responsiveHeight(1),
  },
  borderline1: {
    height: 1,
    borderColor: "#D0D0D0",
    borderWidth: 1,
    marginBottom: responsiveHeight(5),
    marginTop: responsiveHeight(5),
  },
});

export default Profile;
