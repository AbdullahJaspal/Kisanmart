import {Icon} from '@rneui/base';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Colors, CustomStyles} from '../../../theme/theme';
import InputField from '../../../components/InputField';

const MyProfile = ({navigation}) => {
  const {t, i18n} = useTranslation();

  const Input = ({title, placeHolder}) => {
    return (
      <View style={{width: '95%', alignSelf: 'center', marginTop: 10}}>
        <Text style={styles.inputTitle(i18n.language)}>{title}</Text>
        <InputField width={'100%'} placeholder={placeHolder} />
      </View>
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.topCont(i18n.language)}>
        <Icon
          name={i18n.language === 'en' ? 'arrowleft' : 'arrowright'}
          type="ant-design"
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text style={{...CustomStyles.subTitle}}>{t('sellerInfo')}</Text>
        <Text style={{...CustomStyles.paragraph}}>{t('edit')}</Text>
      </View>
      <View style={{alignSelf: 'center', marginTop: 20, alignItems: 'center'}}>
        <Image
          source={require('../../../assets/images/profile.jpeg')}
          style={{
            width: 120,
            height: 120,
            borderRadius: 100,
          }}
        />
      </View>
      <Input title={t('nam')} placeHolder={t('noman')} />
      <Input title={t('id')} placeHolder={t('9328-6492384293-8')} />
      <Input title={t('number')} placeHolder={t('+9232 309203232')} />
      <Input title={t('whatappNum')} placeHolder={t('+9232 309203232')} />
      <Input title={t('region')} placeHolder={t('regionVal')} />
    </View>
  );
};

const styles = StyleSheet.create({
  topCont: language => {
    return {
      width: '95%',
      alignSelf: 'center',
      height: 50,
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: language === 'en' ? 'row' : 'row-reverse',
      borderBottomWidth: 0.5,
      borderColor: Colors.complimantory,
    };
  },
  contactTab: {
    height: 40,
    borderWidth: 1,
    borderColor: Colors.dark,
    width: '48%',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  inputTitle: language => {
    return {
      ...CustomStyles.paragraph,
      marginLeft: language === 'en' ? 10 : 0,
      marginRight: language !== 'en' ? 10 : 0,
      color: 'black',
      alignSelf: language === 'en' ? 'flex-start' : 'flex-end',
    };
  },
});

export default MyProfile;
