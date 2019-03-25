import * as React from 'react';
import { AppRegistry, ActivityIndicator, View, Image, StyleSheet, TouchableHighlight, Text, ImageBackground } from "react-native";
import axios from "axios";
import { withNavigation } from 'react-navigation';
import { Google, Constants } from 'expo';
import { GiftedChat } from "react-native-gifted-chat";
import { ChatManager, TokenProvider } from "@pusher/chatkit-client";

const { API_HOST, PUSHER_INSTANCE_LOCATION, TOKEN_PROVIDER_ENDPOINT } = Constants.manifest.extra;

const CHATKIT_TOKEN_PROVIDER_ENDPOINT = TOKEN_PROVIDER_ENDPOINT;
const CHATKIT_INSTANCE_LOCATOR = PUSHER_INSTANCE_LOCATION;
// const CHATKIT_ROOM_ID = "19394045";
// const CHATKIT_USER_NAME = "brian@aquavisionnola.com";

 class ChatView extends React.Component {
   constructor(props: object) {
     super(props);
     this.state = {
       messages: [],
       CHATKIT_ROOM_ID: '', 
       isLoading: true
      }
    //  this.CHATKIT_ROOM_ID = props.navigation.
       this.CHATKIT_USER_NAME = props.navigation.state.params.userInfo.userInfo.email;
     this.avitor = props.navigation.state.params.userInfo.userInfo.url_profile_pic;
      console.log(props.navigation.state.params.userInfo.userInfo);
     this._isMounted = false;
    }
 

  componentDidMount = async () => {
    let groupName = this.props.navigation.state.params.name
    this._isMounted = true;
    const tokenProvider = new TokenProvider({
      url: CHATKIT_TOKEN_PROVIDER_ENDPOINT,
    });

    const chatManager = new ChatManager({
      instanceLocator: CHATKIT_INSTANCE_LOCATOR,
      userId: this.CHATKIT_USER_NAME,
      tokenProvider: tokenProvider,
    });
 
    let chatID = await axios.get(`${API_HOST}/chatId/${groupName}`)

    this.setState({ CHATKIT_ROOM_ID: chatID.data.id_chat, isLoading: false})

    chatManager.connect()
      .then(currentUser => {
        this.currentUser = currentUser;
        this.currentUser.subscribeToRoom({
          roomId: this.state.CHATKIT_ROOM_ID,
          hooks: {
            onMessage: this.onReceive,
          }
        });
      }).then()
      .catch(err => {
        console.log(err);
      });
  }

   componentWillUnmount = () => {
     this._isMounted = false;
   }



  onReceive = data => {
    const { id, senderId, text, createdAt, avatar_url } = data;
    const incomingMessage = {
      _id: id,
      text: text,
      createdAt: new Date(createdAt),
      user: {
        _id: senderId,
        name: senderId,
        avatar: avatar_url
      }
    };
    
    this._isMounted && this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, incomingMessage),
    }));
  };

  onSend = (messages = []) => {
    messages.forEach(message => {
      this.currentUser
        .sendMessage({
          text: message.text,
          roomId: this.state.CHATKIT_ROOM_ID,
        })
        .then(() => { })
        .catch(err => {
          console.log(err);
        });
    });
  };


  render() {
    const { isLoading } = this.state;
    return <View style={styles.container}>
      <Text style={{ marginTop: 0, alignSelf: 'center', marginBottom: 5, color: "white" }}>{this.props.navigation.state.params.name}</Text>
      {isLoading && (
        <ActivityIndicator
          style={{ height: 80 }}
          color="#C00"
          size="large"
        />
      )}
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