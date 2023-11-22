import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MyDeals from '../../screens/buyerSide/myDeals/myDeals';
import DealDetail from '../../screens/buyerSide/dealDetails/dealDetails';

function MyDealStack() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="MyDeals"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="MyDeals" component={MyDeals} />
      <Stack.Screen name="DealDetail" component={DealDetail} />
    </Stack.Navigator>
  );
}

export default MyDealStack;
