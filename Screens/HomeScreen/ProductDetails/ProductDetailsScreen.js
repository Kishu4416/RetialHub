import {
  View,
  Text,
  Image,
  ScrollView,
  SafeAreaView,
  Pressable,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import {
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import QRCode from "react-native-qrcode-svg";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../redux/CartReducer";
import { Rating } from "react-native-stock-star-rating";
import * as Sharing from "expo-sharing";
import ViewShot, { captureRef } from "react-native-view-shot";

const ProductDetailsScreen = () => {
  const navigation = useNavigation();
  const [addedToCart, setAddedToCart] = useState(false);
  const route = useRoute();
  let item = route.params?.product?.item;

  //scanned item is present through params
  if (item == undefined) {
    item = route.params.product;
  }

  const dispatch = useDispatch();
  const Viewref = useRef(null);
  const addItemToCart = (item) => {
    setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(() => {
      setAddedToCart(false);
    }, 60000);
  };
  const cart = useSelector((state) => state.cart.cart);

  const handleshare = async () => {
    try {
      if (!Viewref.current) {
        return;
      }
      // Share the captured image
      Viewref.current.capture().then((uri) => {
        Sharing.shareAsync(uri, {
          mimeType: "image/png",
          dialogTitle: "Share QR Code",
        });
      });
    } catch (error) {
      console.error("Error in sharing QR code", error);
    }
  };

  const handlecart = (productId) => {
    navigation.navigate("CartScreen", { product: productId });
  };

  navigation.setOptions({
    headerRight: () => {
      return (
        <TouchableOpacity onPress={handlecart} style={style.carticon}>
          <Text
            style={{
              left: responsiveWidth(4),
              fontSize: responsiveFontSize(1.8),
              color: "black",
              position: "absolute",
              //  top: 0,
              fontWeight: "bold",
            }}
          >
            {cart.length}
          </Text>
          <AntDesign
            style={{ marginTop: responsiveHeight(1) }}
            name="shoppingcart"
            size={responsiveFontSize(4)}
            color="black"
          />
        </TouchableOpacity>
      );
    },
  });

  return (
    <SafeAreaView
      style={{
        paddinTop: Platform.OS === "android" ? responsiveHeight(5) : 0,
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <ScrollView>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: responsiveHeight(1),
          }}
        >
          {/* <View
            style={{
             // width: responsiveWidth(10),
           //   height: responsiveHeight(5),
              left: responsiveWidth(40),
              //borderRadius: responsiveWidth(10),
             // justifyContent: 'space-between',
             // alignItems: "center",
            //  flexDirection: "row",
            }}
          >



            <TouchableOpacity onPress={handlecart} style={style.carticon}>
              <Text
                style={{
                  left: responsiveWidth(4),
                  fontSize: responsiveFontSize(1.8),
                  color: "black",
                  position: "absolute",
                  //  top: 0,
                  fontWeight: "bold",
                }}
              >
                {cart.length}
              </Text>
              <AntDesign
                style={{ marginTop: responsiveHeight(1) }}
                name="shoppingcart"
                size={responsiveFontSize(4)}
                color="black"
              />
            </TouchableOpacity>
          </View> */}

          <Image
            source={{ uri: item.image }}
            style={{
              width: responsiveWidth(50),
              height: responsiveHeight(28),
              resizeMode: "contain",
            }}
          />
          <View
            style={{
              width: responsiveWidth(10),
              height: responsiveHeight(5),
              left: responsiveWidth(40),
              borderRadius: responsiveWidth(10),
              backgroundColor: "#E0E0E0",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <TouchableOpacity onPress={() => handleshare()}>
              <MaterialCommunityIcons
                name="share-variant"
                size={responsiveFontSize(3)}
                color="blue"
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: responsiveFontSize(3),
                fontWeight: "bold",
                color: "#008E97",
              }}
            >
              {item.name}
            </Text>
          </View>
          <View
            style={{
              paddingHorizontal: responsiveWidth(2),
              paddingVertical: responsiveWidth(2),
            }}
          >
            <Text
              style={{ fontSize: responsiveFontSize(2), fontWeight: "500" }}
            >
              {item.description}
            </Text>
            <Text
              style={{
                fontSize: responsiveFontSize(3),
                fontWeight: "600",
                marginTop: responsiveHeight(1),
                color: "green",
              }}
            >
              ₹ {item.price}
            </Text>

            <Text
              style={{
                height: 1,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginBottom: 10,
                marginTop: 10,
              }}
            />

            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <Text
                style={{ fontSize: responsiveFontSize(2), fontWeight: "500" }}
              >
                Brand
              </Text>

              <Text
                style={{ fontSize: responsiveFontSize(2), fontWeight: "500" }}
              >
                {item.brand}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                marginTop: responsiveHeight(3),
                paddingHorizontal: responsiveWidth(3),
              }}
            >
              <Text
                style={{ fontSize: responsiveFontSize(2), fontWeight: "500" }}
              >
                Rating
              </Text>
              <Rating
                stars={item.rating}
                size={responsiveFontSize(2)}
                color={"red"}
              />
            </View>
            <Text
              style={{
                height: 1,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginBottom: responsiveHeight(1),
                marginTop: responsiveHeight(1),
              }}
            />
          </View>
          <ViewShot ref={Viewref} options={{ format: "png", quality: 1 }}>
            <View
              ref={Viewref}
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: responsiveHeight(1),
              }}
            >
              <View style={style.qrcodeouter}>
                <QRCode value={JSON.stringify(item)} size={100} />
              </View>
            </View>
          </ViewShot>
          <View style={{ marginTop: responsiveHeight(3) }}>
            <Pressable
              onPress={() => addItemToCart(item)}
              style={{
                backgroundColor: "#FFC72C",
                padding: responsiveWidth(3),
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
                width: responsiveWidth(40),
              }}
            >
              {addedToCart ? (
                <View>
                  <Text style={{ fontSize: responsiveFontSize(2) }}>
                    Added to Cart
                  </Text>
                </View>
              ) : (
                <Text style={{ fontSize: responsiveFontSize(2) }}>
                  Add to Cart
                </Text>
              )}
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  qrcodeouter: {
    alignItems: "center",
    padding: responsiveWidth(5),
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 3,
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
});

export default ProductDetailsScreen;
