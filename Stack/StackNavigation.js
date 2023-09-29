import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react';
import {NavigationContainer} from '@react-navigation/native'
import{createNativeStackNavigator} from '@react-navigation/native-stack';
import Splashscreen from '../Splashscreen/Splashscreen';
import Login from '../LoginScreen/Login';
import Register from '../Register/Register';
import ProductDetailsScreen from '../Screens/HomeScreen/ProductDetails/ProductDetailsScreen';
import BottonTabs from '../Bottom/BottomTabs';
import ProductContext from '../Context/ProductContext';
import LocationScreen from '../Screens/HomeScreen/Location/locationScreen';
import ScannerScreen from '../Scanner/ScannerScreen';
import CartScreen from '../Screens/HomeScreen/Cart/CartScreen';
import Profile from '../Screens/Profile/Profile';

const Stack =createNativeStackNavigator();
const StackNavigation = () => {

  const [showSplashscreen,setshowSplashscreen]=useState(true)
  useEffect(()=>{
    setTimeout(()=>{
      setshowSplashscreen(false)
    },3000)
  })
  return (
    <ProductContext>

    <NavigationContainer>
      <Stack.Navigator>
        {showSplashscreen ?
        <Stack.Screen name="Splashscreen" 
        options={{headerShown:false}}
        component={Splashscreen}/>:null
         }

      <Stack.Screen name='Login' 
      options={{
        headerShown:false,
        gestureEnabled:true
      }}
      component={Login}/>

      <Stack.Screen name='HomeScreen' 
      options={{
        gestureEnabled:false,
        gestureDirection:'horizontal',
        headerShown:false}}
      component={BottonTabs} />
      <Stack.Screen name='Register'
        options={{
          title:'Register',
          headerBackTitleVisible:'false',
          headerTitleAlign:'center'
        }}       
        component={Register}/>

      <Stack.Screen 
       name='ProductDetailsScreen' 
       options={{
        title:'Product Details',
        headerBackTitleVisible:'false',
        headerTitleAlign:'center'
       }}
       component={ProductDetailsScreen}/>
       <Stack.Screen name='locationScreen' component={LocationScreen}/>
       <Stack.Screen name='ScannerScreen' 
         options={{
          title:'Scanner',
          headerBackTitleVisible:'false',
          headerTitleAlign:'center'
         }}
         component={ScannerScreen}/>
       <Stack.Screen name='CartScreen'
          options={{
            title:'Cart',
            headerBackTitleVisible:'false',
            headerTitleAlign:'center'
           }}
       component={CartScreen}/>
       <Stack.Screen 
       options={{
        headerShown:false,  
       }}
       name='Profile' component={Profile}/>
       </Stack.Navigator>
    </NavigationContainer>
    </ProductContext>

   
  )
}

export default StackNavigation