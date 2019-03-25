import * as React from 'react';
import { MapView, Constants, Marker, Location } from 'expo';
import axios from 'axios';
import { createStackNavigator, createAppContainer, withNavigation } from 'react-navigation';
// import console = require('console');
const { API_HOST } = Constants.manifest.extra;



//https://github.com/react-native-community/react-native-maps
class Map extends React.Component {
    constructor(props: object) {
        super(props); 
        this.state = {
            myLocation: this.props.navigation.state.params.location
        }
    }
 
    componentDidMount = async () => {
        // let currentUser = this.props.navigation.state.params.userData
        // let credentials = await axios.get(`${API_HOST}/locations/${currentUser.id}`);
        console.log(this.state.myLocation);
        let location = await Location.getCurrentPositionAsync({});
        let coords = location.coords
        this.setState({ myLocation: coords })
    }

    render() {
        const { myLocation } = this.state;
        return (
            <MapView
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: myLocation.latitude,
                    longitude: myLocation.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                <MapView.Marker
                    coordinate={{
                        latitude: myLocation.latitude,
                        longitude: myLocation.longitude,
                    }}
                    title={"Your Location"}
                    description={"Me"}
                />
            </MapView >
        );
    }
}

export default withNavigation(Map);