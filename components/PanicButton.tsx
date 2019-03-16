import * as React from 'react';
import { Text, View, TouchableOpacity, Button } from 'react-native';
import { Camera, Permissions, DocumentPicker, MediaLibrary } from 'expo';

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
      const video = await camera.recordAsync({
        maxDuration: 30,
      });
      console.log(video);
      if (!video.cancelled) {
        const { uri } = video;
        const formData = new FormData();
        formData.append('video',{
          uri: uri,
          name: 'video.mp4',
          type: 'video/mp4'
        });
        const options = {
          method: 'POST',
          body: formData,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          }
        }
        const response = await fetch('localhost:3000/upload', options);
        console.log(response);
      }
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