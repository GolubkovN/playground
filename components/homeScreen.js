import React from "react";
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    Button,
    View,
  } from 'react-native';
  
  import {
    Header,
  } from 'react-native/Libraries/NewAppScreen';
  import CustomModule from '../CustomModule';


  const showRes = async () => {
    CustomModule.dialNumber('0665732763');
  }
  
  const getSum = async () => {
    let s = CustomModule.sum(400, 250, (r)=> {
        alert(r);
      });
  }
  
  const onPress = () => {
    CustomModule.navigateToNative();
  };

export const HomeScreen = ({navigation}) => {
    return (
        <SafeAreaView>
            <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            >
            <Header />
            <View style={styles.button}>
                <Button title="log.d" onPress={getSum}/>  
            </View>
            <View style={styles.button}>
                <Button title="phone" onPress={showRes}/>  
            </View>
            <View style={styles.button}>
                <Button title="nav" onPress={onPress}/>  
            </View>
            <View style={styles.button}>
                <Button title="Camera" onPress={() => navigation.navigate("Camera")}/>  
            </View>
            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    button: {
      marginBottom: 15,
    }
  })