import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SellerHome from '../../screens/sellerSide/home/home';
import ProductDetail from '../../screens/sellerSide/productDetail/productDetail';
import ChatScreen from '../../screens/sellerSide/chatScreen/chatScreen';
import CategoryListing from '../../screens/sellerSide/categoryListing/categoryListing';
import AddProduct from '../../screens/sellerSide/addProduct/addProduct';

function SellerHomeStack() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="SellerHome"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="SellerHome" component={SellerHome} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen name="CategoryListing" component={CategoryListing} />
      <Stack.Screen name="AddProduct" component={AddProduct} />
    </Stack.Navigator>
  );
}

export default SellerHomeStack;
