/**
 * Created by nicholas on 8/5/17.
 */
import React, { Component } from 'react'
import ArticleForm from './ArticleForm'
import Paper from 'material-ui/Paper'
import { connect } from 'react-redux'
import { createArticleActions } from '../actions'
import {
  createArticle
} from '../selectors'

import { randomUserSelector } from '../../users/selectors'

import injectSheet from 'react-jss'

const styles = {
  createArticlePage:{
    padding: "5%"
  }
}


class CreateArticlePage extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {
      contributors,
      formError,
      addContributor,
      removeContributor,
      availableUsers,
      randomUser,
      onSubmit,
      sections,
      classes,
      title,
      content,
      throwError,
      clearError
    } = this.props;
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
          formError={formError}
          addContributor={addContributor}
          removeContributor={removeContributor}
          availableUsers={availableUsers}
          randomUser={randomUser}
          onSubmit={onSubmit}
          sections={sections}
          throwError={throwError}
          clearError={clearError}
        />
      </Paper>
    );
  }
}


const mapStateToProps = state => ({
  title: state.articles.forms.create.currentDraft.title,
  content: state.articles.forms.create.currentDraft.content,
  formError: state.articles.forms.create.error,
  availableUsers: createArticle.availableUsersNamesSelector(state),
  contributors: createArticle.contributorsUsersSelector(state),
  randomUser: randomUserSelector(state),
  sections: state.sections.list
})

const mapDispatchToProps = dispatch => ({
  onSubmit: formData => {
    dispatch(createArticleActions.submitForm(formData));
  },
  saveArticleData: (title, content, section) => {
    dispatch(createArticleActions.saveArticleData(title, content, section));
  },
  clearError: () => {
    dispatch(createArticleActions.clearError());
  },
  throwError: error => {
    dispatch(createArticleActions.throwError(error))
  },
  addContributor: (contributorName) => {
    dispatch(createArticleActions.addContributor(contributorName))
  },
  removeContributor: id => {
    dispatch(createArticleActions.removeContributor(id));
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectSheet(styles)(CreateArticlePage))