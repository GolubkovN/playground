import React from 'react';
import { View, Image } from 'react-native';


export const MaskedViewComponent = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Image style={{width: 300, height: 300}} source={require('../public/msk.png')} />
    </View>
  )
}