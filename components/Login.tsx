import * as React from 'react';
import {Button, View, Text} from 'react-native';

class LoginView extends React.Component {
  constructor(props:object){
    super(props);
  }
  logSuccess() {
    console.log('WHOO');
  }
  
  render(){
    return (
    <View>
        <Button color="#006edc" title='Login w/ Google' onPress={this.props.signIn}> Login w/ google</Button>
    </View>
    )
  }
}


export default LoginView;