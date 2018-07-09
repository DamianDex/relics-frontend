/*global google*/
import React from "react";
import DirectionsWindow from '../location/DirectionsWindow'
import "../location/Location.css";
const debounce = require("lodash");
const { compose, withProps, withState, withHandlers, lifecycle } = require("recompose");
const { connect } = require("react-redux");
const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");
const { MarkerWithLabel } = require("react-google-maps/lib/components/addons/MarkerWithLabel");
const {Card, CardImg, CardBody, CardSubtitle, CardHeader} = require("reactstrap");

const PropTypes = require("prop-types")


const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
  Polygon,
} = require("react-google-maps");

const MapWithLocations = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyD24N1anR7QYVu1utTgsefbNB2oICWWpzg&v=3.33&libraries=places,geometry,drawing",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withState('zoom', 'onZoomChange', 6),
  withHandlers({
    onMarkerClustererClick: () => (markerClusterer) => {
      markerClusterer.getMarkers()
    },
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
        refresh: 1,
        zoom: 6,
        center: {
          lat: 52, lng: 19
        },
        markers: [],
        imageSrc: '/images/icon.jpg',
        onMapMounted: ref => {
          refs.map = ref;
        },
        onShowMarkLabel: (id, show) => {
          var BreakException = {};
          try{
            this.state.markers.forEach(function(marker) {
              if (marker.id === id){
                marker['labelVisible']=show;
                throw BreakException;
              } else {
                marker['labelVisible']=false;
              }
            })
          } catch (e){
            if (e !== BreakException) throw e;
          }
          var newRefresh = -this.state.refresh
          this.setState({
            refresh: newRefresh
          })
        },
        onMarkerClicked: (id) => {
    	var { onRelicMarkerClicked } = this.props;
            onRelicMarkerClicked(id);
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
  	  	directionsRef: ref => {
  	  		directionsRef = ref;
  	  	},    
  	  	getDirections: () => {
  	  	    this.setState({
  	  	        directions: directionsRef.getDirections(),
  	  	    })
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
    	var { relic_zoomed, onSearch } = this.props;
    	if (nextProps.route_searched != this.props.route_searched){
    		if (typeof this.state.directions !== 'undefined'){
    			var routePoints = []
    			this.state.directions.routes[0].overview_path.forEach((point) => {
    			    routePoints.push([point.lat(), point.lng()])
    			});
    			onSearch(routePoints)
    		} else {
    			console.log("Its undefined")
    		}
    	} else if (nextProps.found_buffer != this.props.found_buffer || nextProps.found_relics != this.props.found_relics){
    	    nextProps.found_relics.forEach(function(relic) {
    	        relic["labelVisible"] = false;
    	    })
    	    this.setState({
    	        buffer: nextProps.found_buffer,
    	        markers: nextProps.found_relics,
    	    })
    	} else if (typeof nextProps.relic_zoomed !== 'undefined' && nextProps.relic_zoomed != relic_zoomed){
    	    const center = {lat: nextProps.relic_zoomed[0], lng: nextProps.relic_zoomed[1]};
    	    console.log(this.state.zoom);
    	    this.setState({center: center, zoom: 25})
    	}
    }
  })
)(props =>
<div>
  <DirectionsWindow props={props} onRef={ref => (this.child = ref)}/>
  <Polygon path={props.buffer} options={{
                                           strokeColor: '#4169E1',
                                           fillColor: '#87CEFA',
                                           strokeOpacity: 0.6,
                                           strokeWeight: 1,
                                           fillOpacity: 0.3
                                       }}/>
  <GoogleMap
    ref={props.onMapMounted}
    zoom={props.zoom}
    defaultZoom={6}
    center={props.center}
  >
    <MarkerClusterer
      averageCenter
      enableRetinaIcons
      gridSize={60}
    >
      {props.markers.map(marker => (
         <MarkerWithLabel
            key={marker.id}
            position={{ lat: marker.geographicLocation.latitude, lng: marker.geographicLocation.longitude }}
            labelAnchor={new google.maps.Point(0, 0)}
            labelVisible={marker.labelVisible}
            onMouseOver={() => props.onShowMarkLabel(marker.id, true)}
            onMouseOut={() => props.onShowMarkLabel(marker.id, false)}
            onClick={ () => props.onMarkerClicked(marker.id)}
         >
            <Card className="marker-pop">
              <CardHeader>
                <CardSubtitle>{marker.identification}</CardSubtitle>
              </CardHeader>
              <CardBody>
                <CardImg top width="100%" src={process.env.PUBLIC_URL + props.imageSrc} alt="Card image cap"/>
              </CardBody>
            </Card>
         </MarkerWithLabel>
      ))}
    </MarkerClusterer>
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
	found_relics: PropTypes.array,
	found_buffer: PropTypes.array,
	relic_clicked: PropTypes.number,
	relic_zoomed: PropTypes.array,
	onSearch: PropTypes.func,
	onRelicMarkerClicked: PropTypes.func
}

const mapStateToProps = (state) => {
  return {
  	  route_searched: state.route_searched,
  	  found_relics: state.found_relics,
  	  found_buffer: state.found_buffer,
  	  relic_clicked: state.relic_clicked,
  	  relic_zoomed: state.relic_zoomed
  }
}

const mapDispatchToProps = (dispatch) => {
	  return {
		  onSearch: (routePoints) => (
			  dispatch({ type: 'ROUTE_RELICS', route_relics: routePoints })
		  ),
		  onRelicMarkerClicked: (id) => {
		      dispatch({ type: 'RELIC_MARKER', relic_clicked: id})
		  },
	  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MapWithLocations);