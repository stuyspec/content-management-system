/**
 * Created by nicholas on 8/9/17.
 */
import React, { Component } from 'react'
import ArticleForm from './ArticleForm'
import Paper from 'material-ui/Paper'
import { connect } from 'react-redux'
import { editArticleSelectors } from '../selectors'
import { editArticleActions } from '../actions'
import { randomUserSelector } from '../../users/selectors'
import injectSheet from 'react-jss'

const styles = {
  editArticlePage:{
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
class EditArticlePage extends Component {

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

  componentWillMount(){
    if () {

    }
  }

  render() {
    const {
      contributors,
      formErrors,
      addContributor,
      removeContributor,
      availableUsers,
      randomUser,
      onSubmit,
      sections,
      throwError,
      clearError,
      classes
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
          formErrors={formErrors}
          addContributor={addContributor}
          removeContributor={removeContributor}
          throwError={throwError}
          clearError={clearError}
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
  articlesToEdit: state.articles.forms.edit.articlesToEdit,
  formErrors: state.articles.forms.edit.errors,
  availableUsers: editArticleSelectors.availableUsernamesSelector(state),
  contributors: editArticleSelectors.contributorsUsersSelector(state),
  randomUser: randomUserSelector(state),
  sections: state.sections.list
})

const mapDispatchToProps = dispatch => ({
  onSubmit: formData => {
    dispatch(editArticleActions.submitForm(formData));
  },
  saveArticleData: (title, content, section) => {
    dispatch(editArticleActions.pushArticleDraft(title, content, section));
  },
  clearError: () => {
    dispatch(editArticleActions.clearError());
  },
  throwError: error => {
    dispatch(editArticleActions.throwError(error))
  },
  addContributor: (contributorUsername) => {
    dispatch(editArticleActions.addContributor(contributorUsername))
  },
  removeContributor: id => {
    dispatch(editArticleActions.removeContributor(id));
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectSheet(styles)(EditArticlePage))