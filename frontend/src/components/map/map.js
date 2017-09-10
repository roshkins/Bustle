import React, { Component } from "react";
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import "./map.css";

const googleMapURL =
  "https://maps.googleapis.com/maps/api/js?v=3.27&libraries=places,geometry&key=AIzaSyCvd5Ry4IK_o-C4LSNwdSuC1-gEhRSahlE&libraries=places";

class Map extends Component {
  mapsMount(googleMap) {
    console.log("this.googleMap", googleMap.getDiv());
    console.log("this.container", this.container);
    this.service = new this.props.google.maps.places.PlacesService(
      googleMap.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
    );
    //   this.container
  }

  render() {
    const GettingStartedGoogleMap = withGoogleMap(props =>
      <GoogleMap
        ref={googleMap => {
          console.log("googleMapRef", googleMap);
          this.mapsMount(googleMap);
        }}
        defaultZoom={3}
        defaultCenter={{ lat: -25.363882, lng: 131.044922 }}
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
    console.log("gm", this.googleMap);

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
            console.log(this.props.google);
            const request = {
              query: "23 Olive lane",
              radius: "500"
            };
            this.service.nearbySearch(request, r => console.log(r));
          }}
          markers={[]}
        />
      </div>
    );
  }
}

export default Map;
