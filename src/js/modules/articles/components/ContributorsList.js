/**
 * Created by nicholas on 7/12/17.
 */
import React from 'react'
import { List, ListItem } from 'material-ui/List'
import Paper from 'material-ui/Paper'
import Avatar from 'material-ui/Avatar'
import IconButton from 'material-ui/IconButton'
import ContentClear from 'material-ui/svg-icons/content/clear'
import injectSheet from 'react-jss'

const styles = {
  contributorsList: {
    maxWidth: "250px",
  }
};

const ContributorsList = ({ contributors,
                            classes,
                            removeContributor }) => (
  <Paper
    className={classes.contributorsList}
    zDepth={1}>
    <List>
      {contributors.map(contributor =>
        <ListItem
          key={contributor.id}
          primaryText={
            `${contributor.firstName}
            ${contributor.lastName}
            (${contributor.username})`
          }
          leftAvatar={<Avatar src={contributor.thumbnail}/>}
          rightIconButton={
            <IconButton
              onClick={(event) => {
                event.preventDefault();
                removeContributor(contributor.id)
              }}
            >
              <ContentClear/>
            </IconButton>
          }
        />
      )}
    </List>
  </Paper>
);


export default injectSheet(styles)(ContributorsList);