import * as React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { ThemeProvider, Button, Icon } from "react-native-elements";
import { createStackNavigator, createAppContainer, withNavigation } from 'react-navigation';
import { MapView, Constants } from 'expo';
const {API_HOST} = Constants.manifest.extra;
// const API_HOST = 'http://60c7f24d.ngrok.io';
class Schedule extends React.Component {
  constructor(props:object){
    super(props);
  }
  componentDidMount(){
    this.getMarkers();
  }
  async getMarkers(){
    try {
      const { data } = await axios.get(`${API_HOST}/schedule/retrieve/${this.props.navigation.state.params.userInfo.id}`);
      console.log(data);
    } catch(e){
      console.log(e);
    }
  }
  render(){
    const memberLocation = this.props.navigation.state.params.location
    return (
        <MapView 
            style={{ flex: 1 }}
            initialRegion={{
            latitude: parseFloat(memberLocation.latitude),
            longitude: parseFloat(memberLocation.longitude),
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
        </MapView>
    )
  }
}
export default withNavigation(Schedule);