import * as React from 'react';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';
import { AppRegistry, Button, View, Image, StyleSheet, TouchableHighlight, Text } from "react-native";
import axios from "axios";
import { withNavigation } from 'react-navigation';
import { Google, Constants } from 'expo';
const { API_HOST } = Constants.manifest.extra;



class ChatView extends React.Component {
  constructor(props: object) {
    super(props);
    
  }

  
  render() {
    let userData = this.props.navigation.state.params.userInfo;
    return (
      <View style={styles.container}>
        {/* display */}
        <Image
          style={{ alignSelf: "center", borderRadius: 20, width: 155, height: 153, marginBottom: 55 }}
          source={{
            uri: `${userData.url_profile_pic}`
          }}
        />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    width: 375,
    marginTop: 0,
    padding: 30,
    borderRadius: 8,
    backgroundColor: "#0078ef"
  },
  buttonText: {
    fontSize: 16,
    color: "white",
    alignSelf: "center"
  },
  button: {
    height: 50,
    backgroundColor: "#006edc",
    borderColor: "#006edc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 150,
    alignSelf: "stretch",
    justifyContent: "center"
  }
});

const AppNavigator = createStackNavigator({
  CreatGroupView: {
    screen: ChatView
  }
});

export default withNavigation(ChatView);