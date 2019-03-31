import * as React from 'react';
import { Text, View, TouchableOpacity, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { createStackNavigator, createAppContainer, withNavigation } from 'react-navigation';
import t from 'tcomb-form-native';
import {Location, Constants} from 'expo'
const { API_HOST } = Constants.manifest.extra;
// const API_HOST = 'http://60c7f24d.ngrok.io';
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
    this.onPressCreateSchedule = this.onPressCreateSchedule.bind(this);
  }
  async onPressCreateSchedule(){
    const value = this.refs.form.getValue();
    try {
      const location = await Location.geocodeAsync(value.address);
      console.log(location);
      console.log(this.props.navigation.state.params.userInfo);
      const body = {
        latitude: location[0].latitude.toString(),
        longitude: location[0].longitude.toString(),
        userId: this.props.navigation.state.params.userInfo.id
      }
      try{
        const addEvent = await axios.post(`${API_HOST}/schedule/create`, body);
        if(addEvent){
          this.props.navigation.navigate('Dashboard', {
              userData: this.props.navigation.state.params.userInfo,
              name: this.props.navigation.state.params.name
          })
        } else {
          console.log(addEvent);
        }
      } catch(e){
        console.log(e.message)
      }
    } catch(e){
      console.log(e.message);
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Form ref="form" type={Schedule} options={options} />
        <TouchableOpacity
        style={styles.button}
        onPress={this.onPressCreateSchedule}
        >
        <Text>Create Event</Text>
        </TouchableOpacity>
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

export default withNavigation(CreateSchedule);