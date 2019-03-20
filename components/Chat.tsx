import * as React from 'react';
import { AppRegistry, Button, View, Image, StyleSheet, TouchableHighlight, Text, ImageBackground } from "react-native";
import axios from "axios";
import { withNavigation } from 'react-navigation';
import { Google, Constants } from 'expo';
import { GiftedChat } from "react-native-gifted-chat";
import { ChatManager, TokenProvider } from "@pusher/chatkit-client";
const { API_HOST, PUSHER_INSTANCE_LOCATION, TOKEN_PROVIDER_ENDPOINT } = Constants.manifest.extra;

const CHATKIT_TOKEN_PROVIDER_ENDPOINT = TOKEN_PROVIDER_ENDPOINT;
const CHATKIT_INSTANCE_LOCATOR = PUSHER_INSTANCE_LOCATION;
const CHATKIT_ROOM_ID = "19394009";
// const CHATKIT_USER_NAME = "brian@aquavisionnola.com";

class ChatView extends React.Component {
  constructor(props: object) {
    super(props);
    this.state = {
      messages: [],
    }
    this.CHATKIT_USER_NAME = props.navigation.state.params.userInfo.userInfo.email;
    this.avitor = props.navigation.state.params.userInfo.userInfo.url_profile_pic;
    console.log(props.navigation.state.params.userInfo.userInfo);

  }
  // state = {
  //   messages: [],
  //   CHATKIT_USER_NAME: props.navigation.state.params.userInfo.email
  // };

  componentDidMount() {
    const tokenProvider = new TokenProvider({
      url: CHATKIT_TOKEN_PROVIDER_ENDPOINT,
    });


    const chatManager = new ChatManager({
      instanceLocator: CHATKIT_INSTANCE_LOCATOR,
      userId: this.CHATKIT_USER_NAME,
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
      }).then()
      .catch(err => {
        console.log(err);
      });
  }

  onReceive = data => {
    const { id, senderId, text, createdAt, avatarUrl } = data;
    const incomingMessage = {
      _id: id,
      text: text,
      createdAt: new Date(createdAt),
      user: {
        _id: senderId,
        name: senderId,
        avatarUrl: avatarUrl
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
      <ImageBackground
        source={{
          uri:
            "https://lh3.googleusercontent.com/UBU_NdCOW0iaVeRmiQmiF6tt5azKKwpSagJWTDWtEi1JXx15TC5AwpkTQ1aC8sqvNPCXPUqPHqcDQpGaXFwjNpKzPgqvdqYxhnEOg-X9635qoNP8S9G9-1jEc35cQ5KF4U6_Z2az9GXYhEBcO2KhBwecqBGkyw7Vcr-R19j48RdqPZjrJtFlwqkMnYytw3_0KTHt7YVr52TLv_f4SrYXB69C68WAXNFPxl-fV1B4y80fUSw3lWyJRCbrWc8fFT53yv4SxaEaDIk-cssp5X3gL2ynfOLIm09DWADiNivNbaVdKEoTfi1DRoY2qFAZDEae-jTl236Pj6W8gSHoMHAEffc_xIg7fFuVXvLQVk4ye142IJitH6RtCcUTKA0AzZY2mXijF2ZfwCX6UJWy77hnmmWOhkhWTZKoN9czQfVP7uizAgM-aGmx3Yu0oHWXOrZ1j_d5eI_p1OxsOvUBOIL5Lo7-fCAcfCiDrGbiUMusvxh0xDWqyS-TdxVZ9G4MmXw3d3MkAQoVKUtN3YWJMnQsyJeIHNDRxXKUTbQEpjaYdB4EQAO1wgfiXv1gPBZqoy7rHP12BvpgKb1-vXlVIBJvbZCr1HN5v76DQX0h1a4qfCyXgCtlMqO0r8XgM2LCh145waCKYWZtH0XIxU0Z1h2aSncmHPbpMXUCRTZ-hK3Z7P-txy1m3ZppPLI3TSWzJdODDc4dhEc6TdHBC3c8-aEm8EA7=w258-h304-no"
        }}
        style={{ width: 78, height: 91, alignSelf: 'center' }}
      />
      <GiftedChat messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          id: this.CHATKIT_USER_NAME
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

export default withNavigation(ChatView);