import * as React from 'react';
import { AppRegistry, View, Image, StyleSheet, TouchableHighlight, Text, ScrollView, ActivityIndicator } from "react-native";
import t from 'tcomb-form-native'; // 0.6.9
import axios from "axios";
import { ThemeProvider, Button } from "react-native-elements";
import { Google, Constants, Location } from 'expo';
import { cpus } from 'os';
import { createStackNavigator, createAppContainer, withNavigation } from 'react-navigation';
import AppContainer from '../App'
import { Permissions, Notifications } from 'expo';
const {API_HOST} = Constants.manifest.extra;
const PUSH_ENDPOINT = `${API_HOST}/push-token`;

const theme = {
  Button: {
    containerStyle: {
      marginTop: 10
    },
    raised: true,
    borderWidth: 3,
    borderRadius: 10,
  }
};

class DashboardView extends React.Component{
  constructor(props: object) {
    super(props);
    this.state = {
      groups: [],
      photoUrl: 'a',
      name: '',
      isLoading: true,
    }
    this._isMounted = false;
    this.getGroupsAsnyc = this.getGroupsAsnyc.bind(this);
    // this.sendLocationAsync = this.sendLocationAsync.bind(this);
    this.registerForPushNotificationsAsync = this.registerForPushNotificationsAsync.bind(this);
  }

  
  componentDidMount = () => {
    this._isMounted = true;
    this.setState({ name: this.props.name }) 
    this.getGroupsAsnyc();
    this.registerForPushNotificationsAsync();
    // this.sendLocationAsync();
    setTimeout(this.getGroupsAsnyc, 3000) 
  };

  // sendLocationAsync = async () => {
  //   let location = await Location.getCurrentPositionAsync({});
  //   let coords = location.coords
  //   let sentLoc = await axios.post(`${API_HOST}/locations/create`, { "latitude": coords.latitude, "longitude": coords.longitude, "userId": this.props.userData.id})
  // }

  registerForPushNotificationsAsync = async () => {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return;
  }

  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync();

  // POST the token to your backend server from where you can retrieve it to send push notifications.
    let res = await axios.post(`${API_HOST}/push/token`, {token})
  // return fetch(PUSH_ENDPOINT, {
  //   method: 'POST',
  //   headers: {
  //     Accept: 'application/json',
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     token: {
  //       value: token,
  //     },
  //     user: {
  //       username: this.props.userData.email,
  //     },
  //   }),
  // });
}
  
  getGroupsAsnyc = async () => {
    if (this.props.userData){
      this._isMounted && this.setState({ photoUrl: this.props.userData.url_profile_pic, name: this.props.name })
      let myGroups = await axios.get(`${API_HOST}/myGroups/${this.props.userData.id}`);
      if(myGroups){
        this.setState({ groups: myGroups.data, isLoading: false }) 
      }
    } else {
      let user = this.props.navigation.state.params.userData;
      let name = this.props.navigation.state.params.name;
      this.props.name = name;
      this.setState({ photoUrl: user.url_profile_pic, name: name  })
      let newGroups = await axios.get(`${API_HOST}/myGroups/${user.id}`);
      this.setState({ groups: newGroups.data, isLoading: false })
    }
    
  }
  
  componentWillUnmount = () => {
    this._isMounted = false;
  }

  



  clearForm = () => {
    this.setState({value: null});
  }

  onPressCreateGroup = () => {
       // Do whatever you need here to switch to Creating a group View
      console.log('Create Group Button Pressed');
    
    if (this.props.userData) {
      this.props.navigation.navigate('CreatGroupView', {
        userInfo: this.props.userData,
        name: this.props.name,
        getGroupsAsnyc: this.getGroupsAsnyc,
        location: this.props.location
      });
    } else {
      this.props.navigation.navigate('CreatGroupView', {
        userInfo: this.props.navigation.state.params.userData,
        name: this.props.navigation.state.params.name,
        getGroupsAsnyc: this.getGroupsAsnyc,
        location: this.props.navigation.state.params.location
      });
    }
  } 

  onPressJoinGroup = () => {
    // Do whatever you need here to switch to Joining a group View
    console.log('Join Group Button Pressed');
    if(this.props.userData){
      this.props.navigation.navigate('JoinGroup', {
        userInfo: this.props.userData,
        name: this.props.name,
        getGroupsAsnyc: this.getGroupsAsnyc,
        location: this.props.location
      });
    } else {
      this.props.navigation.navigate('JoinGroup', {
        userInfo: this.props.navigation.state.params.userData,
        name: this.props.navigation.state.params.name,
        getGroupsAsnyc: this.getGroupsAsnyc,
        location: this.props.navigation.state.params.location
      });
    }
    
  }

  onPressPanic = () => {
    // Do whatever you need here to switch to Joining a group View
    console.log('Panic Button Pressed');
    this.props.navigation.navigate('Panic', {
      hasAudioPermission: this.props.hasAudioPermission,
      hasCameraPermission: this.props.hasCameraPermission,
      userId: this.props.userData.id
    });
  }
 
  onPressViewGroup = (name: string) => {
    // Do whatever you need here to switch to Joining a group View
    console.log(name);
    if(this.props.userData){
      this.props.navigation.navigate('GroupView', {
        hasAudioPermission: this.props.hasAudioPermission,
        hasCameraPermission: this.props.hasCameraPermission,
        userInfo: this.props.userData,
        name: name,
        location: this.props.location
      });
    } else {
      this.props.navigation.navigate('GroupView', { 
        hasAudioPermission: this.props.navigation.state.params.hasAudioPermission,
        hasCameraPermission: this.props.navigation.state.params.hasCameraPermission,
        userInfo: this.props.navigation.state.params.userData,
        name: name,
        location: this.props.navigation.state.params.location
      });
    }
    
  }
  

  
  render() {
    const { isLoading, name } = this.state;
     
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={scroll.contentContainer}>
          {isLoading && (
            <ActivityIndicator
              style={{ height: 80 }}
              color="#C00"
              size="large"
            />
          )} 
          <Image
            style={{ borderRadius: 20, width: 155, height: 153, alignSelf: 'center', marginTop: 15 }}
            source={{
              uri: `${this.state.photoUrl}`
            }}
          />
            <Text style={{ alignSelf: 'center', marginBottom: 5, color: 'white' }}
            >{this.state.name}</Text> 
            <Text style={{ alignSelf: 'center', marginBottom: 5, color: 'white' }}
            >{this.props.name}</Text> 
          <ThemeProvider theme={theme}>
            {
              this.state.groups.map((group) => <Button
                group={group.id}
                title={group.name}
                key={group.id}
                onPress={() => this.onPressViewGroup(group.name)}
              />)
            }
          </ThemeProvider>
          <ThemeProvider theme={theme}>
            <Button
              title="Create Group"
              onPress={this.onPressCreateGroup}
            /> 
          </ThemeProvider>
          <ThemeProvider theme={theme}>
            <Button
              title="Join Group"
              onPress={this.onPressJoinGroup}
            />
          </ThemeProvider>
            <TouchableHighlight
              style={styles.button}
            onPress={this.onPressPanic}
            >
              <Text style={styles.buttonText}>Panic</Text>
            </TouchableHighlight>
        </ScrollView>
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
    width: 375,
    paddingTop: 30,
    padding: 30,
    borderRadius: 14,
    backgroundColor: "#0078ef"
  },
  buttonText: {
    fontSize: 20,
    color: "white",
    alignSelf: "center"
  },
  button: {
    height: 50,
    backgroundColor: "#800000",
    borderColor: "#800000",
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 10,
    alignSelf: "stretch",
    justifyContent: "center"
  },
  
  image: {
    width: 80,
    height: 80,
    paddingTop: 80,
    justifyContent: "center"
  }
});

export default withNavigation(DashboardView);