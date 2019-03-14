import * as React from 'react';
import { AppRegistry, Button, View, Image, StyleSheet, TouchableHighlight, Text } from "react-native";
import t from 'tcomb-form-native'; // 0.6.9

const Form = t.form.Form;

var User = t.struct({
  streetAddress: t.String,
  city: t.String,
  state: t.String,
  zipCode: t.Number,
  safeword: t.String
});

var options = {
  auto: "placeholders"
};

export default class SignupView extends React.Component {

  clearForm = () => {
    this.setState({value: null});
  }

  onPressCreateGroup = () => {
  // call getValue() to get the values of the form
  var value = this.refs.form.getValue();
  if (value) { // if validation fails, value will be null
    let groupStatus = 'create'; // Sets value of groupStatus to create
    console.log(value, 'groupStatus:', groupStatus); // value here is an instance of User 
    this.clearForm();
  }
}

  onPressJoinGroup = () => {
    // call getValue() to get the values of the form
    var value = this.refs.form.getValue();
    if (value) { // if validation fails, value will be null
      let groupStatus = 'join'; // Sets value of groupStatus to join
      console.log(value, 'groupStatus:', groupStatus); // value here is an instance of Person
      this.clearForm();
    }
  }

  
  render() {
    return (
      <View style={styles.container}>
        {/* display */}
        <Form ref="form" type={User} options={options} />
        <TouchableHighlight
          style={styles.button}
          onPress={this.onPressCreateGroup}
          underlayColor="#99d9f4"
        >
          <Text style={styles.buttonText}>Save and Create New Group</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.button}
          onPress={this.onPressJoinGroup}
          underlayColor="#99d9f4"
        >
          <Text style={styles.buttonText}>Save and Join Existing Group</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    width: 300,
    marginTop: 0,
    padding: 30,
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
