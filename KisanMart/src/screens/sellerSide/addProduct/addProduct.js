import {Icon} from '@rneui/base';
import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {View} from 'react-native';
import {Colors, FontFamily, FontSize} from '../../../theme/theme';
import {CustomStyles} from '../../../theme/theme';
import {useTranslation} from 'react-i18next';
import InputField from '../../../components/InputField';
import ImagePicker from 'react-native-image-crop-picker';
import {FlatList} from 'react-native';
import Button from '../../../components/Button';
const AddProduct = ({navigation}) => {
  const {t, i18n} = useTranslation();
  const [arrImages, setArrImages] = useState([]);
  const [terms, setTerms] = useState(false);
  const [termss, setTermss] = useState([]);
  const [curretTerms, setCurretTerm] = useState('');
  const [previewImage, setPreviewImage] = useState('');

  const InfoFields = ({title, placeholder}) => {
    return (
      <View
        style={{
          width: '100%',
          flexDirection: i18n.language === 'en' ? 'row' : 'row-reverse',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 10,
        }}>
        <Text
          style={{
            width: '48%',
            textAlign: i18n.language === 'en' ? 'left' : 'right',
            fontFamily: FontFamily.paragraph,
            fontSize: FontSize.paragraph,
          }}>
          {title}
        </Text>
        <InputField
          placeholder={placeholder}
          style={{
            borderRadius: 10,
            width: '48%',
          }}
        />
      </View>
    );
  };

  const gallery = () => {
    ImagePicker.openPicker({
      multiple: true,
    }).then(images => {
      let arr = [];
      arr = arrImages.concat(images);
      setArrImages(arr);
      setPreviewImage(images[0]?.path);
    });
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
        <Text style={{...CustomStyles.subTitle}}>{t('addNew')}</Text>
        <Icon name={'arrowright'} type="ant-design" color={'transparent'} />
      </View>
      <ScrollView>
        <View style={styles.wrapper(i18n.language)}>
          <TextInput
            placeholder={t('enterProdName')}
            style={styles.nameInput(i18n.language)}
          />
          <TouchableOpacity
            activeOpacity={0}
            style={styles.placeHolderWrap}
            onPress={() => {
              gallery();
            }}>
            {arrImages.length === 0 ? (
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Image
                  source={require('../../../assets/images/placeholder.png')}
                  style={{width: 90, height: 90}}
                />
                <Text style={styles.placeholderText}>{t('addImage')}</Text>
              </View>
            ) : (
              <Image
                source={{uri: previewImage}}
                style={{height: '100%', width: '100%', borderRadius: 5}}
              />
            )}
          </TouchableOpacity>
          {arrImages.length !== 0 && (
            <FlatList
              data={arrImages}
              showsHorizontalScrollIndicator={false}
              ListFooterComponent={() => {
                return (
                  <TouchableOpacity
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: Colors.grey,
                      height: 65,
                      width: 65,
                      borderRadius: 5,
                    }}
                    onPress={() => {
                      gallery();
                    }}>
                    <Image
                      source={require('../../../assets/images/placeholder.png')}
                      style={{width: 30, height: 30}}
                    />
                    <Text
                      style={{
                        fontSize: 10,
                        fontFamily: FontFamily.paragraph,
                      }}>
                      {t('addmore')}
                    </Text>
                  </TouchableOpacity>
                );
              }}
              horizontal
              renderItem={({item}) => {
                return (
                  <TouchableOpacity
                    style={styles.renderImageWrap}
                    onPress={() => {
                      setPreviewImage(item.path);
                    }}>
                    <TouchableOpacity
                      style={{
                        position: 'absolute',
                        zIndex: 12,
                        backgroundColor: 'white',
                        borderRadius: 100,
                        top: 3,
                        right: 3,
                      }}
                      onPress={() => {
                        setArrImages(arrImages.filter(ite => ite !== item));
                      }}>
                      <Icon name={'close'} size={16} />
                    </TouchableOpacity>
                    <Image
                      source={{uri: item.path}}
                      style={{height: '100%', width: '100%', borderRadius: 5}}
                    />
                  </TouchableOpacity>
                );
              }}
            />
          )}

          <InfoFields title={t('enterUnits')} placeholder={t('enterUnits')} />
          <InfoFields
            title={t('pricePerUnit')}
            placeholder={t('enterPricePerUnit')}
          />
          <InfoFields
            title={t('availQuantity')}
            placeholder={t('enterAvailQuantity')}
          />
          <InfoFields title={t('enterRegion')} placeholder={t('enterRegion')} />
          <InputField
            placeholder={t('writeDes')}
            height={40}
            style={{
              borderRadius: 10,
              width: '100%',
              marginTop: 10,
              height: 120,
            }}
            multiline
          />

          <View style={{width: '100%', alignSelf: 'center'}}>
            <Text style={styles.descipTerms(i18n.language)}>
              {t('describeTerms')}
            </Text>
            <View style={styles.termsCont(termss)}>
              {termss?.map((item, index) => {
                return (
                  <View style={styles.termsWrap(i18n.language)}>
                    <View style={styles.textWrap(i18n.language)}>
                      <Text style={{color: Colors.secondary}}>
                        {index + 1}{' '}
                      </Text>
                      <Text style={styles.term(i18n.language)}>. {item} .</Text>
                    </View>
                    <Icon
                      name="minuscircle"
                      type="ant-design"
                      size={16}
                      color={Colors.primary}
                      onPress={() => {
                        setTermss(
                          termss.filter(ite => {
                            return ite !== item;
                          }),
                        );
                      }}
                      style={{
                        transform: [
                          {rotate: i18n.language === 'en' ? '0deg' : '180deg'},
                        ],
                      }}
                    />
                  </View>
                );
              })}
            </View>
            {terms && (
              <View style={styles.termsInputCont(i18n.language)}>
                <InputField
                  placeholder={''}
                  height={40}
                  onChangeText={val => {
                    setCurretTerm(val);
                  }}
                  value={curretTerms}
                  style={styles.termsInput(i18n.language)}
                  multiline
                />
                <Icon
                  name="send"
                  color={Colors.primary}
                  onPress={() => {
                    curretTerms !== '' &&
                      (termss.push(curretTerms),
                      setCurretTerm(''),
                      setTerms(false));
                  }}
                  style={{
                    transform: [
                      {rotate: i18n.language === 'en' ? '0deg' : '180deg'},
                    ],
                  }}
                />
              </View>
            )}
            <Button
              width="100%"
              backgroundColor={Colors.complimantory}
              borderColor={Colors.complimantory}
              round={10}
              title={t('addewTerms')}
              titleStyle={{
                fontSize: 14,
              }}
              onPress={() => {
                setTerms(true);
              }}
            />
          </View>
          <Button
            width="100%"
            backgroundColor={Colors.primary}
            borderColor={Colors.primary}
            round={10}
            title={'Add'}
            titleColor={'white'}
          />
        </View>
      </ScrollView>
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
      borderBottomWidth: 0.5,
      borderColor: Colors.complimantory,
      marginBottom: 10,
      flexDirection: language === 'en' ? 'row' : 'row-reverse',
    };
  },
  wrapper: language => {
    return {
      width: '95%',
      alignSelf: 'center',
      alignItems: language === 'en' ? 'flex-start' : 'flex-end',
    };
  },
  nameInput: language => {
    return {
      width: '100%',
      padding: 5,
      height: 45,
      borderWidth: 1,
      borderColor: Colors.complimantory,
      borderRadius: 10,
      textAlign: language === 'en' ? 'left' : 'right',
    };
  },
  placeHolderWrap: {
    height: 200,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.grey,
    marginVertical: 10,
    borderRadius: 10,
  },
  renderImageWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.grey,
    height: 65,
    width: 65,
    borderRadius: 5,
    marginRight: 10,
  },
  placeholderText: {
    fontSize: FontSize.paragraph,
    fontFamily: FontFamily.paragraph,
    color: Colors.secondary,
  },
  descipTerms: language => {
    return {
      fontFamily: FontFamily.title,
      fontSize: FontSize.title,
      marginVertical: 10,
      color: Colors.secondary,
      alignSelf: language === 'en' ? 'flex-start' : 'flex-end',
    };
  },
  termsCont: termss => {
    return {
      borderWidth: termss.length !== 0 ? 1 : 0,
      width: '100%',
      borderColor: Colors.complimantory,
      paddingHorizontal: 5,
      borderRadius: 10,
    };
  },
  termsWrap: language => {
    return {
      flexDirection: language === 'en' ? 'row' : 'row-reverse',
      alignItems: 'center',
      width: '100%',
      justifyContent: 'space-between',
    };
  },
  textWrap: language => {
    return {
      flexDirection: language === 'en' ? 'row' : 'row-reverse',
      alignItems: 'center',
      width: '90%',
    };
  },
  term: language => {
    return {
      fontFamily: FontSize.paragraph,
      fontSize: FontSize.paragraph,
      marginVertical: 10,
      color: Colors.complimantory,
      textAlign: language === 'en' ? 'left' : 'right',
    };
  },
  termsInputCont: language => {
    return {
      flexDirection: language === 'en' ? 'row' : 'row-reverse',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
    };
  },
  termsInput: language => {
    return {
      borderRadius: 10,
      width: '90%',
      marginTop: 10,
      height: 50,
      marginBottom: 10,
      textAlign: language === 'en' ? 'left' : 'right',
    };
  },
});
export default AddProduct;
