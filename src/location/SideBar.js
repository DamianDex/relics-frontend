import React, {Component} from "react";
import { CardSubtitle, CardHeader, InputGroup, Input, Button, ListGroup } from 'reactstrap'
import LocationsListItem from '../location/LocationsListItem'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { List, AutoSizer, CellMeasurer, CellMeasurerCache, WindowScroller  } from "react-virtualized";
import 'react-virtualized/styles.css';

class SideBar extends Component {
    
	static propTypes = {
	    pending: PropTypes.bool,
		route_searched: PropTypes.number,
		found_relics: PropTypes.array,
   	    relic_clicked: PropTypes.number,
   	    relic_zoomed: PropTypes.array,

		onSearch: PropTypes.func,
		onZoomed: PropTypes.func
    };

	constructor(props) {
        super(props);
        this.handleSearchClick = this.handleSearchClick.bind(this);
        this.handleBufferChange = this.handleBufferChange.bind(this);
        this.findRelicIndexById = this.findRelicIndexById.bind(this);
        this.swapListElements = this.swapListElements.bind(this);
        this.renderRow = this.renderRow.bind(this);
        this.handleZoomToPointClick = this.handleZoomToPointClick.bind(this);
        this.state = {buffer: 1, relics: [], scrollToIndex: -1, relic_clicked: -1};
        this.cache = new CellMeasurerCache({ fixedWidth: true, defaultHeight: 190 });
    }

    componentWillUpdate(nextProps, nextState){
        if (typeof nextProps.found_relics !== 'undefined' && nextProps.found_relics !== this.state.relics){
            this.setState({
                relics: nextProps.found_relics
            })
        }
        if (typeof nextProps.relic_clicked !== 'undefined' && nextProps.relic_clicked !== this.state.relic_clicked){
            var index = this.findRelicIndexById(this.state.relics, nextProps.relic_clicked);
            this.setState({
                scrollToIndex: index,
                relic_clicked: nextProps.relic_clicked
            })
            var someVar;
            setTimeout(() => {
                this.setState({ scrollToIndex: someVar });
            }, 3000);

        }
    }

    findRelicIndexById(list, id){
        var i;
        for (i = 0; i < list.length; i++){
            if (list[i].id === id){
                return i;
            }
        }
        return -1;
    }

    swapListElements(list, i, j) {
        if (j > 0){
            var e = list[j];
            list[j] = list[i];
            list[i] = e;
        }
        return list;
    }

    handleSearchClick(index) {
    	var { route_searched, onSearch } = this.props;
    	if (typeof route_searched === 'undefined'){
    		route_searched = 0;
    	}
    	onSearch(route_searched + 1, this.state.buffer);
    }
    
    handleBufferChange(e) {
    	this.setState({ buffer: e.target.value })
    }

    handleZoomToPointClick(lat, lng) {
        var { onZoomed } = this.props;
        onZoomed(lat, lng);
    }

    render() {
    	const { route_searched, pending } = this.props;
        let button = null;
        let pendingWheel = null;
        if (route_searched === 1) {
            button = <Button className="buffer-button" color="primary" onClick={() => this.handleSearchClick(0)}>Wyszukaj</Button>	
        } else {
            button = <Button className="buffer-button" color="primary" onClick={() => this.handleSearchClick(1)}>Wyszukaj</Button>	
        }
        if (pending){
            pendingWheel = <div className="loader"></div>
        } else {
            pendingWheel = <div></div>
        }
        return (
        	<div id = "inner-remaining" className="sidebar">
        		<CardHeader>
        			Bufor odległości od trasy
        		</CardHeader>
        	    <InputGroup className="buffer-group">
        	      	<CardSubtitle className="buffer-text" >Bufor [km]: {pendingWheel}</CardSubtitle>
        	       	<Input className="buffer-input" placeholder="Wpisz odległość od trasy..." type="number" step="0.5" min="0.5"
        	       		value={this.state.buffer} onChange={this.handleBufferChange}/>
        	     </InputGroup>
        	     {button}
        	    <CardHeader>
        			Odnalezione w buforze zabyki
        		</CardHeader>
        		<ListGroup className="list-container ">
        		    <AutoSizer>
                        {({width, height}) => (
                            <List
                                height={height}
                                width={width}
                                deferredMeasurementCache={this.cache}
                                rowHeight={this.cache.rowHeight}
                                rowRenderer={this.renderRow}
                                rowCount={this.state.relics.length}
                                scrollToIndex={this.state.scrollToIndex}
                            />
                        )}
                    </AutoSizer>
       		    </ListGroup>
        	</div>
        );
    }

    renderRow({ index, key, style, parent }) {
        var marked;
        index === this.state.scrollToIndex ? marked = true: marked = false;
        return(
            <CellMeasurer
                key={index}
                cache={this.cache}
                parent={parent}
                columnIndex={0}
                rowIndex={index}
            >
                    <LocationsListItem
                        key={index}
                        style={style}
                        relic={this.state.relics[index]}
                        marked={marked}
                        handleZoom={this.handleZoomToPointClick}/>
            </CellMeasurer>
        )
    }
}



const mapDispatchToProps = (dispatch) => {
	  return {
	    onSearch: (searched, buffer) => dispatch({ type: 'SEARCH_ROUTE', dir_searched: searched, route_buffer: buffer}),
	    onZoomed: (lat, lng) => dispatch({ type: 'RELIC_MARKER', relic_zoomed: [lat, lng]})
	  }
};

const mapStateToProps = (state) => {
    return {
      	relic_clicked: state.relic_clicked,
      	found_relics: state.found_relics,
    	route_searched: state.route_searched,
    	relic_zoomed: state.relic_zoomed,
    	pending: state.pending
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);

