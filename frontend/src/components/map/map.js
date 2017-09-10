import React, { Component } from "react";
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import "./map.css";

const googleMapURL =
  "https://maps.googleapis.com/maps/api/js?v=3.27&libraries=places,geometry&key=AIzaSyCvd5Ry4IK_o-C4LSNwdSuC1-gEhRSahlE&libraries=places";

const GettingStartedGoogleMap = withGoogleMap(props =>
  <GoogleMap
    ref={props.mapsMount}
    defaultZoom={14}
    defaultCenter={{ lat: 37.773568, lng: -122.4159416 }}
    onClick={props.onMapClick}
  >
    {props.markers.map((marker, index) =>
      <Marker
        key={index}
        {...marker}
        onRightClick={() => props.onMarkerRightClick(index)}
      />
    )}
  </GoogleMap>
);

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = { markers: [] };
    props.searchCallback(keyword => {
      this.search(keyword, this.googleMap.getCenter(), "500", newMarkers => {
        this.setState({
          markers: [newMarkers[0]]
        });
      });
    });
  }

  mapsMount(googleMap) {
    // console.log("this.googleMap", googleMap.getDiv());
    // console.log("this.container", this.container);
    this.googleMap = googleMap;
    if (!this.hasMounted) {
      this.hasMounted = true;
      this.directionsService = new this.props.google.maps.DirectionsService();
      this.directionsDisplay = new this.props.google.maps.DirectionsRenderer();
      this.directionsDisplay.setMap(this.googleMap);

      this.service = new this.props.google.maps.places.PlacesService(
        googleMap.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
      );
    }
  }

  generateRoute(){
    const google = this.props.google;
    var request = {
            origin:"twitter",
            destination:"city hall",
            travelMode: google.maps.TravelMode.DRIVING
      };
    this.directionsService.route(request, (response, status) => {
      if (status === "OK") {
        const stopLocation = new google.maps.LatLng(46.0, -125.9);
        const routePolyline = new google.maps.Polyline({
          path: response.routes[0].overview_path,
        });
        const onLine = google.maps.geometry.poly.isLocationOnEdge(stopLocation, routePolyline, 8);
        console.log(onLine);
      }
    });
  }

  search(keyword, location, radius, markerCb) {
    const request = {
      location,
      keyword,
      radius
    };
    this.service.nearbySearch(request, response => {
      const newMarkers = response.map(place => ({
        position: {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        },
      }));
      this.props.setDestination(newMarkers[0]);
      markerCb(newMarkers);
    });
  }
  render() {
    const google = this.props.google;
    return (
      <div className="map">
        <GettingStartedGoogleMap
          mapsMount={this.mapsMount.bind(this)}
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={
            <div
              ref={containElm => (this.container = containElm)}
              style={{ height: `100%` }}
            />
          }
          onMapLoad={() => console.log("mapload")}
          markers={this.state.markers}
        />
      </div>
    );
  }
}

export default Map;
