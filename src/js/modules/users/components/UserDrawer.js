/**
 * Created by nicholas on 7/21/17.
 */
import React from 'react'
import { currentUserSelector } from './../selectors'
import { connect } from 'react-redux'
import injectSheet from 'react-jss'
import Avatar from 'material-ui/Avatar'
import Drawer from 'material-ui/Drawer'
import { List, ListItem } from 'material-ui/List'
import { closeUserDrawer } from '../../main/actions'

const styles = {
  currentUserName: {
    fontWeight: "lighter",
    display: "block",
    textAlign: "center",
    marginTop: "10%"
  },
  currentUserAvatar: {
    display: "flex",
    marginLeft: "10%"
  }
}
const UserDrawer = ({ currentUser,
                      isUserDrawerOpen,
                      classes,
                      closeUserDrawer }) => (
  <Drawer
    docked={false}
    openSecondary
    open={isUserDrawerOpen}
    onRequestChange={closeUserDrawer}
  >
    <h2 className={classes.currentUserName}>
      { currentUser.firstName }
    </h2>
    <Avatar
      src={currentUser.largePhoto}
      size={200}
      className={classes.currentUserAvatar}
    />
    <List>
      <ListItem>
        My Account
      </ListItem>
      <ListItem>
        Settings
      </ListItem>
    </List>
  </Drawer>
)

const mapStateToProps = state => ({
  currentUser: currentUserSelector(state),
  isUserDrawerOpen: state.main.isUserDrawerOpen
});

const mapDispatchToProps = dispatch => ({
  closeUserDrawer: () => {
    dispatch(closeUserDrawer())
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectSheet(styles)(UserDrawer));

