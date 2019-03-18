import * as React from 'react';
import { AppRegistry, View, Image, StyleSheet, TouchableHighlight, Text, ScrollView } from "react-native";
import t from 'tcomb-form-native'; // 0.6.9
import axios from "axios";
import { ThemeProvider, Button } from "react-native-elements";
import { Google, Constants } from 'expo';
import { cpus } from 'os';
import { createStackNavigator, createAppContainer, withNavigation } from 'react-navigation';
import AppContainer from '../App'
const {API_HOST} = Constants.manifest.extra;
 

const theme = {
  Button: {
    containerStyle: {
      marginTop: 10
    },
    raised: true,
    color: 'red',
    borderWidth: 3,
    borderRadius: 10
    // color: "#006edc",
  }
};

class DashboardView extends React.Component{
  constructor(props: object) {
    super(props);
    this.state = {
      groups: [] 
    }
  }
   
  componentDidMount = async () => {
    let myGroups = await axios.get(`${API_HOST}/myGroups/${this.props.userData.id}`);
   
    this.setState({ groups: myGroups.data })
    
  }

  clearForm = () => {
    this.setState({value: null});
  }

  onPressCreateGroup = () => {
       // Do whatever you need here to switch to Creating a group View
      console.log('Create Group Button Pressed');
    this.props.navigation.navigate('CreatGroupView', {  
      userInfo: this.props.userData,
    });
  } 

  onPressJoinGroup = () => {
    // Do whatever you need here to switch to Joining a group View
    console.log('Join Group Button Pressed');
    this.props.navigation.navigate('JoinGroup', {
      userInfo: this.props.userData,
    });
  }

  onPressPanic = () => {
    // Do whatever you need here to switch to Joining a group View
    console.log('Panic Button Pressed');
  }
 
  onPressViewGroup1 = () => {
    // Do whatever you need here to switch to Joining a group View
    console.log(`View Group: 1`);
  }
  onPressViewGroup2 = () => {
    // Do whatever you need here to switch to Joining a group View
    // console.log(`View Group: 2`);
    // console.log(this.state.groups);
  }

  
  render() {
    // console.log(this.state.groups); 
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={scroll.contentContainer}>
          <ThemeProvider theme={theme}>
            {
              this.state.groups.map((group) => <Button
                group={group.id}
                title={group.name}
                key={group.id}
                onPress={this.onPressViewGroup2}
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
              onPress={this.props.startPanic}
              underlayColor="#99d9f4"
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
    justifyContent: "center",
    width: 300,
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
  }
});

export default withNavigation(DashboardView);