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
        style={styles.renderCont(i18n.language)}
        onPress={() => {
          navigation.navigate('ChatScreen', {item: item});
        }}>
        <View style={styles.renderWrap(i18n.language)}>
          <Image source={item.avatar} style={styles.avatar} />
          <View style={styles.nameCont(i18n.language)}>
            <Text style={{...CustomStyles.subTitle}}>{item.name}</Text>
            <Text numberOfLines={1} style={styles.message}>
              {item.message}
            </Text>
          </View>
        </View>
        <View style={styles.timeWarp(i18n.language)}>
          <Text style={{...CustomStyles.paragraph}}>12:49</Text>
          {item.messagen && (
            <View style={styles.msgBadge}>
              <Text style={styles.msgNum}>5</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.topTab(i18n.language)}>
        <Icon
          name={i18n.language === 'en' ? 'arrowleft' : 'arrowright'}
          type="ant-design"
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text style={{...CustomStyles.subTitle}}>{t('messages')}</Text>
        <View style={styles.iconCont(i18n.language)}>
          <Icon name="search" type="feather" size={20} />
          <Icon name="dots-three-vertical" type="entypo" size={20} />
        </View>
      </View>

      <FlatList renderItem={renderItem} data={conversations} />
    </View>
  );
};

const styles = StyleSheet.create({
  topTab: language => {
    return {
      justifyContent: 'space-between',
      width: '95%',
      alignSelf: 'center',
      height: 40,
      alignItems: 'center',
      flexDirection: language === 'en' ? 'row' : 'row-reverse',
    };
  },
  iconCont: language => {
    return {
      flexDirection: language === 'en' ? 'row' : 'row-reverse',
      width: '15%',
      justifyContent: 'space-between',
    };
  },
  renderCont: language => {
    return {
      height: 100,
      flexDirection: language === 'en' ? 'row' : 'row-reverse',
      alignItems: 'center',
      justifyContent: 'space-between',
      alignSelf: 'center',
    };
  },
  renderWrap: language => {
    return {
      flexDirection: language === 'en' ? 'row' : 'row-reverse',
      width: '80%',
      alignItems: 'center',
    };
  },
  avatar: {width: 50, height: 50, resizeMode: 'contain'},
  nameCont: language => {
    return {
      alignItems: language === 'en' ? 'flex-start' : 'flex-end',
      marginLeft: language === 'en' ? 14 : 0,
      marginRight: language === 'en' ? 0 : 14,
    };
  },
  message: {
    ...CustomStyles.paragraph,
    width: 120,
    fontSize: FontSize.short,
  },
  timeWarp: language => {
    return {
      alignItems: language === 'en' ? 'flex-start' : 'flex-end',
    };
  },
  msgBadge: {
    backgroundColor: Colors.primary,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    width: 18,
    height: 18,
  },
  msgNum: {
    fontSize: 11,
    color: 'white',
  },
});
export default Conversion;
