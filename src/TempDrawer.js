import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { Typography, Link } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    list: {
        width: 250,
        padding: theme.spacing(2),
    },
    fullList: {
        width: 'auto',
    },
}));

export default function TemporaryDrawer() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <Typography>
                The backend is a Python microservice deployed on Google Cloud Functions. Everytime you visit this page, the microservice uses lxml to scrape all Michigan Dining menus asynchornously and determines whether they're open. You can see the code
                {' '}
                <Link
                    href='https://github.com/GeorgeFane/payoffmatrixsolver/blob/main/function/main.py'
                    target='_blank'
                >
                    here
                </Link>
            </Typography>
        </div>
    );

    return (
        <div>
            {['right'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Button
                        color='inherit'
                        onClick={toggleDrawer(anchor, true)}
                    >
                        About
                    </Button>
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}
