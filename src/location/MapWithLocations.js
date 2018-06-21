/*global google*/
import React from "react";
import DirectionsWindow from '../location/DirectionsWindow'
const debounce = require("lodash");
const { compose, withProps, lifecycle } = require("recompose");
const { connect } = require("react-redux");
const PropTypes = require("prop-types")

const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  DirectionsRenderer,
} = require("react-google-maps");

const MapWithLocations = compose(
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
      var directionsRef = {};
      var startLoc = {};
      var endLoc = {};
      var waypts2 = [];

      this.setState({
        bounds: null,
        center: {
          lat: 52, lng: 19
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
        		if (typeof x[1].getPlaces() !== 'undefined'){
        			var loc = x[1].getPlaces()[0].geometry.location;
        			return {location: new google.maps.LatLng(loc.lat(), loc.lng())}
        		}
        	})
        	waypts = waypts.filter(function(n){ return n !== undefined }); 
        	startLocation = waypts[0];
        	endLocation = waypts[waypts.length-1]
        	waypts.splice(0, 1);
        	waypts.splice(waypts.length-1, waypts.length);
        	if ((typeof startLocation !== 'undefined') && (typeof endLocation === 'undefined')){
            	endLocation = startLocation;
            } 	
            if ((typeof startLocation !== 'undefined') && (typeof endLocation !== 'undefined')){
              	startLoc = startLocation;
              	endLoc = endLocation;
              	waypts2 = waypts;
            	
            	DirectionsService.route({
                    origin: startLocation.location,
                    destination: endLocation.location,
                    travelMode: google.maps.TravelMode.DRIVING,
                    waypoints: waypts
                    
                }, (result, status) => {
                    if (status === google.maps.DirectionsStatus.OK) {             
                      this.setState({
                        directions: result,
                      });
                    } else {
                      console.error(`error fetching directions ${result}`);
                    }
                  });
            }       	     
        },
        //add to compoonentWillupdate
  	  	directionsRef: ref => {    
  	  		directionsRef = ref;
  	  	},    
  	  	getDirections: () => {
  	  		console.log(directionsRef.getDirections())  
  	  	}
      });

      DirectionsService.route({
    	  origin: startLoc.location,
          destination: endLoc.location,
          travelMode: google.maps.TravelMode.DRIVING,
          waypoints: waypts2
            
      }, (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {             
            this.setState({
              directions: result,
            });
          } else {
            console.error(`error fetching directions ${result}`);
          }
      });
    },
    componentWillUpdate(nextProps, nextState){
    	var { onSearch } = this.props;
    	if (nextProps != this.props){
    		if (typeof this.state.directions !== 'undefined'){
    			var routePoints = []
    			this.state.directions.routes[0].overview_path.forEach((point) => {
    			    routePoints.push([point.lat(), point.lng()])
    			});
    			onSearch(routePoints)
    		} else {
    			console.log("Its undefined")
    		}
    	}
    }
  })
)(props =>
<div>
  <DirectionsWindow props={props} onRef={ref => (this.child = ref)}/>
  <GoogleMap
    ref={props.onMapMounted}
    defaultZoom={6}
    center={props.center}
    onBoundsChanged={props.onBoundsChanged}
  >
    {props.directions && <DirectionsRenderer  
    	ref={props.directionsRef}
		directions={props.directions}
		options={{draggable:true}}
		onDirectionsChanged={props.getDirections}
    />}
  </GoogleMap>
  </div>
);
MapWithLocations.propTypes = {
	route_relics: PropTypes.array,
	onSearch: PropTypes.func,		
}

const mapStateToProps = (state) => {
  return {
  	  route_searched: state.route_searched,
  }
}

const mapDispatchToProps = (dispatch) => {
	  return {
		  onSearch: (found_relics) => (
			  dispatch({ type: 'ROUTE_RELICS', route_relics: found_relics })
		  )
	  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MapWithLocations);