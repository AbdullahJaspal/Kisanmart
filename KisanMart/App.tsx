import React, {useEffect} from 'react';
import Onboarding from './src/screens/onBoardingScreens/onBoarding';
import i18next from 'i18next';
import {useTranslation} from 'react-i18next';
import ChooseLanguage from './src/screens/auth/language/language';
import Login from './src/screens/auth/login/login';
import MainNav from './src/navigation/mainNav';
import {SafeAreaView} from 'react-native';
import CreateRequest from './src/screens/createRequest';
import DealDetail from './src/screens/buyerSide/dealDetails/dealDetails';
import Sample from './src/blink';
const App = () => {
  useEffect(() => {}, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      <Sample />
    </SafeAreaView>
  );
};

export default App;
