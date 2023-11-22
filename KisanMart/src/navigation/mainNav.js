import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from '../screens/splash';
import Onboarding from '../screens/onBoardingScreens/onBoarding';
import ChooseLanguage from '../screens/auth/language/language';
import Login from '../screens/auth/login/login';
import i18next from './../i18n/i18n';
import MyDrawer from './Drawers/myDrawer';
import CategoryListing from '../screens/buyerSide/categoryListing/categoryListing';
import Signup from '../screens/auth/signup/signup';
import MyDeals from '../screens/buyerSide/myDeals/myDeals';
import ForgetPassword from '../screens/auth/forgetPassword/forgetPassword';
import DealDetail from '../screens/buyerSide/dealDetails/dealDetails';
import FarmerDrawer from './FarmerDrawer/farmDrawer';

function MainNav() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="OnBoarding" component={Onboarding} />
        <Stack.Screen name="ChooseLanguage" component={ChooseLanguage} />
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="MyDrawer" component={MyDrawer} />
        <Stack.Screen name="FarmerDrawer" component={FarmerDrawer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainNav;
