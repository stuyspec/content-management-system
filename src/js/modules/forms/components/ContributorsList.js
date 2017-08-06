/**
 * Created by nicholas on 7/12/17.
 */
import React from 'react'
import { List, ListItem } from 'material-ui/List'
import Paper from 'material-ui/Paper'
import Avatar from 'material-ui/Avatar'
import IconButton from 'material-ui/IconButton'
import ContentClear from 'material-ui/svg-icons/content/clear'
import { connect } from 'react-redux'
import injectSheet from 'react-jss'
import { contributorsUsersSelector } from '../selectors'
import { removeContributor } from '../actions'

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
      { contributors.map(contributor =>
        <ListItem
          key={contributor.id}
          primaryText={contributor.name}
          leftAvatar={<Avatar src={contributor.thumbnail} />}
          rightIconButton={
            <IconButton
              onClick={(event) => {
                event.preventDefault();
                removeContributor(contributor.id)
              }}
            >
              <ContentClear />
            </IconButton>
          }
          />
      )}
    </List>
  </Paper>
);

const mapStateToProps = state => ({
  contributors: contributorsUsersSelector(state)
});

const mapDispatchToProps = dispatch => ({
  removeContributor: id => {
    dispatch(removeContributor(id));
  }
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectSheet(styles)(ContributorsList));