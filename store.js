// import { configureStore } from "@reduxjs/toolkit";
// import CartReducer, { loadCartData } from "./redux/CartReducer"; 
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const saveCartToAsyncStorage = (store) => (next) => (action) => {
//   const result = next(action);

//   const cartState = store.getState().cart;

//   AsyncStorage.setItem("cart", JSON.stringify(cartState.cart)).catch(
//     (error) => {
//       console.error("Error saving cart data to AsyncStorage:", error);
//     }
//   );

//   return result;
// };

// const initStore = async () => {
//   try {
//     const cartData = await AsyncStorage.getItem("cart");
//     if (cartData) {
//       store.dispatch(loadCartData(JSON.parse(cartData)));
//     }
//   } catch (error) {
//     console.error("Error loading cart data from AsyncStorage:", error);
//   }
// };

// const store = configureStore({
//   reducer: {
//     cart: CartReducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(saveCartToAsyncStorage),
// });

// initStore();

// export default store;




import { configureStore } from "@reduxjs/toolkit";
import CartReducer, { loadCartData } from "./redux/CartReducer"; 
import AsyncStorage from "@react-native-async-storage/async-storage";

const saveCartToAsyncStorage = (store) => (next) => (action) => {
  const result = next(action);

  const cartState = store.getState().cart;

  AsyncStorage.setItem("cart", JSON.stringify(cartState.cart)).catch(
    (error) => {
      console.error("Error saving cart data to AsyncStorage:", error);
    }
  );

  return result;
};

const initStore = async (store) => {
  try {
    const cartData = await AsyncStorage.getItem("cart");
    if (cartData) {
      store.dispatch(loadCartData(JSON.parse(cartData)));
    }
  } catch (error) {
    console.error("Error loading cart data from AsyncStorage:", error);
  }
};

const store = configureStore({
  reducer: {
    cart: CartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(saveCartToAsyncStorage),
});

initStore(store); 

export default store;
