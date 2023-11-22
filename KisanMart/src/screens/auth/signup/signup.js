import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Image} from 'react-native';
import {View} from 'react-native';
import {Colors, FontSize, FontFamily, CustomStyles} from '../../../theme/theme';
import {useTranslation} from 'react-i18next';
import InputField from '../../../components/InputField';
import Button from '../../../components/Button';
import i18next from '../../../i18n/i18n';
const {width, height} = Dimensions.get('screen');
const Signup = ({navigation}) => {
  const {t, i18n} = useTranslation();
  const [hidePass, setHidePass] = useState(true);
  useEffect(() => {
    i18n.changeLanguage('en');
  }, []);

  const IconWrapper = ({image, title}) => {
    return (
      <TouchableOpacity style={styles.socialIcon}>
        <Image style={styles.icon} source={image} />
        <Text style={{...CustomStyles.paragraph, color: 'black', marginTop: 5}}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{flex: 1}}>
      <View>
        <Image
          source={require('../../../assets/images/logo.png')}
          style={styles.topLogo}
        />
        <Text style={{...CustomStyles.heading3, alignSelf: 'center'}}>
          {t('createAccount')}
        </Text>

        {/* <InputField placeholder={t('enterName')} style={{marginVertical: 10}} /> */}

        <InputField
          keyboardType={'email-address'}
          placeholder={t('enterEmail')}
          style={{marginVertical: 10}}
        />
        <InputField
          placeholder={t('enterPass')}
          style={{marginVertical: 10}}
          eye
          secureTextEntry={hidePass}
          hidePass={hidePass}
          onEyePress={() => {
            setHidePass(!hidePass);
          }}
        />
        <InputField
          placeholder={t('confirmPass')}
          style={{marginVertical: 10}}
          eye
          secureTextEntry={hidePass}
          hidePass={hidePass}
          onEyePress={() => {
            setHidePass(!hidePass);
          }}
        />
      </View>

      <View style={{justifyContent: 'space-evenly', flexGrow: 1}}>
        <Button
          backgroundColor={Colors.primary}
          borderColor={Colors.primary}
          round={100}
          title={t('signup')}
          titleColor={'white'}
          onPress={() => {
            navigation.navigate('Login');
          }}
        />

        <Text style={styles.orContinue}>{t('orContinue')}</Text>

        <View style={styles.iconCont}>
          <IconWrapper
            image={require('../../../assets/icons/facebook.png')}
            title={t('facebook')}
          />
          <IconWrapper
            image={require('../../../assets/icons/google.png')}
            title={t('google')}
          />
          <IconWrapper
            image={require('../../../assets/icons/apple.png')}
            title={t('apple')}
          />
        </View>
        <Text style={styles.orContinue}>
          {t('already')}{' '}
          <Text
            style={{color: Colors.primary}}
            onPress={() => {
              navigation.navigate('Login');
            }}>
            {t('loginn')}
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topLogo: {
    width: 180,
    height: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 50,
  },
  socialIcon: {
    width: width / 3.5,
    height: width / 4.5,
    borderWidth: 0.5,
    borderColor: Colors.complimantory,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orContinue: {
    ...CustomStyles.paragraph,
    alignSelf: 'flex-end',
    marginVertical: 10,
    alignSelf: 'center',
    color: 'black',
  },
  iconCont: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  icon: {width: '30%', height: '30%', resizeMode: 'contain'},
});

export default Signup;
