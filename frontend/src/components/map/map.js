import React, { Component } from "react";
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import "./map.css";

const googleMapURL =
  "https://maps.googleapis.com/maps/api/js?v=3.27&libraries=places,geometry&key=AIzaSyCvd5Ry4IK_o-C4LSNwdSuC1-gEhRSahlE&libraries=places";

class Map extends Component {

  constructor(props){
    super(props);
    this.state = {markers: []};
  }


  mapsMount(googleMap) {
    // console.log("this.googleMap", googleMap.getDiv());
    // console.log("this.container", this.container);
    if(!this.hasMounted){
      this.hasMounted = true;
      this.service = new this.props.google.maps.places.PlacesService(
        googleMap.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
      );
    }
  }

  render() {
    console.log(this.state.markers)
    const GettingStartedGoogleMap = withGoogleMap(props =>
      <GoogleMap
        ref={googleMap => {
          console.log("googleMapRef", googleMap);
          this.googleMap = googleMap;
          this.mapsMount(googleMap);
        }}
        defaultZoom={14}
        defaultCenter={{ lat: 37.773568, lng: -122.4159416 }}
        onClick={props.onMapClick}
      >
        {props.markers.map((marker, index) =>
          <Marker
            {...marker}
            onRightClick={() => props.onMarkerRightClick(index)}
          />
        )}
      </GoogleMap>
    );

    return (
      <div className="map">
        <GettingStartedGoogleMap
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={
            <div
              ref={containElm => (this.container = containElm)}
              style={{ height: `100%` }}
            />
          }
          onMapLoad={() => console.log("mapload")}
          onMapClick={() => {
            const request = {
              location: this.googleMap.getCenter(),
              query: "food",
              radius: "500"
            };
            this.service.nearbySearch(request, r => {
              const place = r[0];
              const marker = {
                position: {
                  lat: place.geometry.location.lat(),
                  lng: place.geometry.location.lng()
                }
              };
              this.setState({markers: [...this.state.markers, marker]})
              // this.setState();
              // console.log(this.state.markers)
            });
          }}
          markers={this.state.markers}
        />
      </div>
    );
  }
}

export default Map;
