import {Icon} from '@rneui/base';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors, CustomStyles, FontFamily, FontSize} from '../../../theme/theme';

const Conversion = ({navigation}) => {
  const {t, i18n} = useTranslation();

  const conversations = [
    {
      _id: 1,
      avatar: require('../../../assets/images/convo1.png'),
      name: t('amir'),
      message: t('askme'),
      time: '12:02 pm',
      messagen: true,
    },
    {
      _id: 2,
      avatar: require('../../../assets/images/convo2.png'),
      name: t('noman'),
      message: t('wheatmsg'),
      time: '12:02 pm',
      messagen: false,
    },
    {
      _id: 3,
      avatar: require('../../../assets/images/convo3.png'),
      name: t('amir'),
      message: t('3rdMessage'),
      time: '12:02 pm',
      messagen: false,
    },
    {
      _id: 4,
      avatar: require('../../../assets/images/convo4.png'),
      name: t('amir'),
      message: t('askme'),
      time: '12:02 pm',
      messagen: false,
    },
  ];

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={{
          height: 100,
          flexDirection: i18n.language === 'en' ? 'row' : 'row-reverse',
          alignItems: 'center',
          justifyContent: 'space-between',
          alignSelf: 'center',
        }}
        onPress={() => {
          navigation.navigate('ChatScreen', {item: item});
        }}>
        <View
          style={{
            flexDirection: i18n.language === 'en' ? 'row' : 'row-reverse',
            width: '80%',
            alignItems: 'center',
          }}>
          <Image
            source={item.avatar}
            style={{width: 50, height: 50, resizeMode: 'contain'}}
          />
          <View
            style={{
              alignItems: i18n.language === 'en' ? 'flex-start' : 'flex-end',
              marginLeft: i18n.language === 'en' ? 14 : 0,
              marginRight: i18n.language === 'en' ? 0 : 14,
            }}>
            <Text style={{...CustomStyles.subTitle}}>{item.name}</Text>
            <Text
              numberOfLines={1}
              style={{
                ...CustomStyles.paragraph,
                width: 120,
                fontSize: FontSize.short,
              }}>
              {item.message}
            </Text>
          </View>
        </View>
        <View
          style={{
            alignItems: i18n.language === 'en' ? 'flex-start' : 'flex-end',
          }}>
          <Text style={{...CustomStyles.paragraph}}>12:49</Text>
          {item.messagen && (
            <View
              style={{
                backgroundColor: Colors.primary,
                borderRadius: 100,
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'flex-end',
                width: 18,
                height: 18,
              }}>
              <Text
                style={{
                  fontSize: 11,
                  color: 'white',
                }}>
                5
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          ...styles.topTab,
          flexDirection: i18n.language === 'en' ? 'row' : 'row-reverse',
        }}>
        <Icon
          name={i18n.language === 'en' ? 'arrowleft' : 'arrowright'}
          type="ant-design"
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text style={{...CustomStyles.subTitle}}>{t('messages')}</Text>
        <View
          style={{
            flexDirection: i18n.language === 'en' ? 'row' : 'row-reverse',
            width: '15%',
            justifyContent: 'space-between',
          }}>
          <Icon name="search" type="feather" size={20} />
          <Icon name="dots-three-vertical" type="entypo" size={20} />
        </View>
      </View>

      <FlatList renderItem={renderItem} data={conversations} />
    </View>
  );
};

const styles = StyleSheet.create({
  topTab: {
    justifyContent: 'space-between',
    width: '95%',
    alignSelf: 'center',
    height: 40,
    alignItems: 'center',
  },
});
export default Conversion;
