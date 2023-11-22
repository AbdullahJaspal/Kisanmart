import {Icon} from '@rneui/base';
import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {View} from 'react-native';
import {Colors, FontFamily, FontSize} from '../../../theme/theme';
import {CustomStyles} from '../../../theme/theme';
import {useTranslation} from 'react-i18next';
import {TextInput} from 'react-native';
import InputField from '../../../components/InputField';
import ImagePicker from 'react-native-image-crop-picker';
import {FlatList} from 'react-native';
import Button from '../../../components/Button';
const AddProduct = ({navigation}) => {
  const {t, i18n} = useTranslation();
  const [arrImages, setArrImages] = useState([]);
  const [terms, setTerms] = useState(false);
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
        <Text style={{...CustomStyles.subTitle}}>{t('addNew')}</Text>
        <Icon name={'arrowright'} type="ant-design" color={'transparent'} />
      </View>
      <ScrollView>
        <View
          style={{
            width: '95%',
            alignSelf: 'center',
            alignItems: i18n.language === 'en' ? 'flex-start' : 'flex-end',
          }}>
          <TextInput
            placeholder={t('enterProdName')}
            style={{
              width: '100%',
              padding: 5,
              height: 45,
              borderWidth: 1,
              borderColor: Colors.complimantory,
              borderRadius: 10,
              textAlign: i18n.language === 'en' ? 'left' : 'right',
            }}
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
                <Text
                  style={{
                    fontSize: FontSize.paragraph,
                    fontFamily: FontFamily.paragraph,
                  }}>
                  {t('addImage')}
                </Text>
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
          <Text
            style={{
              fontFamily: FontFamily.title,
              fontSize: FontSize.title,
              marginVertical: 10,
            }}>
            {t('describeTerms')}
          </Text>
          {terms && (
            <InputField
              placeholder={''}
              height={40}
              style={{
                borderRadius: 10,
                width: '100%',
                marginTop: 10,
                height: 50,
                marginBottom: 10,
              }}
              multiline
            />
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
  topCont: {
    width: '95%',
    alignSelf: 'center',
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderColor: Colors.complimantory,
    marginBottom: 10,
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
});
export default AddProduct;
