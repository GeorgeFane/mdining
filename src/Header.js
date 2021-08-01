import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { GitHub } from '@material-ui/icons';

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
                    <Typography variant="h6" className={classes.title}>
                        Michigan Dining
                    </Typography>
            
                    <Button
                        startIcon={<GitHub />}
                        color='inherit'
                        variant='outlined'

                        href='https://github.com/GeorgeFane/mdining/tree/source'
                        target='_blank'
                    >
                        Source (React)
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}
