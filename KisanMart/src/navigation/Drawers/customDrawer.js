import {DrawerContentScrollView} from '@react-navigation/drawer';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  Animated,
  StyleSheet,
} from 'react-native';
import {Colors, FontFamily} from '../../theme/theme';
import {CustomStyles} from '../../theme/theme';
import {getFontSize} from '../../utils/utils';
import {useTranslation} from 'react-i18next';
import {useRef, useState} from 'react';
import Button from '../../components/Button';

function CustomDrawerContent(props) {
  const {t, i18n} = useTranslation();
  const languageValue = useRef(new Animated.Value(0));
  const accountValue = useRef(new Animated.Value(0));

  const [account, setAccount] = useState('buyer');

  const DrawerItemList = ({icon, title, screen}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate(screen);
        }}
        style={{
          flexDirection: i18n.language === 'en' ? 'row' : 'row-reverse',
          ...styles.drawerTab,
        }}>
        <Image
          style={{width: 19, height: 19, resizeMode: 'contain'}}
          source={icon}
        />
        <Text
          style={{
            color: Colors.secondary,
            fontSize: getFontSize(13),
            fontFamily: FontFamily.title,
            marginLeft: i18n.language === 'en' ? 15 : 0,
            marginRight: i18n.language === 'urd' ? 15 : 0,
          }}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  };
  const DrawerSwitch = ({onPress, title, condition, animationValue}) => {
    return (
      <View
        style={{
          height: 50,
          width: '88%',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: condition ? 'row' : 'row-reverse',
          alignSelf: 'center',
        }}>
        <Text
          style={{
            color: Colors.secondary,
            fontFamily: FontFamily.title,
            fontSize: getFontSize(13),
          }}>
          {title}
        </Text>
        <TouchableOpacity
          style={{
            width: 45,
            height: 25,
            backgroundColor: '#CDCDCD',
            borderRadius: 50,
            justifyContent: 'center',
            paddingHorizontal: 2,
          }}
          activeOpacity={1}
          onPress={onPress}>
          <Animated.View
            style={{
              width: 20,
              height: 20,
              backgroundColor: 'white',
              borderRadius: 40,
              left: animationValue,
            }}></Animated.View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <DrawerContentScrollView {...props} style={{flex: 1}}>
      <Image
        source={require('../../assets/images/logo.png')}
        style={{
          width: '50%',
          height: 50,
          resizeMode: 'contain',
          alignSelf: 'center',
          marginVertical: 10,
        }}
      />
      <View
        style={{
          width: '90%',
          alignSelf: 'center',
          borderBottomWidth: 0.5,
          borderColor: Colors.complimantory,
          marginVertical: 10,
          marginBottom: 20,
        }}></View>
      <DrawerItemList
        icon={require('../../assets/icons/home.png')}
        title={t('home')}
        screen={'HomeStack'}
      />
      <DrawerItemList
        icon={require('../../assets/icons/message.png')}
        title={t('messages')}
        screen={'Conversion'}
      />
      <DrawerItemList
        icon={require('../../assets/icons/bell.png')}
        title={t('notification')}
        screen={'Notification'}
      />
      <DrawerItemList
        icon={require('../../assets/icons/deal.png')}
        title={t('myDeals')}
        screen={'MyDealStack'}
      />
      <DrawerItemList
        icon={require('../../assets/icons/terms.png')}
        title={t('terms&Condition')}
        screen={'TermsConditions'}
      />
      <DrawerItemList
        icon={require('../../assets/icons/privacy.png')}
        title={t('privacy&Policy')}
        screen={'PrivacyPolicy'}
      />
      <View style={[styles.line, {marginTop: 20}]} />
      <View
        style={[
          {flexDirection: i18n.language === 'en' ? 'row' : 'row-reverse'},
          styles.switchWrapper,
        ]}>
        <Text style={styles.switchTitle}>{t('language')}</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={styles.switchLang}>{t('اردو')}</Text>
          <TouchableOpacity
            style={styles.switchCont}
            activeOpacity={1}
            onPress={() => {
              Animated.timing(languageValue.current, {
                toValue: i18n.language === 'en' ? 0 : 20,
                duration: 300,
                useNativeDriver: false,
              }).start();
              i18n.changeLanguage(i18n.language === 'en' ? 'urd' : 'en');
            }}>
            <Animated.View
              style={[{left: languageValue.current}, styles.switchCircle]}
            />
          </TouchableOpacity>
          <Text style={styles.switchLang}>{'Eng'}</Text>
        </View>
      </View>
      <View style={styles.line} />
      <View
        style={[
          {flexDirection: i18n.language === 'en' ? 'row' : 'row-reverse'},
          styles.switchWrapper,
        ]}>
        <Text style={styles.switchTitle}>
          {account === 'buyer' ? t('switchToSelling') : t('switchToBuying')}
        </Text>
        <TouchableOpacity
          style={styles.switchCont}
          activeOpacity={1}
          onPress={() => {
            Animated.timing(accountValue.current, {
              toValue: account === 'seller' ? 0 : 20,
              duration: 300,
              useNativeDriver: false,
            }).start();
            setAccount(account === 'buyer' ? 'seller' : 'buyer');
            props.navigation.navigate('FarmerDrawer');
          }}>
          <Animated.View
            style={[{left: accountValue.current}, styles.switchCircle]}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.line} />
      <View style={{position: 'absolute', width: '100%', bottom: -160}}>
        <Button
          title={'LOGOUT'}
          backgroundColor={Colors.primary}
          round={50}
          borderColor={Colors.primary}
          titleStyle={{fontSize: 12}}
          titleColor={'white'}
          height={40}
          onPress={() => {
            props.navigation.navigate('Login');
          }}
        />
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  line: {
    borderWidth: 0.5,
    borderColor: Colors.dark,
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  switchWrapper: {
    height: 50,
    width: '88%',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  switchTitle: {
    color: Colors.secondary,
    fontFamily: FontFamily.title,
    fontSize: getFontSize(13),
  },
  switchLang: {
    color: Colors.secondary,
    fontFamily: FontFamily.title,
    fontSize: getFontSize(10),
  },
  switchCont: {
    width: 45,
    height: 25,
    backgroundColor: '#CDCDCD',
    borderRadius: 50,
    justifyContent: 'center',
    paddingHorizontal: 2,
    marginHorizontal: 4,
  },
  switchCircle: {
    width: 20,
    height: 20,
    backgroundColor: 'white',
    borderRadius: 40,
  },
  drawerTab: {
    width: '88%',
    alignSelf: 'center',
    alignItems: 'center',
    marginVertical: 15,
  },
});
export default CustomDrawerContent;
