/**
 * Created by nicholas on 8/5/17.
 */
import React, { Component } from "react";
import ArticleForm from "./ArticleForm";
import Paper from "material-ui/Paper";
import { connect } from "react-redux";
import { createArticleActions } from "../actions";
import { createArticle } from "../selectors";

import { randomUserSelector } from "../../users/selectors";

import injectSheet from "react-jss";

const styles = {
  createArticlePage: {
    padding: "5%"
  }
};

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

  handleContributorsError = error => {
    this.setState({ contributorsError: error })
  }

  handleTitleError = error => {
    this.setState({ titleError: error })
  }

  handleContentChange = content => {
    this.setState({ content: content });
  };

  handleTitleChange = event => {
    this.setState({ title: event.target.value });
  };

  handleSectionChange = (event, index, value) => {
    this.setState({ section: value });
  };

  render() {
    const {
      contributors,
      formErrors,
      addContributor,
      removeContributor,
      availableUsernames,
      randomUser,
      onSubmit,
      sections,
      classes,
      enqueueError,
      dequeueError
    } = this.props;
    const {
      title,
      content,
      section,
      titleError,
      contributorsError
    } = this.state;
    console.log(availableUsernames)
    return (
      <Paper className={classes.createArticlePage} zDepth={2}>
        <h2> Create Article </h2>
        <ArticleForm
          contributors={contributors}
          title={title}
          content={content}
          section={section}
          titleError={titleError}
          contributorsError={contributorsError}
          formErrors={formErrors}
          addContributor={addContributor}
          removeContributor={removeContributor}
          availableUsernames={availableUsernames}
          handleContentChange={this.handleContentChange}
          handleTitleChange={this.handleTitleChange}
          handleSectionChange={this.handleSectionChange}
          handleTitleError={this.handleTitleError}
          handleContributorsError={this.handleContributorsError}
          randomUser={randomUser}
          onSubmit={onSubmit}
          sections={sections}
          enqueueError={enqueueError}
          dequeueError={dequeueError}
        />
      </Paper>
    );
  }
}

const mapStateToProps = state => ({
  title: state.articles.forms.create.currentDraft.title,
  content: state.articles.forms.create.currentDraft.content,
  formErrors: state.articles.forms.create.errors,
  availableUsernames: createArticle.availableUsernamesSelector(state),
  contributors: createArticle.contributorsUsersSelector(state),
  randomUser: randomUserSelector(state),
  sections: state.sections.list
});

const mapDispatchToProps = dispatch => ({
  onSubmit: formData => {
    dispatch(createArticleActions.submitForm(formData));
  },
  saveArticleData: (title, content, section) => {
    dispatch(createArticleActions.saveArticleData(title, content, section));
  },
  enqueueError: error => {
    dispatch(createArticleActions.enqueueError(error));
  },
  dequeueError: () => {
    dispatch(createArticleActions.dequeueError());
  },
  addContributor: contributorName => {
    dispatch(createArticleActions.addContributor(contributorName));
  },
  removeContributor: id => {
    dispatch(createArticleActions.removeContributor(id));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  injectSheet(styles)(CreateArticlePage)
);
