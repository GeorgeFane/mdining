import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Grid, Typography, Toolbar, Box } from '@material-ui/core';

import axios from 'axios';
import Map from './Map';
import Header from './Header';

const url = 'https://us-central1-georgefane.cloudfunctions.net/mdining'

const width = 144;
const columns = [
    { field: 'Hall', width },
    { field: 'Meal', width },
    { field: 'Open', width },
    { field: 'Close', width },
    { field: 'isOpen', type: 'boolean', width },
];

class App extends React.Component {
    constructor () {
        super();
        this.state = {
            rows: [],
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
        const { rows, loading, Courses } = this.state;
        const data = {
            rows, columns, loading, autoHeight: true,
            onRowClick: data => {
                const { Courses } = data.row;
                this.setState({ Courses });
            }
        };
        return <div>
            <Header />
            <Toolbar />
            <div>
                <Grid container spacing={1}>
                    <Grid item xs={8}>
                        <DataGrid {...data} />;
                    </Grid>
                    
                    <Grid item xs>
                        <Typography>
                            {Courses}
                        </Typography>
                    </Grid>
                </Grid>
                
                <Box display='inline'>
                    <Map rows={rows} />
                </Box>
            </div>
        </div>
    }
}

export default App;
