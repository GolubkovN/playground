import React, {PureComponent} from 'react';
import {StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {RNCamera} from 'react-native-camera';
import {MaskedViewComponent} from './maskedView'

const PendingView = () => (
  <View
    style={{
      backgroundColor: 'transparent',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Text>Waiting</Text>
  </View>
);

export class Camera extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      mask: false
    }
  }


  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
            
          }}
          useNativeZoom={true}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
            console.log(barcodes);
          }}
          
        >

          {({ camera, status, recordAudioPermissionStatus }) => {
            if (status !== 'READY') return <PendingView />;
            return (
              <View style={{justifyContent: 'flex-end', alignItems: 'center', flex: 1}}>
                 {this.state.mask && <MaskedViewComponent />}
                <View style={{flexDirection: 'row'}}>
                  <View style={{ justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => this.takePicture(camera)} style={styles.capture}>
                      <Text style={{ fontSize: 14 }}> SNAP </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{ justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => this.showMask()} style={styles.capture}>
                      <Text style={{ fontSize: 14 }}> MASK </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          }}
        </RNCamera>
      </View>
    );
  }

  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);

      return data;
    }
  };

  showMask() {
    this.setState({
      mask: !this.state.mask
    })
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});