import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { GitHub, Home } from '@material-ui/icons';
import { Tooltip } from '@material-ui/core';

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

                    <Tooltip title={
                        <Typography>
                            The backend is a Python microservice deployed on Google Cloud Functions. Everytime you visit this page, the microservice uses lxml to scrape all Michigan Dining menus across halls and determines whether they're open. You can see the code at 
                        </Typography>
                    }>
                        <Button
                            color='inherit'
                        >
                            About
                        </Button>
                    </Tooltip>

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
