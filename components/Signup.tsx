import * as React from 'react';
import { AppRegistry, Button, View, Image, StyleSheet, TouchableHighlight, Text, ScrollView } from "react-native";
import t from 'tcomb-form-native'; // 0.6.9
import axios from "axios";
import { Google, Constants } from 'expo';
const {API_HOST} = Constants.manifest.extra;


const Form = t.form.Form;


var User = t.struct({
  streetAddress: t.String,
  city: t.String,
  state: t.String,
  zipCode: t.Number,
  safeword: t.String
});

var options = {
  auto: "placeholders",
  returnKeyType: "done"
};



export default class SignupView extends React.Component{
  constructor(props: object) {
    super(props);
  }

  clearForm = () => {
    this.setState({value: null});
  }

  onPressCreateGroup = async () => {
    try {
      // call getValue() to get the values of the form
      let user = this.refs.form.getValue();  
      if (user) { // if validation fails, value will be null
        // let groupStatus = 'create'; // Sets value of groupStatus to create
        console.log(user); // value here is an instance of User 
        // user.email = this.props.email;
        // console.log(this.state); 
      }
      let result = await axios.post(`${API_HOST}/signup`, { "user": user, 'props': this.props })
    } catch (error) {
      console.log(JSON.stringify(error)); 
    }
    this.clearForm();
  } 

  onPressJoinGroup = () => {
    // call getValue() to get the values of the form 
    var value = this.refs.form.getValue();
    if (value) { // if validation fails, value will be null
      this.setState({
        groupStatus: 'join'
      })
      // let groupStatus = 'join'; // Sets value of groupStatus to join
      console.log(value); // value here is an instance of Person
      this.clearForm();
    }
    // call getValue() to get the values of the form 
  }

  
  render() {
    return (
        <View style={styles.container}>
          <ScrollView contentContainerStyle={scroll.contentContainer}>
          {/* display */}
          <Form ref="form" type={User} options={options} />
          <TouchableHighlight
            style={styles.button}
            onPress={this.onPressCreateGroup}
            underlayColor="#99d9f4"
          >
            <Text style={styles.buttonText}>Create New Group</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.button}
            onPress={this.onPressJoinGroup}
            underlayColor="#99d9f4"
          >
            <Text style={styles.buttonText}>Join Existing Group</Text>
          </TouchableHighlight>
        </ScrollView>
          {/* <Text>{this.state.groupStatus}</Text> */}
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
