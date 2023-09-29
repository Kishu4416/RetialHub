import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  incementQuantity,
  removeFromCart,
  decrementQuantity,
} from "../../../redux/CartReducer";
import { useNavigation } from "@react-navigation/native";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
const CartScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    ?.map((item) => item.price * item.quantity)
    .reduce((curr, prev) => curr + prev, 0);
  const dispatch = useDispatch();
  const increaseQuantity = (item) => {
    dispatch(incementQuantity(item));
  };
  const decreaseQuantity = (item) => {
    dispatch(decrementQuantity(item));
  };
  const deleteItem = (item) => {
    dispatch(removeFromCart(item));
  };
  const navigation = useNavigation();

  const handleproductdetails = (item) => {
    navigation.navigate("ProductDetailsScreen", { product: item });
  };
  return (
    <ScrollView style={style.container}>
      <View style={style.totalView}>
        <Text style={style.subtotaltxt}>Subtotal : </Text>
        <Text style={style.totaltxt}>₹ {total}</Text>
      </View>

      <Pressable style={style.presentcountView}>
        <Text>Present ({cart.length}) Items in Card</Text>
      </Pressable>

      <Text style={style.borderline} />

      <View style={{ marginHorizontal: responsiveHeight(1) }}>
        {cart?.map((item, index) => (
          <View style={style.cartmainView} key={index}>
            <Pressable
              onPress={() => handleproductdetails(item)}
              style={{
               // marginVertical: responsiveHeight(1),
                flexDirection: "row",
              }}
            >
              <View>
                <Image
                  style={style.productimage}
                  source={{ uri: item?.image }}
                />
              </View>

              <View style={style.innerView}>
                <Text style={style.pricetxt}>₹ {item?.price}</Text>

                <Text style={style.nametxt}>{item.name}</Text>
                <View>
                  <Text numberOfLines={3} style={style.descriptiontxt}>
                    {item.description}{" "}
                  </Text>
                </View>
              </View>
            </Pressable>

            <Pressable style={style.iconinner}>
              <View style={style.iconinnerView}>
                {item?.quantity > 0 ? (
                  <Pressable
                    onPress={() => decreaseQuantity(item)}
                    style={style.icon}
                  >
                    <AntDesign
                      name="minus"
                      size={responsiveFontSize(3)}
                      color="black"
                    />
                  </Pressable>
                ) : (
                  <Pressable
                    onPress={() => deleteItem(item)}
                    style={style.icon}
                  >
                    <AntDesign
                      name="delete"
                      size={responsiveFontSize(3)}
                      color="black"
                    />
                  </Pressable>
                )}

                <Pressable
                  style={{
                    backgroundColor: "white",
                    paddingHorizontal: responsiveHeight(2),
                    // paddingVertical: 6,
                  }}
                >
                  <Text>{item?.quantity}</Text>
                </Pressable>

                <Pressable
                  onPress={() => increaseQuantity(item)}
                  style={style.icon}
                >
                  <Feather
                    name="plus"
                    size={responsiveFontSize(3)}
                    color="black"
                  />
                </Pressable>
              </View>
              <Pressable
                onPress={() => deleteItem(item)}
                style={style.deleteicon}
              >
                <Text>Delete</Text>
              </Pressable>
            </Pressable>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default CartScreen;

const style = StyleSheet.create({
  container: {
    //   marginTop: responsiveHeight(5),
    flex: 1,
    backgroundColor: "white",
  },
  totalView: {
    paddingHorizontal: responsiveHeight(1),
    // padding: responsiveHeight(3),
    flexDirection: "row",
    alignItems: "center",
  },
  subtotaltxt: {
    fontSize: responsiveFontSize(2),
    fontWeight: "400",
  },
  totaltxt: {
    fontSize: responsiveFontSize(3),
    fontWeight: "bold",
  },
  presentcountView: {
    backgroundColor: "#FFC72C",
    padding: responsiveWidth(3),
    borderRadius: responsiveWidth(2),
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: responsiveHeight(2),
    marginTop: responsiveHeight(2),
  },
  borderline: {
    height: responsiveHeight(0.1),
    borderColor: "#D0D0D0",
    borderWidth: responsiveWidth(0.3),
    marginTop: responsiveHeight(3),
  },
  cartmainView: {
    backgroundColor: "white",
    marginVertical: responsiveHeight(1),
    borderBottomColor: "#F0F0F0",
    borderWidth: responsiveWidth(1),
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
    paddingHorizontal:responsiveHeight(1),
    paddingVertical:responsiveHeight(1),
  },
  productimage: {
    width: responsiveWidth(30),
    height: responsiveHeight(15),
    resizeMode: "contain",
  },
  innerView: {
    marginLeft: responsiveWidth(13),
    marginHorizontal: responsiveHeight(1),
  },
  pricetxt: {
    fontSize: responsiveFontSize(3),
    fontWeight: "bold",
    marginTop: responsiveHeight(2),
  },
  nametxt: {
    color: "green",
    paddingTop: responsiveHeight(1),
    fontWeight: "bold",
    fontSize: responsiveFontSize(2),
  },
  descriptiontxt: {
    fontWeight: "500",
    marginTop: responsiveHeight(2),
    width: responsiveWidth(50),
    fontSize: responsiveFontSize(1.5),
  },
  iconinner: {
    marginTop: responsiveHeight(3),
    marginBottom: responsiveHeight(1),
    flexDirection: "row",
    alignItems: "center",
    gap: responsiveWidth(2),
  },
  iconinnerView: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: responsiveWidth(2),
    paddingVertical: responsiveWidth(1),
    //  borderRadius: responsiveWidth(6),
  },
  icon: {
    backgroundColor: "#D8D8D8",
    padding: responsiveWidth(1.5),
    borderTopLeftRadius: responsiveHeight(1),
    borderBottomLeftRadius: responsiveHeight(1),
  },
  deleteicon: {
    backgroundColor: "white",
    padding: responsiveWidth(2),
    borderRadius: responsiveWidth(3),
    borderColor: "lightgrey",
    borderWidth: responsiveWidth(0.4),
  },
});
