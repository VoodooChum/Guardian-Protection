import * as React from 'react';
import { Text, View, TouchableOpacity, Button, Modal, Alert, TouchableHighlight } from 'react-native';
import { Camera, FileSystem, Constants } from 'expo';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Overlay, Input} from 'react-native-elements';
import { createStackNavigator, createAppContainer, withNavigation } from 'react-navigation';
const { API_HOST } = Constants.manifest.extra;
// const API_HOST = 'http://6ea8cf99.ngrok.io'
class PanicButton extends React.Component {
  constructor(props:object){
    super(props);
    this.state = {
      type: Camera.Constants.Type.front,
      recording: false,
      modalVisible: true,
      status: 'frown-o',
      passcode: ''
    }
    this.camera = null;
    this.record = this.record.bind(this);
  }

  
  async componentDidMount() {
    const { userId } = this.props.navigation.state.params;
    setTimeout(this.record, 1000);
    let update = await axios.patch(`${API_HOST}/panic/${userId}`, {"is_panic": true});
  }

  setModalVisible = (visible: boolean) => {
    this.setState({ modalVisible: visible });
    
  }

  exitPanic = () => {
    let passcode = this.props.navigation.state.params.userData.safeword;
    if (this.state.passcode === passcode) {
      this.props.navigation.navigate('Dashboard', {
        userData: this.props.navigation.state.params.userData,
        name: this.props.navigation.state.params.name
      });
      this.props.navigation.state.params.getGroupsAsnyc();
    }
  }
 
  async record() {
    const { camera } = this;
  if (camera) {
    console.log('Camera does exist');
    try {
      const { uri } = await camera.recordAsync({
        maxDuration: 10,
      });
      const file = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingTypes.Base64
      }) 
      console.log('GOT THE FILE', file.slice(0, 10), file.length);
      try {
        console.log('We should send the request');
        const { data } = await axios.post('https://api.cloudinary.com/v1_1/banditation/video/upload', 
          {
            "upload_preset": "lk917uwv",
            "file": "data:image/jpeg;base64," + file
          }
          )
          console.log(data.url);
          try {
            const { userId } = this.props.navigation.state.params;
            const body = {
              url_video: data.url,
              id_user: userId
            };
            const uploadToServer = await axios.post(API_HOST + '/upload', body);
            console.log(uploadToServer.status);
            axios.post(API_HOST + '/api/messages', body);
          } catch(e){
            console.log(e);
          }
          } catch(e){
            console.log(e);
          }
    } catch (e) {
      console.log(e);
    }
  }
}
  render() {
    const { hasCameraPermission, hasAudioPermission } = this.props.navigation.state.params;
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
          <TouchableHighlight
            style={{
              marginBottom: 50,
            }}
            onPress={() => {
              this.setModalVisible(true);
            }}>
            <Text>Show Modal</Text>
          </TouchableHighlight>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}>
            <View style={{
              marginTop: 375, 
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
              }}>
              <View style={{
                width: 300,
                height: 300
              }}>
                <Text style={{
                  color: 'white',
                }}>You are engaged in Panic Mode. Enter Your Passcode to Exit</Text>
                <Input
                  placeholder='Enter Passcode'
                  style={{
                    color: 'white',
                  }}
                  onChangeText={(text) => this.setState({ passcode: text })}
                  leftIcon={
                    <Icon
                      
                      name='lock'
                      size={24}
                      color='black'
                    />
                  }
                  rightIcon={
                    <Icon
                      onPress={this.exitPanic}
                      name={this.state.status}
                      size={24}
                      color='black'
                    />
                  }
                />
                <Button title="Submit" onPress={() => {this.exitPanic(); this.setModalVisible(!this.state.modalVisible)}}></Button>
                <TouchableHighlight
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}>
                  <Text>Hide Modal</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>
          
        </View>
      );
    }
  }
}

export default withNavigation(PanicButton);