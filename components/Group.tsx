import * as React from 'react';
import { View, StyleSheet, TouchableHighlight, Text, ScrollView } from "react-native";
import t from 'tcomb-form-native'; // 0.6.9
import axios from "axios";
import { Card, ThemeProvider, Button, ListItem, Icon, Image} from "react-native-elements";
import { Google, Constants } from 'expo';
import { createStackNavigator, createAppContainer, withNavigation } from 'react-navigation';
import { cpus } from 'os';
const {API_HOST} = Constants.manifest.extra;
const theme = {
  Button: {
    containerStyle: {
      marginTop: 10
    },
    raised: true,
    color: "red",
    borderWidth: 3,
    borderRadius: 10
    // color: "#006edc",
  }
};

class GroupView extends React.Component {
  constructor(props: object) {
    super(props);
    this.state = {
      name: props.navigation.state.params.name,
      members: []
    }
    this._isMounted = false;
    this.onUserPress = this.onUserPress.bind(this);
  }

  componentDidMount = async () => {
    this._isMounted = true;
    if(this.state.name){
      let myMembers = await axios.get(`${API_HOST}/groupMembers/${this.state.name}`)
      this.setState({ members: myMembers.data })
    } else {
      let refreshName = this.props.navigation.state.params.name;
      let myMembers = await axios.get(`${API_HOST}/groupMembers/${refreshName}`)
      this.setState({ members: myMembers.data })
    }
    
  }

  componentWillUnmount = () => {
    this._isMounted = false;
  }
  onUserPress = objects => {
    console.log(objects.nativeEvent.changedTouches);
    let position = objects.nativeEvent.changedTouches[0].pageY;
    let isChat = false;
    let isMap = false;
    if (objects.nativeEvent.changedTouches[0].pageX >= 310) {
      isChat = true;
    }
    if (position <= 478) {
      console.log("Brian: User 1", "Chat: ", isChat);
    } else if (position < 550) {
      console.log("Akin: User 2", "Chat: ", isChat);
    } else {
      console.log("Michael: User 3", "Chat: ", isChat);
    }
    isChat = false;
  };

  onMapView = (username: string, name: string) => {
    this.props.navigation.navigate('MapView', {
      username: username,
      userInfo: this.props.navigation.state.params.userData,
      location: this.props.navigation.state.params.location,
      name: name
    });
  } 

  onPressPanic = () => {
    // Do whatever you need here to switch to Joining a group View
    console.log("Panic Button Pressed");
    this.props.navigation.navigate("Panic", {
      hasAudioPermission: this.props.hasAudioPermission,
      hasCameraPermission: this.props.hasCameraPermission,
      userData: this.props.navigation.state.params.userInfo,
      getGroupsAsnyc: this.props.navigation.state.params.getGroupsAsnyc,
      name: this.props.navigation.state.params.name
    });
  };

  onPressChat = () => {
    this.props.navigation.navigate('ChatView', {
      userInfo: this.props.navigation.state.params,
      name: this.state.name
    });
  }

  render() {
    let userData = this.props.navigation.state.params.userInfo;
    return (
      <View style={styles.container}>
        <Image
          style={{ alignSelf: "center", borderRadius: 20, width: 155, height: 153, marginBottom: 30 }}
          source={{
            uri: `${userData.url_profile_pic}`
          }}
        />
        <Text style={{ alignSelf: 'center', marginBottom: 5, color: 'white' }}
        >{this.props.navigation.state.params.name}</Text> 
        {this.state.members.map((member: object, i: number) => (
          
          <ListItem
            style={styles.user}
            color="#0078ef"
            key={i}
            leftAvatar={{ source: { uri: member.url_profile_pic } }}
            title={`${member.name_first} ${member.name_last}`}
            onPress={() => this.onMapView(member.id, `${member.name_first} ${member.name_last}`)}
          />
        ))}
        <ThemeProvider theme={theme}>
        <TouchableHighlight
          style={styles.buttonChat}
          onPress={this.onPressChat}
        >
          <Text style={styles.chatText}>Chat</Text>
        </TouchableHighlight>
        </ThemeProvider>
        <TouchableHighlight
          style={styles.button}
          onPress={this.onPressPanic}
          // underlayColor="#99d9f4"
        >
          <Text style={styles.buttonText}>Panic</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
const scroll = StyleSheet.create({
  contentContainer: {
    paddingVertical: 20
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // width: 375, removing for auto sizing
    marginTop: 0,
    padding: 30,
    borderRadius: 8,
    backgroundColor: "#0078ef"
  },
  buttonText: {
    fontSize: 20,
    color: "white",
    alignSelf: "center"
  },
  chatText: {
    fontSize: 20,
    color: "black",
    alignSelf: "center"
  },
  button: {
    height: 50,
    backgroundColor: "#800000",
    borderColor: "#800000",
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 10,
    alignSelf: "stretch",
    justifyContent: "center"
  },
  buttonChat: {
    height: 48,
    backgroundColor: "white",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 10,
    alignSelf: "stretch",
    justifyContent: "center"
  },
  user: {
    backgroundColor: "#0078ef",
    padding: 2,
    alignSelf: "stretch"
  },
  name: {
    fontSize: 14,
    color: "white",
    alignSelf: "center"
  },
  image: {
    width: 80,
    height: 80
  }
});

export default withNavigation(GroupView);