import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Button, Paper } from '@material-ui/core';
import { Check, Close } from '@material-ui/icons';

import Map from './Map';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
    },
}));

export default function CenteredGrid(props) {
    const classes = useStyles();
    const { row } = props;

    const center = row;
    const zoom = 17;
    const mapProps = { center, zoom };

    return row.Hall ? (
        <Paper className={classes.paper}>
            <Map {...mapProps} />         

            <Typography variant='h4'>
                {row.Hall}
            </Typography>
            
            <Button
                startIcon={row.isOpen ? <Check /> : <Close />}
            >
                {row.Open} - {row.Close}, {row.Meal}
            </Button>
            
            <Typography>
                {row.Courses}
            </Typography>
        </Paper>
    ) : (
        <Typography>
            Click a row
        </Typography>
    );
}
