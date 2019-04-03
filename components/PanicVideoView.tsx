import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import PropTypes from "prop-types";
import { withNavigation } from 'react-navigation';
import { Video, Constants, Permissions, Location, Notifications } from 'expo';
class PanicVideoView extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{ alignSelf: "center", width: 155, height: 182, marginBottom: 10 }}
          source={{
            uri:
              "https://lh3.googleusercontent.com/UBU_NdCOW0iaVeRmiQmiF6tt5azKKwpSagJWTDWtEi1JXx15TC5AwpkTQ1aC8sqvNPCXPUqPHqcDQpGaXFwjNpKzPgqvdqYxhnEOg-X9635qoNP8S9G9-1jEc35cQ5KF4U6_Z2az9GXYhEBcO2KhBwecqBGkyw7Vcr-R19j48RdqPZjrJtFlwqkMnYytw3_0KTHt7YVr52TLv_f4SrYXB69C68WAXNFPxl-fV1B4y80fUSw3lWyJRCbrWc8fFT53yv4SxaEaDIk-cssp5X3gL2ynfOLIm09DWADiNivNbaVdKEoTfi1DRoY2qFAZDEae-jTl236Pj6W8gSHoMHAEffc_xIg7fFuVXvLQVk4ye142IJitH6RtCcUTKA0AzZY2mXijF2ZfwCX6UJWy77hnmmWOhkhWTZKoN9czQfVP7uizAgM-aGmx3Yu0oHWXOrZ1j_d5eI_p1OxsOvUBOIL5Lo7-fCAcfCiDrGbiUMusvxh0xDWqyS-TdxVZ9G4MmXw3d3MkAQoVKUtN3YWJMnQsyJeIHNDRxXKUTbQEpjaYdB4EQAO1wgfiXv1gPBZqoy7rHP12BvpgKb1-vXlVIBJvbZCr1HN5v76DQX0h1a4qfCyXgCtlMqO0r8XgM2LCh145waCKYWZtH0XIxU0Z1h2aSncmHPbpMXUCRTZ-hK3Z7P-txy1m3ZppPLI3TSWzJdODDc4dhEc6TdHBC3c8-aEm8EA7=w258-h304-no"
          }}
        />
        <Video
          source={{
            uri: "http://res.cloudinary.com/banditation/video/upload/v1553869861/mxqgsttf3fz6y2ww6tel.mp4"
          }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay
          isLooping
          style={{ alignSelf: "center", width: 400, height: 400 }}
        />
      </View>
    );
  }
}

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