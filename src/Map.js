import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { Tooltip, Typography } from '@material-ui/core';
import { Room } from '@material-ui/icons';

function Marker(props) {
    return (
        <div>
            <Room
                color={props.isOpen ? 'primary': 'secondary'}
            />
            {props.Hall}
        </div>
    );
}

const { key } = process.env;

class SimpleMap extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { rows } = this.props;
        const markers = rows ? rows.map(row => (
            <Marker {...row} />
        )) : null;
        
        return (
            // Important! Always set the container height explicitly
            <div style={{ height: '33vh', width: '99%' }}>
                <GoogleMapReact
                    {...this.props}
                >
                    {markers}
                </GoogleMapReact>
            </div>
        );
    }
}

export default SimpleMap;
