import * as React from 'react';
import { Text, View, TouchableOpacity, Button } from 'react-native';
import { Camera, Permissions, DocumentPicker } from 'expo';


console.log(Camera);
class PanicButton extends React.Component {
  constructor(props:object){
    super(props);
    this.state = {
      hasAudioPermission: null,
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
      recording: false,
      image: '',
    }
    this.camera = null;
  }
  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    const audioStatus = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    this.setState({
      hasAudioPermission: audioStatus.status === 'granted',
      hasCameraPermission: status === 'granted'
  });
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
                onPress={ async () => {
                  if(this.camera){
                    console.log('Camera does exist');
                    try {
                      const video = await this.camera.recordAsync({
                        maxDuration: 30,
                      });
                      console.log(video);
                      const result = await DocumentPicker.getDocumentAsync({});
                      if (!result.cancelled) {
                        this.setState({
                          image: result
                        })
                      }
                    } catch(e){
                      console.log(e);
                    }
                  }
                }}
              >
              <Text
                  style={{ fontSize: 30, marginBottom: 10, color: 'white' }}>
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