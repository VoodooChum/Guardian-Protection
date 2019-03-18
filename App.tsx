import * as React from 'react';
// import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import LoginView from './components/Login';
import {Google, Constants, Permissions} from 'expo';
import axios from 'axios';
import { ANDROID_CLIENT_ID, IOS_CLIENT_ID } from 'react-native-dotenv';
import Signup from "./components/Signup";
import CreateGroupView from "./components/CreateGroup";
import JoinGroupView from "./components/JoinGroup";
import { createStackNavigator, createAppContainer } from 'react-navigation';
import PanicButton from './components/PanicButton';
import DashboardView from "./components/Dashboard";
import GroupView from "./components/Group";

// import console = require('console');
const {API_HOST} = Constants.manifest.extra;



 class App extends React.Component {
  constructor(props:object){
    super(props);
    this.state = {
      signedIn: false,
      name: '',
      photoUrl: 'a', 
      email: '',
      accessToken: '',
      accessTokenExpirationDate: '',
      panic: false,
      existingUser: false,
      hasAudioPermission: null,
      hasCameraPermission: null,
    }
    this.signInAsync = this.signInAsync.bind(this);
    this.handleGoogleSession = this.handleGoogleSession.bind(this);
    this.startPanic = this.startPanic.bind(this);
  }
  async componentDidMount(){
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    const audioStatus = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    this.setState({
      hasAudioPermission: audioStatus.status === 'granted',
      hasCameraPermission: status === 'granted'
    });
  }

  handleGoogleSession = () => {
    const date = Date.parse(this.state.accessTokenExpirationDate);
    const newDate = new Date();
    console.log(date, newDate.getTime());
    if (date < newDate.getTime()) {
      this.setState({
        signedIn: false
      })
    }
  }

  startPanic() {
    this.setState({
      panic: true
    });
  };
  signInAsync = async () => {
    try {  
      const result = await Google.logInAsync({
        clientId: ANDROID_CLIENT_ID,
        scopes: ['profile', 'email'],
      });
      if (result.type === 'success') {
        // console.log(result);
      var output;
      try {
        const params = {
          "username": result.user.email,
          "password": result.user.name
        }
       let sentUser = await axios.post(`${API_HOST}/login`, params)
        // console.log(groups);
        this.setState({existingUser: sentUser.data}) 
      } catch(e){   
        console.log(e.message) 
      } 
      this.setState({
        signedIn: true,
        name: result.user.name,
        photoUrl: result.user.photoUrl,
        email: result.user.email,
        accessTokenExpirationDate: result.accessTokenExpirationDate,
        accessToken: result.accessToken,
      })
    } else { 
      console.log('cancelled');
    }
  } catch(e){
    console.error(e.message);
  }
}

  render() {
    if (typeof this.state.existingUser === 'object') { 
      return (
        <View style={styles.container}>
           <AppContainer />
          <Image
            style={{ borderRadius: 20, width: 155, height: 153 }}
            source={{
              uri: `${this.state.photoUrl}`
            }}
          />
          <Text>{this.state.name}</Text>
          <DashboardView userData={this.state.existingUser}></DashboardView>
          {/* <CreateGroupView userData={this.state.existingUser}/>   */}
          </View >
      ); 
  }
    if (this.state.signedIn === true && this.state.existingUser === false) {
      this.handleGoogleSession();
      return (
          <View style={styles.container}>
            <Image
              style={{ borderRadius: 20, width: 155, height: 153 }}
              source={{
                uri: `${this.state.photoUrl}`
              }}
            />
            <Text>{this.state.name}</Text>
            <Signup
              url_profile_pic={this.state.photoUrl}
              email={this.state.email}
              name_first={this.state.name.split(" ")[0]}
              name_last={this.state.name.split(" ")[1]}
            />
          </View>
      );
    } else if(this.state.signedIn === false && this.state.panic === false) {
      return (
          <View style={styles.container}>
              <Image 
              style={{ width: 155, height: 182 }}
              source={{
                uri:
                  "https://lh3.googleusercontent.com/UBU_NdCOW0iaVeRmiQmiF6tt5azKKwpSagJWTDWtEi1JXx15TC5AwpkTQ1aC8sqvNPCXPUqPHqcDQpGaXFwjNpKzPgqvdqYxhnEOg-X9635qoNP8S9G9-1jEc35cQ5KF4U6_Z2az9GXYhEBcO2KhBwecqBGkyw7Vcr-R19j48RdqPZjrJtFlwqkMnYytw3_0KTHt7YVr52TLv_f4SrYXB69C68WAXNFPxl-fV1B4y80fUSw3lWyJRCbrWc8fFT53yv4SxaEaDIk-cssp5X3gL2ynfOLIm09DWADiNivNbaVdKEoTfi1DRoY2qFAZDEae-jTl236Pj6W8gSHoMHAEffc_xIg7fFuVXvLQVk4ye142IJitH6RtCcUTKA0AzZY2mXijF2ZfwCX6UJWy77hnmmWOhkhWTZKoN9czQfVP7uizAgM-aGmx3Yu0oHWXOrZ1j_d5eI_p1OxsOvUBOIL5Lo7-fCAcfCiDrGbiUMusvxh0xDWqyS-TdxVZ9G4MmXw3d3MkAQoVKUtN3YWJMnQsyJeIHNDRxXKUTbQEpjaYdB4EQAO1wgfiXv1gPBZqoy7rHP12BvpgKb1-vXlVIBJvbZCr1HN5v76DQX0h1a4qfCyXgCtlMqO0r8XgM2LCh145waCKYWZtH0XIxU0Z1h2aSncmHPbpMXUCRTZ-hK3Z7P-txy1m3ZppPLI3TSWzJdODDc4dhEc6TdHBC3c8-aEm8EA7=w258-h304-no"
              }}
            />
            <Text>The Premier App in Family Protection!</Text>
            <LoginView signIn={this.signInAsync} />
          </View>
      );
    } else {
      return (
        <PanicButton hasAudioPermission={this.state.hasAudioPermission}
          hasCameraPermission={this.state.hasCameraPermission} 
          userId={this.state.existingUser.id}
          />
      )
    }
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0078ef',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const AppNavigator = createStackNavigator({
  Home: {
    screen: App, 
     navigationOptions: {
      header: null,
    } },
  Signup: {
    screen: Signup 
  },
  CreatGroupView: {
    screen: CreateGroupView
  }, 
  Dashboard: {
    screen: DashboardView 
  }, 
  JoinGroup: {
    screen: JoinGroupView
  }
}, );

const AppContainer = createAppContainer(AppNavigator);
export default App;
export default AppContainer