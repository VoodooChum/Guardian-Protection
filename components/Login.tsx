import * as React from 'react';
import {Button, View} from 'react-native';

class LoginView extends React.Component {
  logSuccess() {
    console.log('WHOO');
  }
  render(){
    return (
    <View>
      <Button title='Login w/ Google' onPress={this.logSuccess}> Login w/ google</Button>
    </View>
    )
  }
}
export default LoginView;