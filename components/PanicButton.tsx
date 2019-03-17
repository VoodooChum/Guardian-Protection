import * as React from 'react';
import { Text, View, TouchableOpacity, Button } from 'react-native';
import { Camera, Permissions, DocumentPicker, MediaLibrary, FileSystem } from 'expo';
import axios from 'axios';

class PanicButton extends React.Component {
  constructor(props:object){
    super(props);
    this.state = {
      hasAudioPermission: null,
      hasCameraPermission: null,
      type: Camera.Constants.Type.front,
      recording: false,
    }
    this.camera = null;
    this.record = this.record.bind(this);
  }
  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    const audioStatus = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    this.setState({
      hasAudioPermission: audioStatus.status === 'granted',
      hasCameraPermission: status === 'granted'
  });
  }

  async record() {
    const { camera } = this;
  if (camera) {
    console.log('Camera does exist');
    try {
      const { uri } = await camera.recordAsync({
        maxDuration: 1,
      });
      const file = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingTypes.Base64
      })
      console.log('GOT THE FILE', file.slice(0, 10), file.length);
          const options = {
            file: "data:image/jpeg;base64," + file,
            upload_preset: "lk917uwv"
          }
          console.log('We should send the request');
          const upload:{data: object} = await axios.post('https://api.cloudinary.com/v2/banditation/video/upload', 
          {
            body:{
              "upload_preset": "lk917uwv",
              "file": "data:image/jpeg;base64," + file
            }
          }
          );
          console.log(upload.data);
    } catch (e) {
      console.log(e);
    }
  }
}
  render() {
    const { hasCameraPermission, hasAudioPermission } = this.state;
    if (hasCameraPermission === null && hasAudioPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false && hasAudioPermission === false) {
      return <Text>No access to camera or audio</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 1 }} type={this.state.type} ref={ref => { this.camera = ref; }} >
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({
                    type: this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                  });
                }}>
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                  {' '}Flip{' '}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={this.record}
              >
              <Text
                  style={{ fontSize: 10, marginBottom: 10, color: 'white' }}>
                  Record
                </Text>
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
  }
}
export default PanicButton;