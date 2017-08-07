/**
 * Created by nicholas on 8/5/17.
 */
import React from 'react'
import ArticleForm from './ArticleForm'
import Paper from 'material-ui/Paper'
import { connect } from 'react-redux'
import {
  addContributorToCreateArticleForm,
  removeContributorFromCreateArticleForm } from '../actions'
import {
  availableUsersNamesSelector,
  contributorsUsersSelector } from '../selectors'
import { randomUserSelector } from '../../users/selectors'

import {
  saveArticleData,
  throwArticleError,
  submitArticleForm,
  clearArticleError } from "../actions";
import injectSheet from 'react-jss'

const styles = {
  createArticlePage:{
    padding: "5%"
  }
}

const CreateArticlePage = ({ contributors,
                             title,
                             content,
                             errors,
                             classes,
                             addContributor,
                             availableUsers,
                             removeContributor,
                             randomUser,
                             onSubmit }) => (
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
    />
  </Paper>
);


const mapStateToProps = state => ({
  title: state.forms.articles.create.currentDraft.title,
  content: state.forms.articles.create.currentDraft.content,
  errors: state.forms.articles.create.errors,
  availableUsers: availableUsersNamesSelector(state),
  contributors: contributorsUsersSelector(state),
  randomUser: randomUserSelector(state)
})

const mapDispatchToProps = dispatch => ({
  onSubmit: formData => {
    dispatch(submitArticleForm(formData));
  },
  saveArticleData: (title, content, section) => {
    dispatch(saveArticleData(title, content, section));
  },
  clearArticleError: () => {
    dispatch(clearArticleError());
  },
  throwArticleError: error => {
    dispatch(throwArticleError(error))
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