import * as React from 'react';
import { MapView, Constants, Marker, Location } from 'expo';
import axios from 'axios';
import { createStackNavigator, createAppContainer, withNavigation } from 'react-navigation';
import { parse } from 'url';
// import console = require('console');
// import console = require('console');
// import console = require('console');
// import console = require('console');
const { API_HOST } = Constants.manifest.extra;



//https://github.com/react-native-community/react-native-maps
class Map extends React.Component {
    constructor(props: object) {
        super(props); 
        this.state = {
            myLocation: this.props.navigation.state.params.location,
            memberLocation: this.props.navigation.state.params.location,
            panicStatus: false,
            groupMember: this.props.navigation.state.params.name
        }
        this._isMounted = false;
    }
    
   

    componentWillMount = async () => {
        this._isMounted = true;
        // let currentUser = this.props.navigation.state.params.userData
        // let credentials = await axios.get(`${API_HOST}/locations/${currentUser.id}`);
        console.log(this.props.navigation.state.params.username);
        let location = await Location.getCurrentPositionAsync({}).catch(err => console.log(err));;
        this.checkPanicStatus();
        this.getLastLocation();
        let coords = location.coords
        this.setState({ myLocation: coords })

    }

    componentWillUnmount = () => {
        this._isMounted = false;
    }

    getLastLocation = async () => {
        let memberId = this.props.navigation.state.params.username;
        let groupMemberLocation = await axios.get(`${API_HOST}/locations/${memberId}`).catch(err => console.log(err));
        // let lastLoc = { 'longitude': parseFloat(groupMemberLocation.data.longitude), 'latitude': parseFloat(groupMemberLocation.data.latitude)} 
        // this.setState({ memberLocation: lastLoc })   
        // console.log(lastLoc);
        // console.log(this.state.myLocation) 
    }

    checkPanicStatus = async () => {
        let memberId = this.props.navigation.state.params.username;
        let panicStatus = await axios.get(`${API_HOST}/panic/status/${memberId}`).catch(err => console.log(err));
        this.setState({ panicStatus: panicStatus})
        // console.log(panicStatus);
    }
    
    render() {
        const { myLocation, memberLocation } = this.state;    
        return (
            <MapView
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: parseFloat(memberLocation.latitude),
                    longitude: parseFloat(memberLocation.longitude),
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                <MapView.Marker
                    coordinate={{
                        latitude: parseFloat(myLocation.latitude),
                        longitude: parseFloat(myLocation.longitude), 
                    }}
                    pinColor="blue"
                    title={"Your Location"}
                    description={"Me"}
                />
                <MapView.Marker
                    coordinate={{
                        latitude: parseFloat(memberLocation.latitude),
                        longitude: parseFloat(memberLocation.longitude),
                    }}
                    title={this.state.groupMember}
                    description={"Last Location"}
                />
            </MapView >
        );
    }
}

export default withNavigation(Map);