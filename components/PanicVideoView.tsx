import * as React from 'react';
import { View, StyleSheet, TouchableHighlight, Text, ScrollView } from "react-native";
import { Card, ThemeProvider, Button, ListItem, Icon, Image} from "react-native-elements";
import { Google, Constants } from 'expo';
import { createStackNavigator, createAppContainer, withNavigation } from 'react-navigation';
import { cpus } from 'os';
const {API_HOST} = Constants.manifest.extra;

const theme = {
  Button: {
    containerStyle: {
      marginTop: 10
    },
    raised: true,
    color: "red",
    borderWidth: 3,
    borderRadius: 10
    // color: "#006edc",
  }
};

class PanicVideoView extends React.Component {
  constructor(props: object) {
    super(props);
    this.state = {
      name: props.navigation.state.params.name,
      members: []
    }
    this.onUserPress = this.onUserPress.bind(this);
  }

  componentDidMount = async () => {
    
    
  }

  


  

  onPressPanic = () => {
    // Do whatever you need here to switch to Joining a group View
    
  };



  render() {
    let userData = this.props.navigation.state.params.userInfo;
    return (
      <View style={styles.container}>
        <Image
          style={{ alignSelf: "center", borderRadius: 20, width: 155, height: 153, marginBottom: 30 }}
          source={{
            uri: `${userData.url_profile_pic}`
          }}
        />
        <Text style={{ alignSelf: 'center', marginBottom: 5, color: 'white' }}
        >{this.props.navigation.state.params.name}</Text> 
        
        <ThemeProvider theme={theme}>
        
        </TouchableHighlight>
        </ThemeProvider>
        <TouchableHighlight
          style={styles.button}
          onPress={this.onPressPanic}
          // underlayColor="#99d9f4"
        >
          <Text style={styles.buttonText}>Panic</Text>
        </TouchableHighlight>
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
    // width: 375, removing for auto sizing
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
  chatText: {
    fontSize: 20,
    color: "black",
    alignSelf: "center"
  },
  button: {
    height: 50,
    backgroundColor: "#800000",
    borderColor: "#800000",
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 10,
    alignSelf: "stretch",
    justifyContent: "center"
  },
  buttonChat: {
    height: 48,
    backgroundColor: "white",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 10,
    alignSelf: "stretch",
    justifyContent: "center"
  },
  user: {
    backgroundColor: "#0078ef",
    padding: 2,
    alignSelf: "stretch"
  },
  name: {
    fontSize: 14,
    color: "white",
    alignSelf: "center"
  },
  image: {
    width: 80,
    height: 80
  }
});

export default withNavigation(PanicVideoView);