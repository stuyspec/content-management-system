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
import { openNavDrawer } from './../actions'

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
  }
}

const Navbar = ({ navbarLinks, classes, openNavDrawer }) => (
  <Toolbar style={styles.toolbar}>
    <ToolbarGroup key={1}>
      <IconButton onClick={openNavDrawer}>
        <NavigationMenu color={blue50} />
      </IconButton>
      <Link to="/" className={classes.toolbarTitle}>
        <ToolbarTitle
          text="The Stuyvesant Spectator"
        />
      </Link>
    </ToolbarGroup>
    <ToolbarGroup key={2}>
      <Link to="/articles/new">
        <RaisedButton
          className={classes.createArticleButton}
          label="New Article"
        />
      </Link>
    </ToolbarGroup>
  </Toolbar>
);

const mapDispatchToProps = dispatch => ({
  openNavDrawer: () => {
    dispatch(openNavDrawer())
  }
});

export default connect(
  null,
  mapDispatchToProps
)(injectSheet(styles)(Navbar))
