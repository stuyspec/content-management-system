/**
 * Created by nicholas on 7/18/17.
 */
import React from 'react'
import { Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import { blue900, blue50 } from 'material-ui/styles/colors'
import NavigationMenu from 'material-ui/svg-icons/navigation/menu'
import IconButton from 'material-ui/IconButton'
import { Link } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import injectSheet from 'react-jss'
import { connect } from 'react-redux'
import { openNavDrawer, openUserDrawer } from './../actions'
import Avatar from 'material-ui/Avatar'
import { currentUserSelector } from '../../users/selectors'


const styles = {
  toolbar: {
    backgroundColor: "white",
    height: '80px',
    mozBoxShadow: '0 0 40px px #C0C0C0',
    webkitBoxShadow: '0 0 40px 5px #C0C0C0',
  },
  tab: {
    color: "white",
  },
  toolbarTitle: {
    textDecoration: 'none',
  },
  createArticleButton: {
    fontFamily: "Roboto, sans-serif",
  },
  "createArticleButton:hover": {
    backgroundColor: "green",
    color: "black"
  },
  currentUserAvatar: {
    margin: "0 20px 0 25px"
  },
  divTipTipText: {
  color: "white",
  fontWeight: "bold",
}
}
     
const Navbar = ({ classes,
                  openNavDrawer,
                  openUserDrawer,
                  currentUser }) => (
  <Toolbar style={styles.toolbar}>
    <ToolbarGroup key={1}>
      <IconButton onClick={openNavDrawer}>
        <NavigationMenu color={"rgb(0, 188, 212)"} />
      </IconButton>
      <Link to="/" className={classes.toolbarTitle}>
        <img src="/img/logo.svg" />
      </Link>
    </ToolbarGroup>
    <ToolbarGroup key={2}>
      <Link to="/articles/new" className={classes.tab}>
        <RaisedButton
          className={classes.createArticleButton}
          label="New Article"
          labelColor="White"
          backgroundColor="rgb(0, 188, 212)"
        />
      </Link>
      <Avatar
        onClick={openUserDrawer}
        className={classes.currentUserAvatar}
        src={currentUser.thumbnail}
      />
    </ToolbarGroup>
  </Toolbar>
);

const mapStateToProps = state => ({
  currentUser: currentUserSelector(state)
});

const mapDispatchToProps = dispatch => ({
  openNavDrawer: () => {
    dispatch(openNavDrawer())
  },
  openUserDrawer: () => {
    dispatch(openUserDrawer())
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectSheet(styles)(Navbar))
