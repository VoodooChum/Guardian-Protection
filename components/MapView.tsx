import * as React from 'react';
import { MapView, Constants, Marker } from 'expo';
import axios from 'axios';
import { createStackNavigator, createAppContainer, withNavigation } from 'react-navigation';
// const { API_HOST } = Constants.manifest.extra;
const API_HOST = 'http://6ea8cf99.ngrok.io'


//https://github.com/react-native-community/react-native-maps
class Map extends React.Component {
    constructor(props: object) {
        super(props); 
        
    }
 
    componentDidMount = async () => {
        // let currentUser = this.props.navigation.state.params.userData
        // let credentials = await axios.get(`${API_HOST}/locations/${currentUser.id}`);

    }

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
                <MapView.Marker
                    coordinate={{
                        latitude: 37.78825,
                        longitude: -122.4324
                    }}
                    title={"title"}
                    description={"description"}
                />
            </MapView >
        );
    }
}

export default withNavigation(Map);