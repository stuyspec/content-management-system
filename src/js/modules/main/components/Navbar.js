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
import ReactSVG from 'react-svg'

const styles = {
  toolbar: {
    backgroundColor: blue900,
  },
  toolbarTitle: {
    color: blue50,
    textDecoration: 'none',
  },
  createArticleButton: {
    fontFamily: "Roboto, sans-serif"
  },
  "createArticleButton:hover": {
    backgroundColor: "blue"
  },
  currentUserAvatar: {
    margin: "0 20px 0 25px"
  },
  masthead: {
    width: "10em",
    padding: "5px 10px 5px 10px",
    backgroundColor: "white"
  }
}

const Navbar = ({ classes,
                  openNavDrawer,
                  openUserDrawer,
                  currentUser }) => (
  <Toolbar style={styles.toolbar}>
    <ToolbarGroup key={1}>
      <IconButton onClick={openNavDrawer}>
        <NavigationMenu color={blue50} />
      </IconButton>
      <Link to="/" className={classes.toolbarTitle}>
        <ReactSVG className={classes.masthead} path="/img/masthead.svg" />
      </Link>
    </ToolbarGroup>
    <ToolbarGroup key={2}>
      <Link to="/articles/new">
        <RaisedButton
          className={classes.createArticleButton}
          label="New Article"
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
