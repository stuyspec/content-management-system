/**
 * Created by nicholas on 7/9/17.
 */
import React, { Component } from "react"
import { connect } from 'react-redux'
import AutoComplete from 'material-ui/AutoComplete';
import { addContributor } from '../../actions'
import injectSheet from 'react-jss'
import { availableUsersNamesSelector,
         contributorsNamesSelector } from '../../selectors'
import { randomUserSelector } from '../../../users/selectors'

const styles = {
  addContributorButton: {
    margin: '10px',
  }
};


class ContributorsInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: '',
    };
  }

  handleUpdateInput = (searchText) => {
    this.setState({
      searchText: searchText,
    });
  };

  handleNewRequest = () => {
    const { availableUsers, contributors } = this.props;
    const { searchText } = this.state;
    if (availableUsers.includes(searchText) &&
      !contributors.includes(searchText)) {
      this.props.addContributor(searchText);
      this.setState({
        searchText: '',
      });
    }
  };

  render() {
    const { availableUsers, randomUser, errorText } = this.props
    return (
      <div>
        <AutoComplete
          errorText={errorText}
          hintText={randomUser.name}
          floatingLabelText="Contributors"
          searchText={this.state.searchText}
          onUpdateInput={this.handleUpdateInput}
          onNewRequest={this.handleNewRequest}
          dataSource={availableUsers}
          filter={AutoComplete.fuzzyFilter}
          openOnFocus={true}
        />
      </div>);
  }
}

const mapStateToProps = state => ({
  availableUsers: availableUsersNamesSelector(state),
  contributors: contributorsNamesSelector(state),
  randomUser: randomUserSelector(state)
});

const mapDispatchToProps = dispatch => ({
  addContributor: (contributorName) => {
    dispatch(addContributor(contributorName))
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectSheet(styles)(ContributorsInput))