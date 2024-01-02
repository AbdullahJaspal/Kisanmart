import React from 'react';
import {useTranslation} from 'react-i18next';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {Colors, CustomStyles} from '../../../theme/theme';
import InputField from '../../../components/InputField';
import {Icon} from '@rneui/base';
import Button from '../../../components/Button';
import {currentLaguage} from '../../../utils/utils';

const CreateProfile = ({navigation}) => {
  const {t, i18n} = useTranslation();

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
      <Text
        style={styles.skip}
        onPress={() => {
          navigation.navigate('Login');
        }}>
        {t('skip')}
      </Text>
      <Text style={styles.welcome}>{t('welcome')}</Text>
      <Text style={styles.complete}>{t('completeProfile')}</Text>
      <View style={{marginTop: 20}}>
        <TouchableOpacity style={styles.imageWrap}>
          <Image
            source={require('../../../assets/images/placeholder.png')}
            style={styles.placeholder}
          />
        </TouchableOpacity>
        <Text style={styles.uploadPic}>{t('uploadPic')}</Text>
      </View>
      <InputField placeholder={t('enterName')} style={{marginTop: 30}} />
      <InputField placeholder={t('number')} style={{marginTop: 10}} />
      <InputField placeholder={t('whatappNum')} style={{marginTop: 10}} />
      <TouchableOpacity
        style={{
          flexDirection: i18n.language === 'en' ? 'row' : 'row-reverse',
          ...styles.cardButton,
        }}>
        <Text style={{color: Colors.complimantory}}>{t('verifyCard')}</Text>
        <Icon
          name="caretright"
          type="ant-design"
          size={16}
          color={Colors.primary}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          flexDirection: i18n.language === 'en' ? 'row' : 'row-reverse',
          ...styles.cardButton,
        }}>
        <Text style={{color: Colors.complimantory}}>{t('selectRegion')}</Text>
        <Icon
          name="caretdown"
          type="ant-design"
          size={16}
          color={Colors.primary}
        />
      </TouchableOpacity>

      <Button
        backgroundColor={Colors.primary}
        borderColor={Colors.primary}
        round={50}
        style={{marginTop: 30}}
        title={t('next')}
        titleColor={'white'}
        onPress={() => {
          navigation.navigate('IDscan');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  skip: {
    alignSelf: 'center',
    position: 'absolute',
    right: 10,
    top: 4,
    color: Colors.primary,
    ...CustomStyles.paragraph,
  },
  welcome: {...CustomStyles.title, alignSelf: 'center', marginTop: 10},
  complete: {...CustomStyles.paragraph, alignSelf: 'center'},
  imageWrap: {
    width: 120,
    height: 120,
    borderRadius: 100,
    backgroundColor: Colors.grey,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholder: {width: '50%', height: '50%', resizeMode: 'contain'},
  uploadPic: {
    ...CustomStyles.paragraph,
    alignSelf: 'center',
    marginTop: 10,
  },
  cardButton: {
    borderWidth: 0.5,
    height: 50,
    width: '90%',
    alignSelf: 'center',
    borderColor: Colors.complimantory,
    borderRadius: 100,
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 10,
    justifyContent: 'space-between',
  },
});
export default CreateProfile;
