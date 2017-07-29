/**
 * Created by nicholas on 7/18/17.
 */
import React from 'react'
import { connect } from 'react-redux'
import Drawer from 'material-ui/Drawer'
import { List, ListItem } from 'material-ui/List'
import injectSheet from 'react-jss'
import { Link } from 'react-router-dom'

import { closeNavDrawer } from './../actions'

const styles = {
  specLogo: {
    display: "block",
    textAlign: "center",
    marginTop: "10%"
  },
  navLink: {
    textDecoration: "none",
    color: "black"
  }
}
const NavDrawer = ({ isNavDrawerOpen, closeNavDrawer, classes }) => (
  <Drawer open={isNavDrawerOpen}
          docked={false}
          onRequestChange={closeNavDrawer}
  >
    <List>
      <div className={classes.specLogo}>
        <img
          src="img/spec-logo.png"
        />
      </div>
      <ListItem
        key={1}
        primaryText="Articles"
        primaryTogglesNestedList={true}
        nestedItems={[
            <ListItem
              key={1}
              primaryText="List"
              containerElement={<Link to="/articles" />}
            />,
            <ListItem
              key={2}
              primaryText="New"
              containerElement={<Link to="/articles/new" />}
            />
        ]}
      />
      <ListItem
        key={2}
        primaryText="Users"
        primaryTogglesNestedList={true}
        nestedItems={[
          <ListItem
            key={1}
            primaryText="List"
            containerElement={<Link to="/users" />}
          />,
          <ListItem
            key={2}
            primaryText="New"
            containerElement={<Link to="/users/new" />}
          />
        ]}
      />
      <ListItem
        key={3}
        primaryText="Sections"
        primaryTogglesNestedList={true}
        nestedItems={[
          <ListItem
            key={1}
            primaryText="List"
            containerElement={<Link to="/sections" />}
          />,
          <ListItem
            key={2}
            primaryText="New"
            containerElement={<Link to="/sections/new" />}
          />
        ]}
      />
    </List>
  </Drawer>
)

const mapStateToProps = state => ({
  isNavDrawerOpen: state.main.isNavDrawerOpen
});

const mapDispatchToProps = dispatch => ({
  closeNavDrawer: () => {
    dispatch(closeNavDrawer())
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectSheet(styles)(NavDrawer))