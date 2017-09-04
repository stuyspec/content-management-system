/**
 * Created by nicholas on 8/9/17.
 */
import React, { Component } from "react";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField"
import { reduxForm, Field } from "redux-form";
import SectionInput from "./ArticleInputs/SectionInput"
import { connect } from "react-redux";
import { editArticleSelectors } from "../selectors";
import { editArticleActions } from "../actions";
import { randomUserSelector } from "../../users/selectors";
import { push } from "connected-react-router";
import injectSheet from "react-jss";

const styles = {
  editArticlePage: {
    padding: "5%"
  }
};

class EditArticlePage extends Component {
  constructor(props) {
    super(props);
    const { articlesToEdit, popArticleDraft, addContributors } = this.props;
    if (articlesToEdit.length > 0) {
      const { id, title, content, section, contributors } = articlesToEdit[0];
      popArticleDraft();
      addContributors(contributors);
      this.state = {
        id,
        title,
        content,
        section,
        titleError: "",
        contributorsError: ""
      };
    }
  }

  componentWillMount() {
    const { articlesToEdit, push } = this.props;
    if (articlesToEdit.length === 0) {
      push("/404");
    }
  }

  componentWillUnmount() {
    const { id, title, content, section } = this.state;
    const { contributors } = this.props;
    this.pushArticleDraft(id, title, content, section, contributors);
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
      throwError,
      clearError,
      classes
    } = this.props;
    const { title, content, section } = this.state;
    return (
      <Paper className={classes.editArticlePage} zDepth={2}>
        <h2>
          {" "}Editing "{title}"
        </h2>
        <form>
          <Field name="Title" component={<TextField hintText="Title"/>} />
          <Field name="Section" component={<SectionInput sections={sections}/>} />
        </form>
      </Paper>
    );
  }
}

const mapStateToProps = state => ({
  articlesToEdit: state.articles.forms.edit.articlesToEdit,
  formErrors: state.articles.forms.edit.errors,
  availableUsernames: editArticleSelectors.availableUsernamesSelector(state),
  contributors: editArticleSelectors.contributorsUsersSelector(state),
  randomUser: randomUserSelector(state),
  sections: state.sections.list
});

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
    dispatch(editArticleActions.throwError(error));
  },
  popArticleDraft: () => {
    dispatch(editArticleActions.popArticleDraft());
  },
  pushArticleDraft: (articleId, title, content, section) => {
    dispatch(
      editArticleActions.pushArticleDraft({
        title,
        content,
        section,
        articleId
      })
    );
  },
  addContributor: contributorUsername => {
    dispatch(editArticleActions.addContributor(contributorUsername));
  },
  addContributors: contributorIds => {
    dispatch(editArticleActions.addContributors(contributorIds));
  },
  removeContributor: id => {
    dispatch(editArticleActions.removeContributor(id));
  },
  push: route => {
    dispatch(push(route));
  }
});

export default reduxForm({
  form: "editArticlePage"
})(
  connect(mapStateToProps, mapDispatchToProps)(
    injectSheet(styles)(EditArticlePage)
  )
);
