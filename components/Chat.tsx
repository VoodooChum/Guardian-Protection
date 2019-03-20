import * as React from 'react';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';
import { AppRegistry, Button, View, Image, StyleSheet, TouchableHighlight, Text } from "react-native";
import axios from "axios";
import { withNavigation } from 'react-navigation';
import { Google, Constants } from 'expo';
import { GiftedChat } from "react-native-gifted-chat";
import { ChatManager, TokenProvider } from "@pusher/chatkit-client";
const { API_HOST } = Constants.manifest.extra;

const CHATKIT_TOKEN_PROVIDER_ENDPOINT = "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/794b04ea-11ae-4e80-aafc-7c3effbe4e31/token";
const CHATKIT_INSTANCE_LOCATOR = "v1:us1:794b04ea-11ae-4e80-aafc-7c3effbe4e31";
const CHATKIT_ROOM_ID = '19393961';
const CHATKIT_USER_NAME = "voodoochum@live.com";

export default class ChatView extends React.Component {
  state = {
    messages: []
  };

  componentDidMount() {
    const tokenProvider = new TokenProvider({
      url: CHATKIT_TOKEN_PROVIDER_ENDPOINT,
    });

    const chatManager = new ChatManager({
      instanceLocator: CHATKIT_INSTANCE_LOCATOR,
      userId: CHATKIT_USER_NAME,
      tokenProvider: tokenProvider,
    });

    chatManager.connect()
      .then(currentUser => {
        this.currentUser = currentUser;
        this.currentUser.subscribeToRoom({
          roomId: CHATKIT_ROOM_ID,
          hooks: {
            onMessage: this.onReceive,
          }
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  onReceive = data => {
    const { id, senderId, text, createdAt } = data;
    const incomingMessage = {
      _id: id,
      text: text,
      createdAt: new Date(createdAt),
      user: {
        _id: senderId,
        name: senderId,
        avatar:
          "https://avatars1.githubusercontent.com/u/39815179?s=460&v=4"
      }
    };
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, incomingMessage),
    }));
  };

  onSend = (messages = []) => {
    messages.forEach(message => {
      this.currentUser
        .sendMessage({
          text: message.text,
          roomId: CHATKIT_ROOM_ID,
        })
        .then(() => { })
        .catch(err => {
          console.log(err);
        });
    });
  };

  
  render() {
    return <View style={styles.container}>
        <GiftedChat messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
        id: CHATKIT_USER_NAME
      }} />
      </View>
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

// const AppNavigator = createStackNavigator({
//   CreatGroupView: {
//     screen: ChatView
//   }
// });
