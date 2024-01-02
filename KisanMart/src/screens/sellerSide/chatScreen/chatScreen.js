import {Icon, fonts} from '@rneui/base';
import React, {useState, useCallback, useEffect, useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {Colors, CustomStyles, FontFamily, FontSize} from '../../../theme/theme';
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
import {Dropdown} from 'react-native-element-dropdown';
import Button from '../../../components/Button';
import InputField from '../../../components/InputField';
import RBSheet from 'react-native-raw-bottom-sheet';

const {width, height} = Dimensions.get('screen');
const ChatScreen = ({route, navigation}) => {
  const [messages, setMessages] = useState([]);
  const [bottom, setBottom] = useState(false);
  const [offerSent, setOfferSet] = useState(false);
  const [offerMessage, setOfferMessage] = useState(null);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [terms, setTerms] = useState(false);
  const [termss, setTermss] = useState([]);
  const [curretTerms, setCurretTerm] = useState('');

  const refRBSheet = useRef();
  const {item} = route.params;
  const {t, i18n} = useTranslation();
  useEffect(() => {
    setOfferSet(false);
    setMessages([]);
    setMessages([
      {
        _id: item._id,
        text: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: item.name,
          avatar: item.avatar,
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  const renderFoot = () => {
    return (
      <View style={styles.createOfferWrap(offerSent)}>
        <Text
          style={styles.createOfferText}
          onPress={() => {
            refRBSheet.current.open();
          }}>
          {t('createOffer')}
        </Text>
      </View>
    );
  };
  const renderBubble = props => {
    return props.currentMessage.offer ? (
      <View style={styles.offerProductWithWrap}>
        <Image
          style={styles.offerProductWithImage}
          source={require('../../../assets/images/wheat.png')}
        />
        <View style={{width: '70%'}}>
          <Text style={styles.offerProductWithName}>Purify Yellow Wheat</Text>
          <Text style={styles.iconDes}>
            Lorem ipsum is text commonly typeface without relying on content.
          </Text>
          <Text style={styles.price}>Price: Rs 5000/40kg</Text>
          <Button
            backgroundColor={Colors.primary}
            borderColor={Colors.primary}
            title={t('widthDraw')}
            titleStyle={{fontSize: 14}}
            titleColor={'white'}
            round={50}
            height={35}
            onPress={() => {
              setOfferSet(false);
              arr = messages.filter(item => item._id !== offerMessage._id);
              setMessages(arr);
            }}
          />
        </View>
      </View>
    ) : (
      <Bubble
        {...props}
        textStyle={styles.bubbleText}
        wrapperStyle={styles.bubbleWrapper}
      />
    );
  };
  const renderAvatar = () => {
    return (
      <Image source={item.avatar} style={styles.messageAvatar(i18n.language)} />
    );
  };
  const RenderOffer = () => {
    return (
      <View>
        <View style={styles.topBar(i18n.language)}>
          <Text style={{fontFamily: FontFamily.title, color: Colors.primary}}>
            {t('createOffer')}
          </Text>
          <Icon
            name="close"
            onPress={() => {
              refRBSheet.current.close();
            }}
          />
        </View>
        <Dropdown
          style={[styles.dropdown]}
          placeholderStyle={styles.placeholderStyle}
          selectedStyle={{
            flexDirection: i18n.language === 'en' ? 'row' : 'row-reverse',
          }}
          placeholder={t('selectItem')}
          data={data}
          labelField="label"
          valueField="value"
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
          }}
          value={value}
        />
        {value !== null && (
          <View style={styles.offerProductWrap(i18n.language)}>
            <Image
              style={styles.offerProductImage}
              source={require('../../../assets/images/wheat.png')}
            />
            <View style={styles.offeredPriceCont(i18n.language)}>
              <Text style={styles.offerProductName}>{t('name')}</Text>
              <Text style={styles.descipVal(i18n.language)}>
                {t('desripVal')}
              </Text>
              <Text style={{fontFamily: FontFamily.subTitle, fontSize: 13}}>
                {t('pricee')}
              </Text>
            </View>
          </View>
        )}

        <View style={styles.inputCont}>
          <View style={styles.requiredQuanCont(i18n.language)}>
            <Text style={styles.reqQaunt(i18n.language)}>
              {t('requiredRs')}
            </Text>
            <TextInput placeholder="Kg" style={styles.input(i18n.language)} />
          </View>
          <View style={styles.requiredQuanCont(i18n.language)}>
            <Text style={styles.reqQaunt(i18n.language)}>
              {t('requiredKg')}
            </Text>
            <TextInput placeholder="Rs" style={styles.input(i18n.language)} />
          </View>
        </View>
        <View style={{width: '95%', alignSelf: 'center'}}>
          <Text style={styles.descipTerms(i18n.language)}>
            {t('describeTerms')}
          </Text>
          <View style={styles.termsCont(termss)}>
            {termss?.map((item, index) => {
              return (
                <View style={styles.termsWrap(i18n.language)}>
                  <View style={styles.textWrap(i18n.language)}>
                    <Text style={{color: Colors.secondary}}>{index + 1} </Text>
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
          backgroundColor={Colors.primary}
          borderColor={Colors.primary}
          round={50}
          title={t('sendOffer')}
          titleColor={'white'}
          style={{marginVertical: 20}}
          onPress={() => {
            refRBSheet.current.close();
            setOfferSet(true);
            setOfferMessage({
              text: 'Sfsdfsdfsd',
              user: {_id: 1},
              createdAt: 'Sat Nov 11 2023 03:03:19 GMT+0500',
              _id: 'd802b71e-2087-4444-8f7b-a58dec',
              offer: true,
            });
            setMessages(previousMessages =>
              GiftedChat.append(previousMessages, {
                text: 'Sfsdfsdfsd',
                user: {_id: 1},
                createdAt: 'Sat Nov 11 2023 03:03:19 GMT+0500',
                _id: 'd802b71e-2087-4444-8f7b-a58dec',
                offer: true,
              }),
            );
          }}
        />
      </View>
    );
  };
  const data = [
    {label: t('wheat'), value: t('wheat')},
    {label: t('cotton'), value: t('cotton')},
    {label: t('rice'), value: t('rice')},
  ];

  const renderSend = props => {
    return (
      <Send {...props}>
        <Image
          source={require('../../../assets/icons/send.png')}
          style={{
            width: 20,
            height: 20,
            resizeMode: 'contain',
            marginRight: 15,
            marginBottom: 10,
          }}
        />
      </Send>
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.topTab(i18n.language)}>
        <View style={styles.topImgCont(i18n.language)}>
          <Icon
            name={i18n.language === 'en' ? 'arrowleft' : 'arrowright'}
            type="ant-design"
            onPress={() => {
              navigation.goBack();
            }}
          />
          <Image source={item.avatar} style={styles.topImage(i18n.language)} />
          <Text style={styles.topName(i18n.language)}>{item.name}</Text>
        </View>
        <Icon
          name="dots-three-vertical"
          type="entypo"
          size={18}
          color={Colors.dark}
        />
      </View>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        alwaysShowSend
        renderUsernameOnMessage
        placeholder={t('messagePlaceHolder')}
        renderBubble={renderBubble}
        user={item}
        isCustomViewBottom
        renderFooter={renderFoot}
        isTyping
        renderAvatar={renderAvatar}
        showAvatarForEveryMessage
        renderSend={renderSend}
      />
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        height={height / 1.055}
        closeOnPressMask={false}
        dragFromTopOnly
        customStyles={{
          container: {
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          },
        }}>
        <RenderOffer />
      </RBSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  topTab: language => {
    return {
      height: 40,
      flexDirection: language === 'en' ? 'row' : 'row-reverse',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '95%',
      alignSelf: 'center',
    };
  },
  topImgCont: language => {
    return {
      flexDirection: language === 'en' ? 'row' : 'row-reverse',
      alignItems: 'center',
      width: '80%',
    };
  },
  topImage: language => {
    return {
      width: 35,
      height: 35,
      borderRadius: 50,
      marginRight: language === 'en' ? 0 : 15,
      marginLeft: language !== 'en' ? 0 : 15,
    };
  },
  topName: language => {
    return {
      ...CustomStyles.heading3,
      marginLeft: 10,
      marginLeft: language !== 'en' ? 0 : 15,
      marginRight: language === 'en' ? 0 : 10,
    };
  },
  messageAvatar: language => {
    return {
      width: 35,
      height: 35,
      borderRadius: 50,
      marginRight: language === 'en' ? 0 : 15,
      marginLeft: language !== 'en' ? 0 : 15,
    };
  },
  bottomCont: {
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: '95%',
    alignSelf: 'center',
    backgroundColor: Colors.grey,
    marginTop: 20,
  },
  topBar: language => {
    return {
      flexDirection: 'row',
      paddingHorizontal: 15,
      alignSelf: 'center',
      height: 50,
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      borderBottomWidth: 0.5,
      borderColor: Colors.dark,
      flexDirection: language === 'en' ? 'row' : 'row-reverse',
    };
  },
  offerProductWrap: language => {
    return {
      width: '95%',
      alignSelf: 'center',
      height: 100,
      borderWidth: 0.5,
      borderColor: Colors.complimantory,
      borderRadius: 10,
      marginTop: 10,
      alignItems: 'center',
      paddingHorizontal: 5,
      justifyContent: 'space-between',
      flexDirection: language === 'en' ? 'row' : 'row-reverse',
    };
  },
  offerProductImage: {
    backgroundColor: Colors.grey,
    width: 90,
    height: 90,
    borderRadius: 5,
    resizeMode: 'contain',
  },
  offeredPriceCont: language => {
    return {
      width: '70%',
      alignItems: language === 'en' ? 'flex-start' : 'flex-end',
    };
  },
  offerProductName: {
    fontFamily: FontFamily.headerSemiBold,
    fontSize: 14,
    color: 'black',
  },
  descipVal: language => {
    return {
      fontFamily: FontFamily.paragraph,
      fontSize: 12,
      color: Colors.complimantory,
      textAlign: language === 'en' ? 'left' : 'right',
    };
  },
  offerProductWithWrap: {
    width: '95%',
    alignSelf: 'center',
    height: 140,
    borderWidth: 0.5,
    borderColor: Colors.complimantory,
    borderRadius: 10,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    justifyContent: 'space-between',
  },
  offerProductWithImage: {
    backgroundColor: Colors.grey,
    width: 90,
    height: 130,
    borderRadius: 5,
    resizeMode: 'contain',
  },
  offerProductWithName: {
    fontFamily: FontFamily.headerSemiBold,
    fontSize: 14,
    color: 'black',
  },
  iconDes: {
    fontFamily: FontFamily.paragraph,
    fontSize: 12,
    color: Colors.complimantory,
  },
  inputCont: {
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: Colors.dark,
    marginTop: 30,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  requiredQuanCont: language => {
    return {
      flexDirection: language === 'en' ? 'row' : 'row-reverse',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 10,
    };
  },
  reqQaunt: language => {
    return {
      fontFamily: FontFamily.title,
      width: '50%',
      textAlign: language === 'en' ? 'left' : 'right',
      color: Colors.secondary,
    };
  },
  input: language => {
    return {
      borderWidth: 0.5,
      height: 35,
      width: '45%',
      borderColor: Colors.complimantory,
      paddingHorizontal: 10,
      textAlign: language === 'en' ? 'left' : 'right',
      color: 'black',
    };
  },
  descipTerms: language => {
    return {
      fontFamily: FontFamily.title,
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
  createOfferWrap: offerSent => {
    return {
      backgroundColor: 'white',
      height: 0,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.5,
      shadowRadius: 2,
      elevation: 2,
      alignItems: 'center',
      justifyContent: 'center',
    };
  },
  createOfferText: {fontFamily: FontFamily.paragraph, color: Colors.dark},
  price: {
    fontFamily: FontFamily.subTitle,
    fontSize: 13,
    color: 'black',
  },
  bubbleText: {
    right: {
      color: 'black',
      fontFamily: FontFamily.paragraph,
      fontSize: 12,
    },
    left: {
      color: 'black',
      fontFamily: FontFamily.paragraph,
      fontSize: 12,
    },
    content: {
      color: 'black',
    },
  },
  bubbleWrapper: {
    left: {
      backgroundColor: 'rgba(160,193,38,0.30)',
    },
    right: {
      backgroundColor: 'rgba(242,153,74,0.30)',
    },
    content: {
      color: 'black',
    },
  },
});
export default ChatScreen;
