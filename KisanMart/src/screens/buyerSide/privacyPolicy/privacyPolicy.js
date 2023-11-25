import React from 'react';
import {View, Text} from 'react-native';
import {Colors, FontFamily, FontSize} from '../../../theme/theme';
import {ScrollView} from 'react-native';
import {useTranslation} from 'react-i18next';

const PrivacyPolicy = ({navigation}) => {
  const {t, i18n} = useTranslation();
  const Points = ({title, des}) => {
    return (
      <View
        style={{
          width: '95%',
          alignSelf: 'center',
          alignItems: i18n.language === 'en' ? 'flex-start' : 'flex-end',
        }}>
        <Text
          style={{
            fontSize: FontSize.paragraph,
            fontFamily: FontFamily.title,
            width: '95%',
            alignSelf: 'center',
            marginTop: 10,
            color: 'black',
            textAlign: i18n.language === 'en' ? 'left' : 'right',
          }}>
          {title}
        </Text>
        <Text
          style={{
            fontSize: 12,
            fontFamily: FontFamily.paragraph,
            width: '95%',
            alignSelf: 'center',
            marginTop: 10,
            color: 'black',
            textAlign: i18n.language === 'en' ? 'left' : 'right',
          }}>
          {des}
        </Text>
      </View>
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Text
        style={{
          fontSize: FontSize.headerBold1,
          fontFamily: FontFamily.headerBold1,
          width: '95%',
          alignSelf: 'center',
          color: Colors.primary,
          textAlign: i18n.language === 'en' ? 'left' : 'right',
        }}>
        {t('privacypolicy')}
      </Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Points title={t('dataProtection')} des={t('dataProtectionDes')} />
        <Points
          title={t('informationCollection')}
          des={t('informationCollectionDes')}
        />
        <Points title={t('dataUsage')} des={t('dataUsageDes')} />
        <Points
          title={t('informationSharing')}
          des={t('informationSharingDes')}
        />
        <Points title={t('securityMeasures')} des={t('securityMeasuresDes')} />
        <Points title={t('childrenPrivacy')} des={t('childrenPrivacyDes')} />
        <Points
          title={t('updatesToThePrivacyPolicy')}
          des={t('updatesToThePrivacyPolicyDes')}
        />

        <View style={{height: 50}} />
      </ScrollView>
    </View>
  );
};
export default PrivacyPolicy;
