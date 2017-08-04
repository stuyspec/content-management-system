/**
 * Created by nicholas on 7/19/17.
 */
import React from 'react'
import { List, ListItem } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import Paper from 'material-ui/Paper'
import { connect } from 'react-redux'
import injectSheet from 'react-jss'

const styles = {
  usersList: {
    padding: '4%',
    margin: '5%',
    maxWidth: '300px'
  }
}
const UsersList = ({ users, classes }) => (
  <Paper zDepth={1} className={classes.usersList}>
    <List>
      { users.map(user =>
        <ListItem
          leftAvatar={<Avatar src={user.thumbnail} />}
          primaryText={user.name}
        />
      )}
    </List>
  </Paper>
)

const mapStateToProps = state => ({
  users: state.users.articles
})
export default connect(
  mapStateToProps,
  null
)(injectSheet(styles)(UsersList))