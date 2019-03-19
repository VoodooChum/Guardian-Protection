import * as React from 'react';
import { AppRegistry, Button, View, Image, StyleSheet, TouchableHighlight, Text } from "react-native";
import t from 'tcomb-form-native'; // 0.6.9
import axios from "axios";
import { withNavigation } from 'react-navigation';
import { Google, Constants } from 'expo';
const { API_HOST } = Constants.manifest.extra;


const Form = t.form.Form;

var Group = t.struct({
  groupName: t.String,
  passcode: t.String,
});

var options = {
  auto: "placeholders"
};

class JoinGroupView extends React.Component {
  constructor(props: object) {
    super(props);
  }

  clearForm = () => {
    this.setState({value: null});
  }

  onPressJoinGroup = async () => {
    try {
  // call getValue() to get the values of the form
  let group = this.refs.form.getValue();
  if (group) { // if validation fails, value will be null
    // let groupStatus = 'create'; // Sets value of groupStatus to create
    console.log(group); // value here is an instance of group 
    // console.log(this.state);
  }
  let userData = this.props.navigation.state.params.userInfo;
  let result = await axios.post(`${API_HOST}/joinGroup`, { "group": group, "user": userData})
  } catch(error) {
    console.log(JSON.stringify(error));
  }
  this.clearForm();
}

  switchViewAndJoinGroup = () => {
    this.onPressJoinGroup()
    this.props.navigation.state.params.getGroupsAsnyc();
    this.props.navigation.navigate('Dashboard', {
      userData: this.props.navigation.state.params.userInfo,
      name: this.props.navigation.state.params.name
    });
  }


  
  render() {
    return (
      <View style={styles.container}>
        {/* display */}
        <Form ref="form" type={Group} options={options} />
        <TouchableHighlight
          style={styles.button}
          onPress={this.switchViewAndJoinGroup}
          underlayColor="#99d9f4"
        >
          <Text style={styles.buttonText}>Join Group</Text>
        </TouchableHighlight>
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
    height: 30,
    backgroundColor: "#006edc",
    borderColor: "#006edc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: "stretch",
    justifyContent: "center"
  }
});

export default withNavigation(JoinGroupView);