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
import {BottomSheet, ListItem} from '@rneui/themed';
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
      <View
        style={{
          backgroundColor: 'white',
          height: offerSent ? 0 : 40,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.5,
          shadowRadius: 2,
          elevation: 2,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{fontFamily: FontFamily.paragraph, color: Colors.dark}}
          onPress={() => {
            // setBottom(true);
            refRBSheet.current.open();
          }}>
          {t('createOffer')}
        </Text>
      </View>
    );
  };
  const renderBubble = props => {
    console.log('props');
    console.log(props.currentMessage);
    return props.currentMessage.offer ? (
      <View style={styles.offerProductWithWrap}>
        <Image
          style={styles.offerProductWithImage}
          source={require('../../../assets/images/wheat.png')}
        />
        <View style={{width: '70%'}}>
          <Text style={styles.offerProductWithName}>Purify Yellow Wheat</Text>
          <Text
            style={{
              fontFamily: FontFamily.paragraph,
              fontSize: 12,
              color: Colors.complimantory,
            }}>
            Lorem ipsum is text commonly typeface without relying on content.
          </Text>
          <Text style={{fontFamily: FontFamily.subTitle, fontSize: 13}}>
            Price: Rs 5000/40kg
          </Text>
          <Button
            backgroundColor={Colors.primary}
            borderColor={Colors.primary}
            title={'Widthdraw Offer'}
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
        textStyle={{
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
        }}
        wrapperStyle={{
          left: {
            backgroundColor: 'rgba(160,193,38,0.30)',
          },
          right: {
            backgroundColor: 'rgba(242,153,74,0.30)',
          },
          content: {
            color: 'black',
          },
        }}
      />
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
      <View
        style={{
          height: 40,
          flexDirection: i18n.language === 'en' ? 'row' : 'row-reverse',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '95%',
          alignSelf: 'center',
        }}>
        <View
          style={{
            flexDirection: i18n.language === 'en' ? 'row' : 'row-reverse',
            alignItems: 'center',
            width: '80%',
          }}>
          <Icon
            name={i18n.language === 'en' ? 'arrowleft' : 'arrowright'}
            type="ant-design"
            onPress={() => {
              navigation.goBack();
            }}
          />
          <Image
            source={item.avatar}
            style={{
              width: 35,
              height: 35,
              borderRadius: 50,
              marginRight: i18n.language === 'en' ? 0 : 15,
              marginLeft: i18n.language !== 'en' ? 0 : 15,
            }}
          />
          <Text
            style={{
              ...CustomStyles.heading3,
              marginLeft: 10,
              marginLeft: i18n.language !== 'en' ? 0 : 15,
              marginRight: i18n.language === 'en' ? 0 : 10,
            }}>
            {item.name}
          </Text>
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
        messageContainerRef={() => {
          return (
            <Image
              source={item.avatar}
              style={{
                width: 35,
                height: 35,
                borderRadius: 50,
                marginRight: i18n.language === 'en' ? 0 : 15,
                marginLeft: i18n.language !== 'en' ? 0 : 15,
              }}
            />
          );
        }}
        renderAvatar={() => {
          return (
            <Image
              source={item.avatar}
              style={{
                width: 35,
                height: 35,
                borderRadius: 50,
                marginRight: i18n.language === 'en' ? 0 : 15,
                marginLeft: i18n.language !== 'en' ? 0 : 15,
              }}
            />
          );
        }}
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
          wrapper: {
            backgroundColor: 'rgba(0,0,0,0.3)',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
          container: {
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          },
        }}>
        <View
          style={{
            ...styles.topBar,
            flexDirection: i18n.language === 'en' ? 'row' : 'row-reverse',
          }}>
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
            backgroundColor: 'red',
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
          <View
            style={{
              ...styles.offerProductWrap,
              flexDirection: i18n.language === 'en' ? 'row' : 'row-reverse',
            }}>
            <Image
              style={styles.offerProductImage}
              source={require('../../../assets/images/wheat.png')}
            />
            <View
              style={{
                width: '70%',
                alignItems: i18n.language === 'en' ? 'flex-start' : 'flex-end',
              }}>
              <Text style={styles.offerProductName}>{t('name')}</Text>
              <Text
                style={{
                  fontFamily: FontFamily.paragraph,
                  fontSize: 12,
                  color: Colors.complimantory,
                  textAlign: i18n.language === 'en' ? 'left' : 'right',
                }}>
                {t('desripVal')}
              </Text>
              <Text style={{fontFamily: FontFamily.subTitle, fontSize: 13}}>
                {t('pricee')}
              </Text>
            </View>
          </View>
        )}

        <View style={styles.inputCont}>
          <View
            style={{
              flexDirection: i18n.language === 'en' ? 'row' : 'row-reverse',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: FontFamily.title,
                width: '50%',
                textAlign: i18n.language === 'en' ? 'left' : 'right',
              }}>
              {t('requiredRs')}
            </Text>
            <TextInput
              placeholder="Rs"
              style={{
                borderWidth: 0.5,
                height: 35,
                width: '45%',
                borderColor: Colors.complimantory,
                paddingHorizontal: 10,
                textAlign: i18n.language === 'en' ? 'left' : 'right',
              }}
            />
          </View>
          <View
            style={{
              flexDirection: i18n.language === 'en' ? 'row' : 'row-reverse',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: FontFamily.title,
                width: '50%',
                textAlign: i18n.language === 'en' ? 'left' : 'right',
              }}>
              {t('requiredKg')}
            </Text>
            <TextInput
              placeholder="kg"
              style={{
                borderWidth: 0.5,
                textAlign: i18n.language === 'en' ? 'left' : 'right',
                height: 35,
                width: '45%',
                borderColor: Colors.complimantory,
                paddingHorizontal: 10,
              }}
            />
          </View>
        </View>
        <View style={{width: '95%', alignSelf: 'center'}}>
          <Text
            style={{
              fontFamily: FontFamily.title,
              marginVertical: 10,
            }}>
            {t('describeTerms')}
          </Text>
          <View
            style={{
              borderWidth: 1,
              width: '100%',
              borderColor: Colors.complimantory,
              paddingHorizontal: 5,
            }}>
            {termss?.map((item, index) => {
              return (
                <View
                  style={{
                    flexDirection:
                      i18n.language === 'en' ? 'row' : 'row-reverse',
                    alignItems: 'center',
                    width: '100%',
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      flexDirection:
                        i18n.language === 'en' ? 'row' : 'row-reverse',
                      alignItems: 'center',
                      width: '90%',
                    }}>
                    <Text>{index + 1} </Text>
                    <Text
                      style={{
                        fontFamily: FontSize.paragraph,
                        fontSize: FontSize.paragraph,
                        marginVertical: 10,
                        color: Colors.complimantory,
                        textAlign: i18n.language === 'en' ? 'left' : 'right',
                      }}>
                      . {item} .
                    </Text>
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
            <View
              style={{
                flexDirection: i18n.language === 'en' ? 'row' : 'row-reverse',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
              }}>
              <InputField
                placeholder={''}
                height={40}
                on
                onChangeText={setCurretTerm}
                style={{
                  borderRadius: 10,
                  width: '90%',
                  marginTop: 10,
                  height: 50,
                  marginBottom: 10,
                  textAlign: i18n.language === 'en' ? 'left' : 'right',
                }}
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
            setBottom(!bottom);
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
      </RBSheet>
    </View>
  );
};

const styles = StyleSheet.create({
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
  topBar: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignSelf: 'center',
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    borderBottomWidth: 0.5,
    borderColor: Colors.dark,
  },
  offerProductWrap: {
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
  },
  offerProductImage: {
    backgroundColor: Colors.grey,
    width: 90,
    height: 90,
    borderRadius: 5,
    resizeMode: 'contain',
  },
  offerProductName: {fontFamily: FontFamily.headerSemiBold, fontSize: 14},

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
  offerProductWithName: {fontFamily: FontFamily.headerSemiBold, fontSize: 14},
  inputCont: {
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: Colors.dark,
    marginTop: 30,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
});
export default ChatScreen;
