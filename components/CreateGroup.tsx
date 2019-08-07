import * as React from 'react';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';
import { AppRegistry, Button, View, Image, StyleSheet, TouchableHighlight, Text } from "react-native";
import t from 'tcomb-form-native'; // 0.6.9
import axios from "axios";
import { withNavigation } from 'react-navigation';
import { Google, Constants } from 'expo';
const { API_HOST } = Constants.manifest.extra;
import Toast, { DURATION } from 'react-native-easy-toast'
// const API_HOST = 'http://6ea8cf99.ngrok.io'

const Form = t.form.Form;

var Group = t.struct({
  name: t.String,
  passcode: t.String,
});

var options = {
  auto: "placeholders"
};

class CreatGroupView extends React.Component {
  constructor(props: object) {
    super(props);
    
  }

  clearForm = () => {
    this.setState({value: null});
  }

  onPressCreateGroup = async () => {
    let group = this.refs.form.getValue();
    if (group && group.name !== '' && group.passcode !== '') {
    try {
  // call getValue() to get the values of the form
     
      // if validation fails, value will be null
    // let groupStatus = 'create'; // Sets value of groupStatus to create
    console.log(group); // value here is an instance of group 
    // console.log(this.state);
  
      let userData = this.props.navigation.state.params.userInfo;
      let result = await axios.post(`${API_HOST}/createGroup`, { "group": group, "userData": userData})
      
  } catch(error) {
    console.log(JSON.stringify(error)); 
  }
}
   else {
      this.refs.toast.show('You have to enter a group name & passcode');
    }
  this.clearForm();
}

switchViewAndCreateGroup = () => {
  this.onPressCreateGroup();
  let group = this.refs.form.getValue();
  if (group && group.name !== '' && group.passcode !== '') {
  this.props.navigation.navigate('Dashboard', {
    userData: this.props.navigation.state.params.userInfo, 
    name: this.props.navigation.state.params.name
  });
  this.props.navigation.state.params.getGroupsAsnyc();
  } else {
    this.refs.toast.show('You have to enter a group name & passcode', 5000);
  }
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
        <Toast ref="toast" />
        <Form ref="form" type={Group} options={options} />
        <TouchableHighlight
          style={styles.button}
          onPress={this.switchViewAndCreateGroup} 
          underlayColor="#99d9f4"
        >
          <Text style={styles.buttonText}>Save and Create</Text>
        </TouchableHighlight>

      </View>
    );
  }
}

var styles = StyleSheet.create({
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
    screen: CreatGroupView
  }
});

export default withNavigation(CreatGroupView);