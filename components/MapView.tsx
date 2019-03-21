import * as React from 'react';
import { MapView } from 'expo';
import { createStackNavigator, createAppContainer, withNavigation } from 'react-navigation';

//https://github.com/react-native-community/react-native-maps
class Map extends React.Component {
    render() {
        return (
            <MapView
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
            </MapView >
        );
    }
}

export default withNavigation(Map);