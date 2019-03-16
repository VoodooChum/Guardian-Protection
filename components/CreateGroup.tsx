import * as React from 'react';
import { AppRegistry, Button, View, Image, StyleSheet, TouchableHighlight, Text } from "react-native";
import t from 'tcomb-form-native'; // 0.6.9
import axios from "axios";
import { Google, Constants } from 'expo';
const { API_HOST } = Constants.manifest.extra;


const Form = t.form.Form;

var Group = t.struct({
  name: t.String,
  passcode: t.String,
});

var options = {
  auto: "placeholders"
};

export default class CreatGroupView extends React.Component {
  constructor(props: object) {
    super(props);
  }

  clearForm = () => {
    this.setState({value: null});
  }

  onPressCreateGroup = async () => {
    try {
  // call getValue() to get the values of the form
  let group = this.refs.form.getValue();
  if (group) { // if validation fails, value will be null
    // let groupStatus = 'create'; // Sets value of groupStatus to create
    console.log(group); // value here is an instance of group 
    // console.log(this.state);
  }
      let result = await axios.post(`${API_HOST}/createGroup`, { "group": group, "userData": this.props.userData})
  } catch(error) {
    console.log(JSON.stringify(error));
  }
  this.clearForm();
}

 

  
  render() {
    return (
      <View style={styles.container}>
        {/* display */}
        <Form ref="form" type={Group} options={options} />
        <TouchableHighlight
          style={styles.button}
          onPress={this.onPressCreateGroup}
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
