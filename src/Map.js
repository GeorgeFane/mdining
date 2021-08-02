import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { Room } from '@material-ui/icons';
import bootstrapURLKeys from './env';

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

class SimpleMap extends Component {
    render() {
        const { rows } = this.props;
        const markers = rows ? rows.map(row => (
            <Marker {...row} />
        )) : null;
        
        return (
            // Important! Always set the container height explicitly
            <div style={{ height: '222px', width: '99%' }}>
                <GoogleMapReact {...this.props}>
                    {markers}
                </GoogleMapReact>
            </div>
        );
    }
}

// SimpleMap.defaultProps = { bootstrapURLKeys };

export default SimpleMap;
