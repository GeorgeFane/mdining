import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Grid, Typography, Toolbar, Box, Paper } from '@material-ui/core';

import axios from 'axios';
import Map from './Map';
import Header from './Header';
import Card from './Card';
import Accordion from './Accordion';

const url = 'https://us-central1-georgefane.cloudfunctions.net/mdining'

const width = 122;
const columns = [
    { field: 'Hall', width },
    { field: 'Meal', width },
    { field: 'Open', width },
    { field: 'Close', width },
    { field: 'isOpen', type: 'boolean', width },
];

class App extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            rows: [],
            row: {},
            loading: true,
            Courses: '',
        };
    }

    async componentDidMount() {
        const resp = await axios.get(url);
        const rows = resp.data.data.map( (row, id) => ({ id, ...row }) );
        const loading = false;
        this.setState({ rows, loading });
    }

    render () {
        const { rows, row, loading, Courses } = this.state;
        const data = {
            rows, columns, loading, autoHeight: true,
            onRowClick: data => {
                const { row } = data;
                this.setState({ row });
            }
        };

        const lat = 42.28156557881266;
        const lng = -83.72879591738906;
        const center = { lat, lng };
        const zoom = 12;
        const mapProps = { center, zoom, rows };

        return <div>
            <Header />
            <Toolbar />
            <div>
                <Grid container spacing={1}>
                    <Grid item xs>
                        <DataGrid {...data} />;
                        <Accordion children={<Map {...mapProps} />} />
                    </Grid>
                    
                    <Grid item xs>
                        <Card row={row} />
                    </Grid>
                </Grid>
            </div>
        </div>
    }
}

export default App;
