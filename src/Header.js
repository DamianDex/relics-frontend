import React from 'react';
import CustomNavbar from './components/CustomNavbar'

export default class Header extends React.Component {
    baseDir = "localhost:8090";

    render() {
        return (
            <div id="inner_fixed">
                <CustomNavbar/>
            </div>
        );
    }
}


