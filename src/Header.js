import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { GitHub, Home } from '@material-ui/icons';
import { Tooltip, Link, Drawer } from '@material-ui/core';

import TempDrawer from './TempDrawer';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    drawer: {
        width: 222,
    },
}));

export default function ButtonAppBar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar>
                <Toolbar>

                    <IconButton
                        color="inherit"
                        href='https://georgefane.github.io/'
                    >
                        <Home />
                    </IconButton>

                    <Typography variant="h6" className={classes.title}>
                        Michigan Dining
                    </Typography>

                    <TempDrawer />

                    <IconButton
                        color="inherit"
                        href='https://github.com/GeorgeFane/mdining/tree/source'
                        target='_blank'
                    >
                        <GitHub />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    );
}
