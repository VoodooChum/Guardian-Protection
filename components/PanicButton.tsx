import * as React from 'react';
import { Text, View, TouchableOpacity, Button } from 'react-native';
import { Camera, Permissions } from 'expo';

console.log(Camera);
class PanicButton extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      recording: false,
      processing: false,
    }
  }
  render(){
    return (
      <Button title='PANIC!' onPress={() => console.log('yeeeeee')}/>
    )
  }
}
export default PanicButton;