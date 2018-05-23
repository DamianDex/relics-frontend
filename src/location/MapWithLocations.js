/*global google*/
import React, {Component} from "react";
import DirectionsWindow from '../location/DirectionsWindow'
const _ = require("lodash");
const debounce = require("lodash");
const { compose, withProps, lifecycle } = require("recompose");

const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  DirectionsRenderer,
} = require("react-google-maps");
const { SearchBox } = require("react-google-maps/lib/components/places/SearchBox");

const MapWithDirections = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyD24N1anR7QYVu1utTgsefbNB2oICWWpzg&libraries=places,geometry,drawing",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentWillMount() {
      const DirectionsService = new google.maps.DirectionsService();
      var refs = new Map();
      var route = {};  
      
      this.setState({
        bounds: null,
        center: {
          lat: 41.9, lng: -87.624
        },
        markers: [],
        onMapMounted: ref => {
          refs.map = ref;
        },
        onBoundsChanged: () => debounce(
        	() => {
        		this.setState({
        			bounds: refs.map.getBounds(),
        			center: refs.map.getCenter()
        		})
        		let { onBoundsChange } = this.props
        		if (onBoundsChange) {
        			onBoundsChange(refs.map)
        		}},
        		100,
        		{ maxWait: 500 }
        ),
        onSearchBoxMounted: ref => {    
          refs.set(ref.props.id, ref)
          refs = new Map([...refs.entries()].sort());
        },
        onPlacesChanged: (index) => {
        	var startLocation = null;
        	var endLocation = null;
        	var waypts = Array.from(refs).map(x => {
        		if (typeof x[1].getPlaces() != 'undefined'){
        			var loc = x[1].getPlaces()[0].geometry.location;
        			return {location: new google.maps.LatLng(loc.lat(), loc.lng())}
        		}
        	})
        	waypts = waypts.filter(function(n){ return n != undefined }); 
        	startLocation = waypts[0];
        	endLocation = waypts[waypts.length-1]
        	waypts.splice(0, 1);
        	waypts.splice(waypts.length-1, waypts.length);
        	if ((typeof startLocation != 'undefined') && (typeof endLocation === 'undefined')){
            	endLocation = startLocation;
            } 	
            if ((typeof startLocation != 'undefined') && (typeof endLocation != 'undefined')){
            DirectionsService.route({
                origin: startLocation.location,
                destination: endLocation.location,
                travelMode: google.maps.TravelMode.DRIVING,
                waypoints: waypts
                
              }, (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                  route = result;
                  
                  this.setState({
                    directions: result,
                  });
                } else {
                  console.error(`error fetching directions ${result}`);
                }
              });
            }       	     
        },
      })
    },
  })
)(props =>
<div>
	<DirectionsWindow props={props} onRef={ref => (this.child = ref)}/>
  <GoogleMap
    ref={props.onMapMounted}
    defaultZoom={15}
    center={props.center}
    onBoundsChanged={props.onBoundsChanged}
  >
    {props.directions && <DirectionsRenderer  
    	directions={props.directions} 
    />}
    }
  </GoogleMap>
  </div>
);

export default MapWithDirections;