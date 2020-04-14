import React from 'react'

import { makeStyles } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Toolbar from '@material-ui/core/Toolbar'

import GetAppIcon from '@material-ui/icons/GetApp';
import PublishIcon from '@material-ui/icons/Publish';

const useStyles = makeStyles({
    appbar: {
        margin: '20px 0px'
    },
    moblileAppbar: {
        margin: '10px 0px'
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'center'
    },
    menuIconMobile: {
        fontSize: '35px'
    },
    menuIcon: {
        fontSize: '50px'
    }
})

const Title = ({ isMobileVersion, setIsLoadOpen, setIsSaveOpen }) => {
    const classes = useStyles()

    const handleLoadOpen = () => {
        setIsLoadOpen(true)
    }

    const handleSaveOpen = () => {
        setIsSaveOpen(true)
    }

    return (
        <AppBar color='transparent' position="static" className={isMobileVersion ? classes.moblileAppbar : classes.appbar}>
            <Toolbar className={classes.toolbar}>
                <IconButton edge='start' color="inherit" onClick={handleSaveOpen}>
                    <GetAppIcon color='secondary' className={isMobileVersion ? classes.menuIconMobile : classes.menuIcon} />
                    {!isMobileVersion && 'Save'}
                </IconButton>
                <Typography variant={isMobileVersion ? 'h4' : 'h1'} align='center'>Todo List</Typography>
                <IconButton edge='end' color="inherit" onClick={handleLoadOpen}>
                    <PublishIcon color='secondary' className={isMobileVersion ? classes.menuIconMobile : classes.menuIcon} />
                    {!isMobileVersion && 'Load'}
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}

export default Title
