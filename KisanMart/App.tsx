import React, {useEffect} from 'react';
import i18next from 'i18next';
import {useTranslation} from 'react-i18next';
import ChooseLanguage from './src/screens/auth/language/language';
import Login from './src/screens/auth/login/login';
import MainNav from './src/navigation/mainNav';
import {SafeAreaView} from 'react-native';
import DealDetail from './src/screens/buyerSide/dealDetails/dealDetails';
import SellerInfo from './src/screens/buyerSide/sellerInfo/sellerInfo';
const App = () => {
  useEffect(() => {}, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      <MainNav />
    </SafeAreaView>
  );
};

export default App;
