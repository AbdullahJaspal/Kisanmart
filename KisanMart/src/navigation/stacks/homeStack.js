import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DealDetail from '../../screens/buyerSide/dealDetails/dealDetails';
import BuyerHome from '../../screens/buyerSide/home/home';
import ProductDetail from '../../screens/buyerSide/productDetail/productDetail';
import ChatScreen from '../../screens/buyerSide/chatScreen/chatScreen';
import CategoryListing from '../../screens/buyerSide/categoryListing/categoryListing';
import SellerInfo from '../../screens/buyerSide/sellerInfo/sellerInfo';
import MyProfile from '../../screens/buyerSide/myProfile/myProfile';

function HomeStack() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="BuyerHome"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="BuyerHome" component={BuyerHome} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen name="CategoryListing" component={CategoryListing} />
      <Stack.Screen name="SellerInfo" component={SellerInfo} />
      <Stack.Screen name="MyProfile" component={MyProfile} />
    </Stack.Navigator>
  );
}

export default HomeStack;
