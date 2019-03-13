import * as React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import axios from 'axios';

 class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{ width: 206, height: 243 }}
          source={{
            uri:
              "https://lh3.googleusercontent.com/UBU_NdCOW0iaVeRmiQmiF6tt5azKKwpSagJWTDWtEi1JXx15TC5AwpkTQ1aC8sqvNPCXPUqPHqcDQpGaXFwjNpKzPgqvdqYxhnEOg-X9635qoNP8S9G9-1jEc35cQ5KF4U6_Z2az9GXYhEBcO2KhBwecqBGkyw7Vcr-R19j48RdqPZjrJtFlwqkMnYytw3_0KTHt7YVr52TLv_f4SrYXB69C68WAXNFPxl-fV1B4y80fUSw3lWyJRCbrWc8fFT53yv4SxaEaDIk-cssp5X3gL2ynfOLIm09DWADiNivNbaVdKEoTfi1DRoY2qFAZDEae-jTl236Pj6W8gSHoMHAEffc_xIg7fFuVXvLQVk4ye142IJitH6RtCcUTKA0AzZY2mXijF2ZfwCX6UJWy77hnmmWOhkhWTZKoN9czQfVP7uizAgM-aGmx3Yu0oHWXOrZ1j_d5eI_p1OxsOvUBOIL5Lo7-fCAcfCiDrGbiUMusvxh0xDWqyS-TdxVZ9G4MmXw3d3MkAQoVKUtN3YWJMnQsyJeIHNDRxXKUTbQEpjaYdB4EQAO1wgfiXv1gPBZqoy7rHP12BvpgKb1-vXlVIBJvbZCr1HN5v76DQX0h1a4qfCyXgCtlMqO0r8XgM2LCh145waCKYWZtH0XIxU0Z1h2aSncmHPbpMXUCRTZ-hK3Z7P-txy1m3ZppPLI3TSWzJdODDc4dhEc6TdHBC3c8-aEm8EA7=w258-h304-no"
          }}
        />
        <Text>The Premier App in Family Protection!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0078ef',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App; 