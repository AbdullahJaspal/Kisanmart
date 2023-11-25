import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  SectionList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors, FontSize} from '../../../theme/theme';
import {Icon} from '@rneui/base';
import {useTranslation} from 'react-i18next';
import {CustomStyles} from '../../../theme/theme';
import translate from 'translate-google-api';
import {getPathFromState} from '@react-navigation/native';
import {getFontSize} from '../../../utils/utils';

const {width, height} = Dimensions.get('screen');
const CategoryListing = ({navigation}) => {
  const {t, i18n} = useTranslation();
  const [category, setCategory] = useState(t('all'));

  const data = [
    {
      name: t('name'),
      image: require('../../../assets/images/wheat.png'),
      quant: '5000/40kg',
    },
    {
      name: t('name1'),
      image: require('../../../assets/images/rice.png'),
      quant: '16000/40kg',
    },
    {
      name: t('name'),
      image: require('../../../assets/images/wheat.png'),
      quant: '5000/40kg',
    },
    {
      name: t('name'),
      image: require('../../../assets/images/wheat.png'),
      quant: '5000/40kg',
    },
    {
      name: t('name1'),
      image: require('../../../assets/images/rice.png'),
      quant: '16000/40kg',
    },
    {
      name: t('name'),
      image: require('../../../assets/images/wheat.png'),
      quant: '5000/40kg',
    },
    {
      name: t('name'),
      image: require('../../../assets/images/wheat.png'),
      quant: '5000/40kg',
    },
    {
      name: t('name1'),
      image: require('../../../assets/images/rice.png'),
      quant: '16000/40kg',
    },
    {
      name: t('name'),
      image: require('../../../assets/images/wheat.png'),
      quant: '5000/40kg',
    },
  ];

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {/* <View
        style={[
          styles.topCont,
          {
            flexDirection: i18n.language === 'en' ? 'row' : 'row-reverse',
          },
        ]}>
        <TouchableOpacity
          style={styles.menuIconWrapper}
          onPress={() => {
            navigation.toggleDrawer();
          }}>
          <Image
            style={[
              styles.icon,
              {
                transform: [
                  {rotate: i18n.language === 'en' ? '0deg' : '180deg'},
                ],
              },
            ]}
            tintColor={Colors.secondary}
            source={require('../../../assets/icons/menu.png')}
          />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: i18n.language === 'en' ? 'row' : 'row-reverse',
            ...styles.searchWrapper,
          }}>
          <TextInput
            style={{
              width: '90%',
              textAlign: i18n.language === 'en' ? 'left' : 'right',
            }}
            placeholder={t('searchHere')}
          />
          <Icon
            name="search"
            type="feather"
            size={20}
            color={Colors.complimantory}
          />
        </View>
      </View> */}
      <View
        style={{
          flexDirection: i18n.language === 'en' ? 'row' : 'row-reverse',
          ...styles.topCont,
        }}>
        <Icon
          name={i18n.language === 'en' ? 'arrowleft' : 'arrowright'}
          type="ant-design"
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text style={{...CustomStyles.subTitle}}> {t('wheat')}</Text>
        <Icon name={'arrowright'} type="ant-design" color={'transparent'} />
      </View>

      <View
        style={{
          width: '95%',
          alignSelf: 'center',
          alignItems: i18n.language === 'en' ? 'flex-start' : 'flex-end',
        }}>
        <Text style={{...CustomStyles.heading3, marginTop: 20, fontSize: 14}}>
          {t('wheat')}
        </Text>
      </View>
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        style={{width: '95%', alignSelf: 'center'}}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.renderTab}
            onPress={() => {
              navigation.navigate('ProductDetail');
            }}>
            <Image style={styles.image} source={item.image} />
            <Text
              style={[
                {textAlign: i18n.language === 'en' ? 'left' : 'right'},
                styles.name,
              ]}>
              {item.name}
            </Text>
            <Text
              style={[
                {
                  textAlign: i18n.language === 'en' ? 'left' : 'right',
                },
                styles.quant,
              ]}>
              {item.quant}
            </Text>

            <View
              style={{
                flexDirection: i18n.language === 'en' ? 'row' : 'row-reverse',
                width: '100%',
                marginTop: 5,
              }}>
              <Icon name="star" size={15} color={Colors.primary} />
              <Text style={styles.reviews}> 4.7{'  '}(102 Reviews)</Text>
            </View>
          </TouchableOpacity>
        )} // placed images in my case
      />
    </View>
  );
};

const styles = StyleSheet.create({
  topCont: {
    width: '95%',
    alignSelf: 'center',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  menuIconWrapper: {
    backgroundColor: Colors.grey,
    width: 35,
    height: 35,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {width: 18, height: 18, resizeMode: 'contain'},
  searchWrapper: {
    width: '85%',
    borderWidth: 0.5,
    borderColor: Colors.complimantory,
    height: 35,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  categoryWrapper: {
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    height: 25,
    paddingHorizontal: 20,
    borderColor: Colors.complimantory,
    marginRight: 5,
  },
  categoryWrapperFlat: {
    alignSelf: 'center',
    width: '95%',
    marginVertical: 15,
  },
  renderTab: {
    width: width / 2.2,
    height: width / 2,
    borderWidth: 0.5,
    marginLeft: 5,
    borderColor: Colors.complimantory,
    borderRadius: 10,
    alignItems: 'center',
    padding: 10,
    marginTop: 10,
  },
  image: {
    height: width / 3.5,
    width: '100%',
    resizeMode: 'contain',
  },
  name: {
    fontFamily: 'Poppins-Medium',
    fontSize: getFontSize(13),
    color: Colors.dark,
    marginTop: 5,
    width: '100%',
  },
  quant: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: getFontSize(13),
    color: Colors.secondary,
    marginTop: 5,
    width: '100%',
  },
  reviews: {
    fontSize: 12,
    color: Colors.dark,
    fontFamily: 'Poppins-Regular',
  },
});
export default CategoryListing;
