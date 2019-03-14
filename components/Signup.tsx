import * as React from 'react';
import { Button, View, Image } from 'react-native';

class SignupView extends React.Component {
  logSuccess() {
    console.log('SignUP');
  }
  render() {
    return (
      <View>
        <Button title='Sign In Success' onPress={this.logSuccess}>Sign In Here</Button>
      </View>
    )
  }
}
export default SignupView;