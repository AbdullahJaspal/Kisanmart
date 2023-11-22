import React, {useEffect, useRef} from 'react';
import {Animated, Image, View} from 'react-native';

const Splash = ({navigation}) => {
  const value = useRef(new Animated.Value(0), [0]);
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('OnBoarding');
    }, 2000);
  }, []);
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Image
        source={require('../assets/images/logo.png')}
        style={{width: 200, height: 150, resizeMode: 'contain'}}
      />
    </View>
  );
};

export default Splash;
