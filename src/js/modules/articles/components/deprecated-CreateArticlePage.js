/**
 * Created by nicholas on 8/5/17.
 */
import React, { Component } from "react";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import { reduxForm, Field } from "redux-form";
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
    this.setState({ contributorsError: error });
  };

  handleTitleError = error => {
    this.setState({ titleError: error });
  };

  handleContentChange = content => {
    this.setState({ content: content });
  };

  handleTitleChange = event => {
    this.setState({ title: event.target.value });
  };

  handleSectionChange = (event, index, value) => {
    this.setState({ section: value });
  };

  handleSubmit = () => {
    const { title, content, section } = this.state;
    const { contributors } = this.props;
    const formData = { title, content, sectionId: section, contributors };
    this.props.onSubmit(formData);
  };

  renderSelect = ({ input, label, type, meta: { touched, error, warning } }) =>
    <SelectField {...input} floatingLabelText="Section">
      {sections.map(section =>
        <MenuItem
          value={section.id}
          key={section.id}
          primaryText={section.name}
        />
      )}
    </SelectField>;

  render() {
    const {
      contributors,
      formErrors,
      addContributor,
      removeContributor,
      availableUsernames,
      randomUser,
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
    return (
      <Paper className={classes.createArticlePage} zDepth={2}>
        <h2> Create Article </h2>
        <form>
          <Field
            name="Title"
            component={() => <TextField hintText="Title" />}
          />
          <Field name="Section" component={this.renderSelect} />
        </form>
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

export default reduxForm({
  form: "createArticleForm"
})(
  connect(mapStateToProps, mapDispatchToProps)(
    injectSheet(styles)(CreateArticlePage)
  )
);
