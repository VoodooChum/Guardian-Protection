import * as React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import LoginView from './components/Login';
import {Google} from 'expo';
import { ANDROID_CLIENT_ID } from 'react-native-dotenv';

 class App extends React.Component {
  constructor(props:object){
    super(props);
    this.state = {
      signedIn: false,
      name: '',
      photoUrl: ''
    }
    this.signIn = this.signIn.bind(this);
  }

  signIn = async () => {
    try{
      const result = await Google.logInAsync({
        androidClientId: ANDROID_CLIENT_ID,
        scopes: ['profile', 'email'],
      });
      if (result.type === 'success') {
        this.setState({
          signedIn: true,
          name: result.user.name,
          photoUrl: result.user.photoUrl
        })
      } else {
        console.log('cancelled');
      }
    } catch(e){
      console.error(e.message);
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <LoginView signIn={this.signIn}/>
      </View>
    );
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

export default App; 