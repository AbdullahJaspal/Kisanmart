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
const SellerHome = ({navigation}) => {
  const {t, i18n} = useTranslation();
  const [category, setCategory] = useState(t('all'));
  sectionData = [
    {
      title: t('newlyAdded'),
      data: [
        i18n.language === 'en'
          ? [
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
            ]
          : [
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
                name: t('name2'),
                image: require('../../../assets/images/wheat.png'),
                quant: '5000/40kg',
              },
            ].reverse(),
      ],
    },
    {
      title: t('myTopSell'),
      data: [
        i18n.language === 'en'
          ? [
              {
                name: t('name3'),
                image: require('../../../assets/images/corn.png'),
                quant: '5000/20kg',
              },
              {
                name: t('name4'),
                image: require('../../../assets/images/chana.png'),
                quant: '8000/25kg',
              },
              {
                name: t('name5'),
                image: require('../../../assets/images/corn.png'),
                quant: '5000/20kg',
              },
            ]
          : [
              {
                name: t('name3'),
                image: require('../../../assets/images/corn.png'),
                quant: '5000/20kg',
              },
              {
                name: t('name4'),
                image: require('../../../assets/images/chana.png'),
                quant: '8000/25kg',
              },
              {
                name: t('name5'),
                image: require('../../../assets/images/corn.png'),
                quant: '5000/20kg',
              },
            ].reverse(),
      ],
    },
  ];

  categoryData = [
    t('all'),
    t('wheat'),
    t('rice'),
    t('cotton'),
    t('sugercane'),
    t('maize'),
  ];

  const renderCategory = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setCategory(item);
        }}
        style={{
          ...styles.categoryWrapper,
          backgroundColor: category === item ? Colors.primary : 'white',
          borderWidth: category === item ? 0 : 0.5,
        }}>
        <Text
          style={{
            ...CustomStyles.paragraph,
            color: category === item ? 'white' : Colors.secondary,
          }}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderSectionHeader = ({section}) => {
    return (
      <View
        style={{
          flexDirection: i18n.language === 'en' ? 'row' : 'row-reverse',
          alignItems: 'center',
          marginVertical: 10,
        }}>
        <Text
          style={{
            ...CustomStyles.heading3,
          }}>
          {' '}
          {section.title}
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('CategoryListing', {});
          }}>
          <Image
            source={require('../../../assets/icons/arrow.png')}
            style={{
              marginLeft: i18n.language === 'en' ? 10 : 0,
              marginRight: i18n.language === 'en' ? 0 : 10,
              width: 28,
              height: 28,
              resizeMode: 'contain',
              transform: [{rotate: i18n.language === 'en' ? '0deg' : '180deg'}],
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderData = ({item, index, section}) => {
    return (
      <FlatList
        data={item}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <TouchableOpacity
            style={{
              width: width / 2.2,
              borderWidth: 0.5,
              marginLeft: 5,
              marginRight: 10,
              borderColor: Colors.complimantory,
              borderRadius: 10,
              alignItems: 'center',
              padding: 10,
            }}
            onPress={() => {
              navigation.navigate('ProductDetail');
            }}>
            <Image
              style={{
                height: width / 3,
                width: '100%',
                resizeMode: 'contain',
              }}
              source={item.image}
            />
            <Text
              style={{
                fontFamily: 'Poppins-Medium',
                fontSize: getFontSize(13),
                color: Colors.dark,
                marginTop: 5,
                width: '100%',
                textAlign: i18n.language === 'en' ? 'left' : 'right',
              }}>
              {item.name}
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins-SemiBold',
                fontSize: getFontSize(13),
                color: Colors.secondary,
                marginTop: 5,
                width: '100%',
                textAlign: i18n.language === 'en' ? 'left' : 'right',
              }}>
              {item.quant}
            </Text>

            <View
              style={{
                flexDirection: i18n.language === 'en' ? 'row' : 'row-reverse',
                width: '100%',
                marginTop: 5,
              }}>
              <Icon name="star" size={15} color={Colors.primary} />
              <Text
                style={{
                  fontSize: 12,
                  color: Colors.dark,
                  fontFamily: 'Poppins-Regular',
                }}>
                {' '}
                4.7{'  '}(102 Reviews)
              </Text>
            </View>
          </TouchableOpacity>
        )} // placed images in my case
      />
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View
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
          style={[
            styles.searchWrapper,
            {flexDirection: i18n.language === 'en' ? 'row' : 'row-reverse'},
          ]}>
          <TextInput
            style={{
              width: '90%',
              textAlign: i18n.language === 'en' ? 'left' : 'right',
              padding: 0,
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
      </View>
      <View>
        <Text
          style={{
            ...CustomStyles.heading3,
            textAlign: i18n.language === 'en' ? 'left' : 'right',
            width: '95%',
            marginTop: 10,
          }}>
          {' '}
          {t('myListing')}
        </Text>

        <FlatList
          style={styles.categoryWrapperFlat}
          data={i18n.language === 'en' ? categoryData : categoryData.reverse()}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={renderCategory}
        />
      </View>
      <SectionList
        sections={sectionData}
        style={{
          flexGrow: 1,
          alignSelf: 'center',
          paddingHorizontal: 10,
        }}
        showsHorizontalScrollIndicator={false}
        renderSectionHeader={renderSectionHeader}
        renderItem={renderData}
      />
      <TouchableOpacity
        style={{
          backgroundColor: Colors.primary,
          height: 60,
          width: 60,
          borderRadius: 100,
          position: 'absolute',
          bottom: 0,
          left: i18n.language === 'en' ? '80%' : '5%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => {
          navigation.navigate('AddProduct');
        }}>
        <Icon name="add" size={42} color={'white'} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  topCont: {
    width: '95%',
    alignSelf: 'center',
    marginTop: 10,
    flexDirection: 'row',
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
});
export default SellerHome;
