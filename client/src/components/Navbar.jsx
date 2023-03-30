import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { theme } from './Theme';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import useMediaQuery from '@mui/material/useMediaQuery';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import Logo from "../Assets/FitLogo.png";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


const styles = {
    toolbarMargin: {
        ...theme.mixins.toolbar,
        marginBottom: '2em',
        // height: '3em !important',
        [theme.breakpoints.down('md')]: {
            marginBottom: '2em',
        },
        [theme.breakpoints.down('xs')]: {
            marginBottom: '1.25em',
        },
    },
    logo: {
        height: '8em',
        [theme.breakpoints.down('md')]: {
            height: '7em',
        },
        [theme.breakpoints.down('xs')]: {
            height: '5.5em',
        },
    },
    logoContainer: {
        padding: 0,
        '&:hover': {
            backgroundColor: 'transparent',
        },
    },
    tabs: {
        marginLeft: 'auto',
        '& .MuiButtonBase-root.MuiTab-root': {
            fontSize: 20,
        },
        '& .Mui-selected': {
            // backgroundColor: '#fce0a2',
            color: '#fe0100',
            opacity: 0.7,
            // borderRadius: 2,
        },
    },
    tab: {
        ...theme.typography.tab,
        minWidth: 10,
        marginLeft: '25px',
        color: '#fe0100',
    },

    hamburgerMenuIcon: {
        height: '50px',
        width: '50px',
    },
    menuIconContainer: {
        marginLeft: 'auto',
        color: '#fe0100',
        '&:hover': {
            // opacity: 74,
        },
    },
    appbar: {
        zIndex: theme.zIndex.modal + 1,
    },
};

const DesktopNavigation = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Tabs
            value={value}
            onChange={handleChange}
            aria-label="nav tabs example"
            sx={styles.tabs}
        >
            <Tab sx={styles.tab} label="Challenges" component={Link} to="/challenges" />
            <Tab sx={styles.tab} label="Resources" component={Link} to="/posts" />
            <Tab sx={styles.tab} label="Community" component={Link} to="/discuss" />
        </Tabs>
    );
};

const MobileNavigation = () => {
    const [openDrawer, setOpenDrawer] = React.useState(false);

    const iOS =
        typeof navigator !== 'undefined' &&
        /iPad|iPhone|iPod/.test(navigator.userAgent);

    return (
        <React.Fragment>
            <SwipeableDrawer
                disableBackdropTransition={!iOS}
                disableDiscovery={iOS}
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
                onOpen={() => setOpenDrawer(true)}
            // style={{ height: '10px' }}
            >
                <Box style={styles.toolbarMargin} />
                <Paper sx={{ width: "200px", backgroundColor: "#1c1c1c", height: "-webkit-fill-available", marginTop: "-20px" }}>
                    <List disablePadding>
                        <ListItem
                            style={{ color: " #fe0100", fontSize: "136%" }}
                            divider
                            component={Link}
                            to="/home"
                            onClick={() => setOpenDrawer(false)}
                        >
                            <ListItemText disableTypography>Home</ListItemText>
                        </ListItem>
                        <ListItem
                            style={{ color: " #fe0100", fontSize: "136%" }}
                            divider
                            component={Link}
                            to="/posts"
                            onClick={() => setOpenDrawer(false)}
                        >
                            <ListItemText disableTypography>Resources</ListItemText>
                        </ListItem>
                        <ListItem
                            style={{ color: " #fe0100", fontSize: "136%" }}
                            divider
                            component={Link}
                            to="/Challenges"
                            onClick={() => setOpenDrawer(false)}
                        >
                            <ListItemText disableTypography>Challenges</ListItemText>
                        </ListItem>
                        <ListItem
                            style={{ color: " #fe0100", fontSize: "136%" }}
                            divider
                            component={Link}
                            to="/discuss"
                            onClick={() => setOpenDrawer(false)}
                        >
                            <ListItemText disableTypography>Community</ListItemText>
                        </ListItem>

                        <ListItem
                            style={{ color: " #fe0100", fontSize: "136%" }}
                            divider
                            component={Link}
                            to="/shop"
                            onClick={() => setOpenDrawer(false)}
                        >
                            <ListItemText disableTypography>Shop</ListItemText>
                        </ListItem>
                        <ListItem
                            style={{ color: " #fe0100", fontSize: "136%" }}
                            divider
                            component={Link}
                            to="/about"
                            onClick={() => setOpenDrawer(false)}
                        >
                            <ListItemText disableTypography>Contact us</ListItemText>
                        </ListItem>
                    </List>
                    {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /> */}
                </Paper>
            </SwipeableDrawer>
            <>
                {openDrawer === false ?
                    <IconButton
                        sx={styles.menuIconContainer}
                        onClick={() => setOpenDrawer(!openDrawer)}
                        disableRipple
                    >
                        <MenuIcon sx={styles.hamburgerMenuIcon} />
                    </IconButton>
                    :
                    <IconButton
                        sx={styles.menuIconContainer}
                        onClick={() => setOpenDrawer(!openDrawer)}
                        disableRipple
                    >
                        <CloseSharpIcon sx={styles.hamburgerMenuIcon} />
                    </IconButton>
                }
            </>

        </React.Fragment >
    );
};

const Header = () => {
    const isMobileMode = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Fragment>
            <AppBar
                position="fixed"
                sx={styles.appbar}
                style={{ backgroundColor: "#1c1c1c" }}
                elevation={9}
            >
                <Toolbar disableGutters={true}>
                    <Button
                        disableRipple
                        component={Link}
                        to="/home"
                        sx={styles.logoContainer}
                    >
                        <Box alt="company logo" />
                        <img src={Logo} style={{ height: "5vh", marginLeft: "15%" }} />
                    </Button>

                    {isMobileMode ?
                        <>
                            <Button
                                disableRipple
                                component={Link}
                                to="/cart"
                                sx={styles.logoContainer}
                                style={{ marginLeft: "50%" }}
                            >
                                <Box alt="company logo" />
                                <ShoppingCartIcon style={{ color: '#fe0100', margin: "0%" }} />
                            </Button>
                            <MobileNavigation />
                        </>
                        :
                        <>
                            <DesktopNavigation />
                            <Button
                                disableRipple
                                component={Link}
                                to="/cart"
                                sx={styles.logoContainer}
                            >
                                <Box alt="company logo" />
                                <ShoppingCartIcon style={{ color: '#fe0100' }} />
                            </Button>

                        </>
                    }

                </Toolbar>
            </AppBar>
        </Fragment>
    );
};

export default Header;
