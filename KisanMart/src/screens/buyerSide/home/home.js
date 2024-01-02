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
const BuyerHome = ({navigation}) => {
  const {t, i18n} = useTranslation();
  const [category, setCategory] = useState(t('all'));
  sectionData = [
    {
      title: t('topSelling'),
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
      title: t('exportQuality'),
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
    {
      title: t('fruits&Vegs'),
      data: [
        [
          {
            name: t('name6'),
            image: require('../../../assets/images/banana.png'),
            quant: '500/dzon',
          },
          {
            name: t('name7'),
            image: require('../../../assets/images/lime.png'),
            quant: '200/dzon',
          },
          {
            name: t('name8'),
            image: require('../../../assets/images/banana.png'),
            quant: '500/dzon',
          },
        ],
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
        style={styles.categoryWrapper(category, item)}>
        <Text style={styles.categoryLabel(category, item)}>{item}</Text>
      </TouchableOpacity>
    );
  };

  const renderSectionHeader = ({section}) => {
    return (
      <View style={styles.headerCont(i18n.language)}>
        <Text style={{...CustomStyles.heading3}}> {section.title}</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('CategoryListing', {});
          }}>
          <Image
            source={require('../../../assets/icons/arrow.png')}
            style={styles.headerIcon(i18n.language)}
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
        renderItem={renderHorizontalFlat} // placed images in my case
      />
    );
  };
  const renderHorizontalFlat = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.renderWrap}
        onPress={() => {
          navigation.navigate('ProductDetail');
        }}>
        <Image style={styles.productImage} source={item.image} />
        <Text style={styles.productName(i18n.language)}>{item.name}</Text>
        <Text style={styles.productQuant(i18n.language)}>{item.quant}</Text>
        <View style={styles.ratingCont(i18n.language)}>
          <Icon name="star" size={15} color={Colors.primary} />
          <Text style={styles.rating}> {t('good')}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.topCont(i18n.language)}>
        <TouchableOpacity
          style={styles.menuIconWrapper}
          onPress={() => {
            navigation.toggleDrawer();
          }}>
          <Image
            style={styles.icon(i18n.language)}
            tintColor={Colors.secondary}
            source={require('../../../assets/icons/menu.png')}
          />
        </TouchableOpacity>
        <View style={styles.searchWrapper(i18n.language)}>
          <TextInput
            style={styles.searchInput(i18n.language)}
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
        style={styles.sectionStyles}
        showsHorizontalScrollIndicator={false}
        renderSectionHeader={renderSectionHeader}
        renderItem={renderData}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  topCont: language => {
    return {
      width: '95%',
      alignSelf: 'center',
      marginTop: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      flexDirection: language === 'en' ? 'row' : 'row-reverse',
    };
  },
  menuIconWrapper: {
    backgroundColor: Colors.grey,
    width: 35,
    height: 35,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: language => {
    return {
      width: 18,
      height: 18,
      resizeMode: 'contain',
      transform: [{rotate: language === 'en' ? '0deg' : '180deg'}],
    };
  },
  searchWrapper: language => {
    return {
      width: '85%',
      borderWidth: 0.5,
      borderColor: Colors.complimantory,
      height: 35,
      borderRadius: 100,
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
      flexDirection: language === 'en' ? 'row' : 'row-reverse',
    };
  },
  searchInput: language => {
    return {
      width: '90%',
      textAlign: language === 'en' ? 'left' : 'right',
      padding: 0,
    };
  },
  categoryWrapper: (category, item) => {
    return {
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
      height: 25,
      paddingHorizontal: 20,
      borderColor: Colors.complimantory,
      marginRight: 5,
      backgroundColor: category === item ? Colors.primary : 'white',
      borderWidth: category === item ? 0 : 0.5,
    };
  },
  categoryLabel: (category, item) => {
    return {
      ...CustomStyles.paragraph,
      color: category === item ? 'white' : Colors.secondary,
    };
  },
  categoryWrapperFlat: {
    alignSelf: 'center',
    width: '95%',
    marginVertical: 15,
  },
  headerCont: language => {
    return {
      flexDirection: language === 'en' ? 'row' : 'row-reverse',
      alignItems: 'center',
      marginVertical: 10,
    };
  },
  headerIcon: language => {
    return {
      marginLeft: language === 'en' ? 10 : 0,
      marginRight: language === 'en' ? 0 : 10,
      width: 28,
      height: 28,
      resizeMode: 'contain',
      transform: [{rotate: language === 'en' ? '0deg' : '180deg'}],
    };
  },
  renderWrap: {
    width: width / 2.5,
    borderWidth: 0.5,
    marginLeft: 5,
    marginRight: 10,
    borderColor: Colors.complimantory,
    borderRadius: 10,
    alignItems: 'center',
    padding: 10,
  },
  productImage: {
    height: width / 4,
    width: '100%',
    resizeMode: 'contain',
  },
  productName: language => {
    return {
      fontFamily: 'Poppins-Medium',
      fontSize: getFontSize(13),
      color: Colors.dark,
      marginTop: 5,
      width: '100%',
      textAlign: language === 'en' ? 'left' : 'right',
    };
  },
  productQuant: language => {
    return {
      fontFamily: 'Poppins-SemiBold',
      fontSize: getFontSize(13),
      color: Colors.secondary,
      marginTop: 5,
      width: '100%',
      textAlign: language === 'en' ? 'left' : 'right',
    };
  },
  ratingCont: language => {
    return {
      flexDirection: language === 'en' ? 'row' : 'row-reverse',
      width: '100%',
      marginTop: 5,
    };
  },
  rating: {
    fontSize: 12,
    color: Colors.dark,
    fontFamily: 'Poppins-Regular',
  },
  sectionStyles: {
    flexGrow: 1,
    alignSelf: 'center',
    paddingHorizontal: 10,
  },
});
export default BuyerHome;
