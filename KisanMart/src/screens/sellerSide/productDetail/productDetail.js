import {Icon} from '@rneui/base';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Clipboard,
  TouchableOpacity,
  Share,
} from 'react-native';
import {Colors, CustomStyles} from '../../../theme/theme';
import Button from '../../../components/Button';
import Animated, {
  useSharedValue,
  interpolate,
  useAnimatedScrollHandler,
  Extrapolation,
  useAnimatedStyle,
} from 'react-native-reanimated';

const {width, height} = Dimensions.get('screen');
const ProductDetail = ({navigation}) => {
  const {t, i18n} = useTranslation();
  const [sliderState, setSliderState] = useState({currentPage: 0});
  const {currentPage} = sliderState;

  const imageHeight = useSharedValue(0);

  const setSliderPage = (event: any) => {
    const {x} = event.nativeEvent.contentOffset;
    const indexOfNextScreen = Math.floor(x / width);
    if (indexOfNextScreen !== currentPage) {
      setSliderState({
        ...sliderState,
        currentPage: indexOfNextScreen,
      });
    }
  };

  const copyToClipboard = ({text}) => {
    Clipboard.setString(text);
  };
  const {currentPage: pageIndex} = sliderState;
  const RenderComponent = ({heading, paragraph, image}) => {
    return (
      <View
        style={{
          width,
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image source={image} style={styles.imageStyle} />
      </View>
    );
  };

  const DetailTabs = ({title, value}) => {
    return (
      <View
        style={{
          width: '100%',
          flexDirection: i18n.language === 'en' ? 'row' : 'row-reverse',
          justifyContent: 'space-between',
          borderBottomWidth: 1,
          borderColor: Colors.complimantory,
        }}>
        <Text
          style={{
            fontSize: 14,
            color: Colors.secondary,
            width: '35%',
            padding: 10,
            textAlign: i18n.language === 'en' ? 'left' : 'right',
          }}>
          {title}
        </Text>
        <View style={{borderLeftWidth: 1, borderColor: Colors.complimantory}} />
        <Text
          style={{
            ...CustomStyles.paragraph,
            width: '65%',
            padding: 10,
            textAlign: i18n.language === 'en' ? 'left' : 'right',
          }}>
          {value}
        </Text>
      </View>
    );
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  //scroll animation

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: e => {
      imageHeight.value = e.contentOffset.y;
    },
  });

  const animatedStyles = useAnimatedStyle(() => {
    const Image_Height = interpolate(
      imageHeight.value,
      [0, height / 4 - 0],
      [height / 4, 0],
      {
        extrapolateRight: Extrapolation.CLAMP,
      },
    );

    return {
      height: Image_Height,
    };
  });

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
        <Text style={{...CustomStyles.subTitle}}>{t('name')}</Text>
        <Icon name={'arrowright'} type="ant-design" color={'transparent'} />
      </View>

      <Animated.ScrollView
        onScroll={scrollHandler}
        contentContainerStyle={{
          paddingTop: height / 4,
        }}
        showsVerticalScrollIndicator={false}>
        <View style={styles.sellerInfoCont(i18n.language)}>
          <View style={styles.sellerInfoWrap(i18n.language)}>
            <Image
              source={require('../../../assets/images/profile.jpeg')}
              style={styles.avatar}
            />
            <View style={styles.nameCont(i18n.language)}>
              <Text
                style={{...CustomStyles.heading3, fontSize: 16}}
                onPress={() => {
                  navigation.navigate('SellerInfo');
                }}>
                {t('noman')}
              </Text>
              <Text style={{...CustomStyles.paragraph, fontSize: 12}}>
                {t('lahore')}
              </Text>
            </View>
          </View>
          <View style={styles.shareCont}>
            <TouchableOpacity
              onPress={() => {
                onShare();
              }}>
              <Image
                style={styles.shareIcon}
                source={require('../../../assets/icons/share.png')}
              />
            </TouchableOpacity>
            <Image
              style={styles.shareIcon}
              source={require('../../../assets/icons/favorite.png')}
            />
          </View>
        </View>
        <View style={styles.reviewCont(i18n.language)}>
          <Icon name="star" size={15} color={Colors.primary} />
          <Text style={styles.review}>
            {t('good')} {t('seller')}
          </Text>
        </View>
        <View style={styles.descripCont}>
          <DetailTabs title={t('description')} value={t('desripVal')} />
          <DetailTabs
            title={t('quality&Freshness')}
            value={t('quality&FreshnessVal')}
          />
          <DetailTabs title={t('region')} value={t('regionVal')} />
          <DetailTabs title={t('availability')} value={t('availabilityVal')} />
          <DetailTabs title={t('price')} value={t('priceVal')} />
        </View>

        <Text style={styles.contactTitle(i18n.language)}>
          {t('contactInfo')}
        </Text>

        <View style={styles.contactTabCont(i18n.language)}>
          <TouchableOpacity
            style={styles.contactTab}
            onPress={() => {
              copyToClipboard('+923245454545');
            }}>
            <Text style={{...CustomStyles.paragraph}}>+923245454545</Text>
            <Image
              source={require('../../../assets/icons/copy.png')}
              style={{width: 15, height: 15, resizeMode: 'contain'}}
            />
          </TouchableOpacity>
          <View style={styles.contactTab}>
            <Text style={styles.buttonTitle}>{t('whatappChat')}</Text>
            <Image
              source={require('../../../assets/icons/whatsapp.png')}
              style={{width: 15, height: 15, resizeMode: 'contain'}}
            />
          </View>
        </View>
        <Button
          backgroundColor={Colors.primary}
          borderColor={Colors.primary}
          round={50}
          titleColor={'white'}
          title={t('chatwithSeller')}
          style={{
            marginTop: 50,
          }}
          onPress={() => {
            navigation.navigate('ChatScreen', {
              item: {
                _id: 1,
                name: t('noman'),
                avatar: require('../../../assets/images/profile.jpeg'),
              },
            });
          }}
        />
        <View style={{height: 200}}></View>
      </Animated.ScrollView>

      <Animated.View style={{position: 'absolute', top: 0, marginTop: 40}}>
        <Animated.View
          style={{
            height: height / 4,
            backgroundColor: 'blue',
            width: width,
            resizeMode: 'stretch',
            ...animatedStyles,
          }}>
          <ScrollView
            ref={scrollView => {
              _scrollView = scrollView;
            }}
            horizontal={true}
            scrollEventThrottle={16}
            showsHorizontalScrollIndicator={false}
            pagingEnabled={true}
            onScroll={(event: any) => {
              setSliderPage(event);
            }}>
            <RenderComponent
              image={require('./../../../assets/images/wheat.png')}
            />
            <RenderComponent
              image={require('./../../../assets/images/wheat.png')}
            />
            <RenderComponent
              image={require('./../../../assets/images/wheat.png')}
            />
          </ScrollView>
          <View style={styles.paginationWrapper}>
            {Array.from(Array(3).keys()).map((key, index) => (
              <View
                style={[
                  styles.paginationDots,
                  {
                    opacity: pageIndex === index ? 1 : 0.2,
                    width: pageIndex === index ? 20 : 5,
                  },
                ]}
                key={index}
              />
            ))}
          </View>
        </Animated.View>
      </Animated.View>
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
    };
  },
  paginationWrapper: {
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  paginationDots: {
    height: 5,
    borderRadius: 10 / 2,
    backgroundColor: Colors.primary,
    marginLeft: 10,
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
  buttonTitle: language => {
    return {
      ...CustomStyles.paragraph,
      width: '90%',
      textAlign: language === 'en' ? 'left' : 'center',
    };
  },
  contactTabCont: language => {
    return {
      width: '95%',
      flexDirection: language === 'en' ? 'row' : 'row-reverse',
      justifyContent: 'space-between',
      alignSelf: 'center',
    };
  },
  sellerInfoCont: language => {
    return {
      flexDirection: language === 'en' ? 'row' : 'row-reverse',
      width: '95%',
      alignSelf: 'center',
      height: 60,
      alignItems: 'center',
      marginTop: 10,
    };
  },
  sellerInfoWrap: language => {
    return {
      flexDirection: language === 'en' ? 'row' : 'row-reverse',
      width: '75%',
      alignItems: 'center',
    };
  },
  avatar: {width: 50, height: 50, borderRadius: 100},
  nameCont: language => {
    return {
      height: 35,
      marginLeft: language === 'en' ? 15 : 0,
      marginRight: language === 'urd' ? 15 : 0,
      alignItems: language === 'en' ? 'flex-start' : 'flex-end',
    };
  },
  shareCont: {
    flexDirection: 'row',
    width: '23%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  shareIcon: {width: 35, height: 35, resizeMode: 'contain'},
  reviewCont: language => {
    return {
      flexDirection: language === 'en' ? 'row' : 'row-reverse',
      width: '95%',
      marginVertical: 8,
      alignSelf: 'center',
    };
  },
  review: {
    fontSize: 12,
    color: Colors.dark,
    fontFamily: 'Poppins-Regular',
  },
  descripCont: {
    borderWidth: 0.5,
    borderColor: Colors.complimantory,
    width: '95%',
    alignSelf: 'center',
  },
  contactTitle: language => {
    return {
      ...CustomStyles.heading3,
      fontSize: 16,
      width: '95%',
      alignSelf: 'center',
      marginVertical: 10,
      textAlign: language === 'en' ? 'left' : 'right',
    };
  },
});

export default ProductDetail;
