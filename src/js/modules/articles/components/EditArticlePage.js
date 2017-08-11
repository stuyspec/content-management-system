/**
 * Created by nicholas on 8/9/17.
 */
import React, { Component } from 'react'
import ArticleForm from './ArticleForm'
import Paper from 'material-ui/Paper'
import { connect } from 'react-redux'
import {
  addContributorToEditArticleForm,
  removeContributorFromEditArticleForm } from '../../forms/actions'
import {
  availableUsersNamesSelector,
  contributorsUsersSelector } from '../../forms/selectors'
import { randomUserSelector } from '../../users/selectors'

import {
  saveCreateArticleFormData,
  clearCreateArticleError,
  throwCreateArticleError,
  submitCreateArticleForm } from "../../forms/actions";
import injectSheet from 'react-jss'

const styles = {
  createArticlePage:{
    padding: "5%"
  }
}

/*
Props:
  contributors,
  title,
  content,
  errors,
  classes,
  addContributor,
  availableUsers,
  removeContributor,
  randomUser,
  onSubmit
*/
class CreateArticlePage extends Component {

  constructor(props) {
    super(props);
    const { title, content, section } = this.props;
    this.state = {
      title,
      content,
      section,
      titleError: "",
      contributorsError: ""
    };
  }

  render() {
    const {
      contributors,
      errors,
      addContributor,
      removeContributor,
      availableUsers,
      randomUser,
      onSubmit,
      sections
    } = this.props;
    const {
      title,
      content,
      section
    } = this.state;
    return (
      <Paper
        className={classes.createArticlePage}
        zDepth={2}
      >
        <h2> Create Article </h2>
        <ArticleForm
          contributors={contributors}
          title={title}
          content={content}
          errors={errors}
          addContributor={addContributor}
          removeContributor={removeContributor}
          availableUsers={availableUsers}
          randomUser={randomUser}
          onSubmit={onSubmit}
          sections={sections}
          section={section}
        />
      </Paper>
    );
  }
}


const mapStateToProps = state => ({
  title: state.forms.articles.create.currentDraft.title,
  content: state.forms.articles.create.currentDraft.content,
  errors: state.forms.articles.create.errors,
  availableUsers: availableUsersNamesSelector(state),
  contributors: contributorsUsersSelector(state),
  randomUser: randomUserSelector(state),
  sections: state.sections.list
})

const mapDispatchToProps = dispatch => ({
  onSubmit: formData => {
    dispatch(submitCreateArticleForm(formData));
  },
  saveArticleData: (title, content, section) => {
    dispatch(saveCreateArticleFormData(title, content, section));
  },
  clearArticleError: () => {
    dispatch(clearCreateArticleError());
  },
  throwArticleError: error => {
    dispatch(throwCreateArticleError(error))
  },
  addContributor: (contributorName) => {
    dispatch(addContributorToCreateArticleForm(contributorName))
  },
  removeContributor: id => {
    dispatch(removeContributorFromCreateArticleForm(id));
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectSheet(styles)(CreateArticlePage))