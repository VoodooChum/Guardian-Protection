import * as React from 'react';
import {View, Text} from 'react-native';
import { ThemeProvider, Button } from "react-native-elements";

const theme = {
  Button: {
    containerStyle: {
      marginTop: 100,
      marginBottom: 150,
    },
    raised: true,
    color: "#006edc",
  }
};

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
        <ThemeProvider theme={theme}>
          <Button title="Google Login"
            onPress={this.props.signIn}
          />
        </ThemeProvider>
      </View>
    );
  }
}


export default LoginView;