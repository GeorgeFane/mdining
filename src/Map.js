import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { Tooltip, Typography } from '@material-ui/core';
import { Room } from '@material-ui/icons';

function Marker(props) {
    return (
        <Tooltip title="Delete">
            <div>
                <Room
                    color={props.isOpen ? 'primary': 'secondary'}
                />
                {props.Hall}
            </div>
        </Tooltip>
    );
}

const { key } = process.env;
console.log(process.env)

class SimpleMap extends Component {
    static defaultProps = {
        bootstrapURLKeys: {
            key
        },
        defaultCenter: {
            lat: 42.28156557881266,
            lng: -83.72879591738906
        },
        defaultZoom: 13
    };

    render() {
        const { rows } = this.props;
        const markers = rows.map(row => (
            <Marker {...row} />
        ))
        
        return (
            // Important! Always set the container height explicitly
            <div style={{ height: '55vh', width: '55%' }}>
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
