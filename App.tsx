import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LoginView from './components/Login';
 class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <LoginView />
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