import * as React from 'react';
import {Button, View, Text} from 'react-native';

class LoginView extends React.Component {
  constructor(props: object) {
    super(props);
  };
  
  logSuccess() {
    console.log('WHOO');
  }
  
  render(){
    return (
    <View>
      <Button title='Login w/ Google' type='raised' onPress={this.logSuccess}> Login w/ google</Button>
        <Button title='Sign In' type='raised' onPress={this.props.loginClick}></Button>
    </View>
    )
  }
}
export default LoginView;