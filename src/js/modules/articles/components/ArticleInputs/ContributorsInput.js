/**
 * Created by nicholas on 7/9/17.
 */
import React, { Component } from "react"
import AutoComplete from 'material-ui/AutoComplete';

import injectSheet from 'react-jss'

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
    const { availableUsernames, contributors } = this.props;
    const { searchText } = this.state;
    const contributorNames = contributors.map(
      contributor => contributor.username
    )
    if (availableUsernames.includes(searchText) &&
      !contributorNames.includes(searchText)) {
      this.props.addContributor(searchText);
      this.setState({
        searchText: '',
      });
    }
  };

  render() {
    const { availableUsernames, randomUser, errorText } = this.props
    return (
      <div>
        <AutoComplete
          errorText={errorText}
          hintText={randomUser.name}
          floatingLabelText="Contributors"
          searchText={this.state.searchText}
          onUpdateInput={this.handleUpdateInput}
          onNewRequest={this.handleNewRequest}
          dataSource={availableUsernames}
          filter={AutoComplete.fuzzyFilter}
          openOnFocus={true}
        />
      </div>);
  }
}

export default ContributorsInput;