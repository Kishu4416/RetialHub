import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  BackHandler,
  Alert,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  StatusBar,
  Modal,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Context } from "../../Context/ProductContext";
import { useSelector } from "react-redux";
import Swiper from "react-native-swiper";
import { searchBynameNdes } from "../../Api/Product/Productapi";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [searchtext, setSearchText] = useState("");
  // const { products, loading } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [oldData, setOldData] = useState([]);
  const [initial, setinitial] = useState(0);
  const searchRef = useRef();
  const scrollRef = useRef();

  useEffect(() => {
    fetch("http://192.168.1.96:5000/products")
      .then((resp) => resp.json())
      .then((response) => {
        setData(response);
        setOldData(response);
      });
  }, []);

  // handle search textinput
  const handleSearch = async (text) => {
    if (text === "") {
      // If the search text is empty, reset the data to the original data
      setData(oldData);
    } else {
      try {
        // Fetch search results using searchBynameNdes
        const results = await searchBynameNdes(text);
        setData(results);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    }
  };

  const handlecart = (productId) => {
    navigation.navigate("CartScreen", { product: productId });
  };

  const handleqrscanner = (productId) => {
    navigation.navigate("ScannerScreen", { product: productId });
  };

  const handleproductdetails = (item) => {
    navigation.navigate("ProductDetailsScreen", { product: item });
  };

  const cart = useSelector((state) => state.cart.cart);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (navigation.isFocused()) {
          Alert.alert(
            "Exit App",
            "Are you sure you want to exit?",
            [
              {
                text: "Cancel",
                onPress: () => {},
                style: "cancel",
              },
              {
                text: "Exit",
                onPress: () => {
                  BackHandler.exitApp();
                },
              },
            ],
            { cancelable: false }
          );
          return true;
        }
        return false;
      }
    );

    return () => {
      backHandler.remove();
    };
  }, [navigation]);

  return (
    <SafeAreaView
      style={{
        marginTop: Platform.OS === "android" ? responsiveHeight(1) : 0,
        flex: 1,
        backgroundColor: "#008E97",
      }}
    >
      <View style={style.container}>
        <View style={style.serachbarview}>
          <View style={style.searchContainer}>
            <AntDesign
              style={{ paddingLeft: responsiveWidth(2) }}
              name="search1"
              size={responsiveFontSize(3)}
              color="black"
            />
            <TextInput
              style={style.input}
              placeholder="Search Product Here"
              ref={searchRef}
              value={search}
              onChangeText={(text) => {
                handleSearch(text);
                setSearch(text);
              }}
            />

            {search == "" ? null : (
              <TouchableOpacity
                style={{
                  right: responsiveWidth(2),
                  position: "absolute",
                  top: responsiveHeight(0.7),
                }}
                onPress={() => {
                  searchRef.current.clear();
                  handleSearch("");
                  setSearch("");
                }}
              >
                <MaterialIcons
                  name="cancel"
                  size={responsiveFontSize(3)}
                  color={"black"}
                />
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity
            onPress={handleqrscanner}
            style={{ right: responsiveWidth(1.5) }}
          >
            <MaterialIcons
              name="qr-code-scanner"
              size={responsiveFontSize(3)}
              color={"white"}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={handlecart}>
            <Text
              style={{
                left: responsiveWidth(3),
                fontSize: responsiveFontSize(1.5),
                color: "white",
                position: "absolute",
                top: responsiveHeight(-1.2),
                fontWeight: "bold",
              }}
            >
              {cart.length}
            </Text>

            <AntDesign
              // style={{ marginTop:5}}
              name="shoppingcart"
              size={responsiveFontSize(3)}
              color="white"
            />
          </TouchableOpacity>
        </View>

        <ScrollView>
          <View style={{ marginTop: responsiveHeight(1) }}>
            <Swiper
              style={style.wrapper}
              showsPagination={true} // Enable pagination dots
              autoplay={true} // Enable auto-scroll
            >
              <View style={style.slide}>
                <Image
                  style={style.silder}
                  source={{
                    uri: "http://192.168.1.96:5000/public/uploads/pumamenszeta.jpeg-1693384888428.jpeg",
                  }}
                />
              </View>
              <View style={style.slide}>
                <Image
                  style={style.silder}
                  source={{
                    uri: "http://192.168.1.96:5000/public/uploads/iphone13.jpeg-1693383198501.jpeg",
                  }}
                />
              </View>
              <View style={style.slide}>
                <Image
                  style={style.silder}
                  source={{
                    uri: "http://192.168.1.96:5000/public/uploads/HammerSmith.png-1693387074615.png",
                  }}
                />
              </View>
              <View style={style.slide}>
                <Image
                  style={style.silder}
                  source={{
                    uri: "http://192.168.1.96:5000/public/uploads/Apple--Watch-SE.jpeg-1693389345549.jpeg",
                  }}
                />
              </View>
            </Swiper>
          </View>
          <View style={{ marginBottom: responsiveHeight(2) }}>
            <TouchableOpacity
              onPress={() => {
                setVisible(true);
              }}
            >
              <AntDesign
                style={{ position: "absolute", left: responsiveWidth(88) }}
                name="filter"
                size={responsiveFontSize(3.5)}
                color={"black"}
              />
            </TouchableOpacity>
          </View>

          <View style={{ marginTop: responsiveHeight(1) }}>
            <View style={style.container1}>
              {loading ? (
                <ActivityIndicator
                  style={style.loader}
                  color={"red"}
                  size={"large"}
                />
              ) : (
                <FlatList
                  data={data}
                  ref={scrollRef}
                  // to get products scroll to top when it in bottom
                  initialScrollIndex={initial}
                  renderItem={({ item, index }) => {
                    return (
                      <>
                        <Pressable onPress={() => handleproductdetails(item)}>
                          <View style={style.productouterview}>
                            <Image
                              source={{ uri: item.image }}
                              style={style.productimage}
                            />
                            <View style={style.productinnerview}>
                              <Text style={style.name}>{item.name}</Text>
                              <Text numberOfLines={3} style={style.description}>
                                {item.description}
                              </Text>
                              <Text style={style.price}>₹ {item.price}</Text>
                            </View>
                          </View>
                        </Pressable>
                      </>
                    );
                  }}
                />
              )}

              <Modal
                animationType="slide"
                transparent={true}
                visible={visible}
                onRequestClose={() => {
                  setVisible(!visible);
                }}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View style={style.modalouter}>
                    <TouchableOpacity
                      onPress={() => {
                        let tempList = data.sort((a, b) =>
                          a.name > b.name ? 1 : -1
                        );
                        setData(tempList);
                        scrollRef.current.scrollToIndex({
                          animated: true,
                          index: 0,
                        });
                        setVisible(false);
                      }}
                      style={style.modalinner}
                    >
                      <Text style={style.modaltext}>Sort By Name</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => {
                        setData(data.sort((a, b) => a.price - b.price));
                        scrollRef.current.scrollToIndex({
                          animated: true,
                          index: 0,
                        });
                        setVisible(false);
                      }}
                      style={style.modalinner}
                    >
                      <Text style={style.modaltext}>Low To High Price</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setData(data.sort((a, b) => b.price - a.price));
                        scrollRef.current.scrollToIndex({
                          animated: true,
                          index: 0,
                        });
                        setVisible(false);
                      }}
                      style={style.modalinner}
                    >
                      <Text style={style.modaltext}>High To low Price</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => {
                        setVisible(false);
                      }}
                      style={style.modalinner}
                    >
                      <Text style={style.modaltext}>Close</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>

            {/* <Pressable
              onPress={() => {
                AsyncStorage.removeItem("token");
                navigation.navigate("Login");
              }}
            >
              <Text
                style={{
                     backgroundColor: "red",
                  color: "white",
                  alignContent: "flex-start",
                  fontSize: responsiveScreenFontSize(2),
                }}
              >
                Logout
              </Text>
            </Pressable> */}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "flex-start",
    backgroundColor: "white",
  },

  serachbarview: {
    backgroundColor: "#008E97",
    paddingHorizontal: responsiveWidth(3),
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: responsiveWidth(1),
    // borderRadius: responsiveWidth(3),
  },
  searchbar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: responsiveWidth(2),
    height: responsiveHeight(4),
    flex: 1,
    width: responsiveWidth(70),
    //  marginRight: responsiveWidth(5),
    borderWidth: 1,
  },
  container1: {
    flex: 1,
    padding: responsiveWidth(2),
    paddingHorizontal: responsiveHeight(1),
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#eee",
    borderRadius: responsiveWidth(2),
    padding: responsiveWidth(1.5),
    marginRight: responsiveWidth(4),
  },
  input: {
    flex: 1,
    paddingHorizontal: responsiveHeight(2),
  },
  modalouter: {
    width: responsiveHeight(30),
    height: responsiveHeight(30),
    borderRadius: responsiveWidth(5),
    backgroundColor: "#d8f7d7",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    paddingHorizontal: responsiveHeight(1),
    paddingVertical: responsiveHeight(1),
  },
  modalinner: {
    borderBottomWidth: responsiveWidth(0.1),
    justifyContent: "center",
    padding: responsiveWidth(2),
    alignItems: "center",
    paddingVertical: responsiveHeight(2),
  },
  modaltext: {
    fontSize: responsiveFontSize(2),
    color: "black",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  silder: {
    height: responsiveHeight(20),
    width: responsiveWidth(100),
    resizeMode: "contain",
  },
  wrapper: {
    height: responsiveHeight(20),
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  productouterview: {
    flex: 1,
    // width: responsiveWidth(95),
    marginBottom: responsiveWidth(2),
    borderRadius: responsiveWidth(4),
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
  },
  productimage: {
    width: responsiveWidth(20),
    height: responsiveHeight(10),
    marginLeft: responsiveWidth(3),
    borderRadius: responsiveWidth(2),
    resizeMode: "contain",
  },
  productinnerview: {
    flex: 2,
    //width: responsiveWidth(70),
    marginLeft: responsiveWidth(2),
    paddingHorizontal: responsiveHeight(2),
  },
  name: {
    fontSize: responsiveFontSize(2),
    marginTop: responsiveHeight(3),
    fontWeight: "bold",
  },
  description: {
    fontSize: responsiveFontSize(1.6),
    marginTop: responsiveHeight(1),
  },
  price: {
    fontSize: responsiveFontSize(2),
    //marginTop: responsiveHeight(1),
    color: "green",
    paddingVertical: responsiveWidth(2),
  },
});

export default HomeScreen;
