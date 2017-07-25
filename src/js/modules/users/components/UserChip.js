/**
 * Created by nicholas on 7/25/17.
 */
import React from 'react'
import Chip from 'material-ui/Chip'
import Avatar from 'material-ui/Avatar'
import injectSheet from 'react-jss'

const styles = {
  userChip: {
    margin: "10px"
  }
}

const UserChip = ({ user, classes }) => (
  <div className={classes.userChip}>
    <Chip>
      <Avatar src={user.thumbnail} />
      { user.name }
    </Chip>
  </div>
)

export default injectSheet(styles)(UserChip)