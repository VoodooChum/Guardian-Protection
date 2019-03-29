import * as React from 'react';
import { Text, View, TouchableOpacity, Button } from 'react-native';
import axios from 'axios';
import { createStackNavigator, createAppContainer, withNavigation } from 'react-navigation';
import t from 'tcomb-form-native';
const Form = t.form.Form;
const options = {
  auto: "placeholders",
  returnKeyType: "done"
};
const Schedule = t.struct({
  address: t.String
});
class CreateSchedule extends React.Component {
  constructor(props: object) {
    super(props);
  }
  onPressCreateSchedule(){

  }
  render() {
    return (
      <View>
        <Form ref="form" type={Schedule} options={options} />
        <TouchableOpacity
        style={styles.button}
        onPress={this.onPressCreateSchedule}
        ></TouchableOpacity>
      </View>
    )
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

export default CreateSchedule;