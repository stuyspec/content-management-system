import React, { Component } from "react";
import TitleInput from "./ArticleInputs/TitleInput";
import ContentInput from "./ArticleInputs/ContentInput";
import SectionInput from "./ArticleInputs/SectionInput";
import ContributorsList from "./ContributorsList";
import ContributorsInput from "./ArticleInputs/ContributorsInput";
import injectSheet from "react-jss";
import RaisedButton from "material-ui/RaisedButton";
import FormErrorDialog from './FormErrorDialog'

const styles = {
  button: {
    maxWidth: "100px",
    paddingTop: "5%"
  }
};

class ArticleForm extends Component {
  constructor(props) {
    super(props);
    const { title, content } = this.props;
    this.state = {
      title,
      content,
      section: 1,
      titleError: "",
      contributorsError: ""
    };
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

  handleDialogCancel = () => {
    this.props.clearArticleError();
  }

  handleSubmit = event => {
    const { title, content, section } = this.state;
    const { contributors, onSubmit } = this.props;
    const formData = { title, content, section, contributors };
    if (this.validateForm(formData)) {
      onSubmit(formData);
    }
  };

  validateForm = ({ title, content, section, contributors }) => {
    let validForm = true;
    if (!title.length > 0) {
      this.setState({titleError: "Title cannot be blank"})
      validForm = false
    }
    if (!content.length > 0) {
      this.props.throwArticleError("Content cannot be blank");
      validForm = false
    }
    if (!contributors.length > 0) {
      this.setState({contributorsError: "Contributors cannot be blank"})
      validForm = false
    }
    return validForm
  }

  render() {
    const {
      classes,
      contributors,
      errors,
      availableUsers,
      randomUser,
      addContributor,
      removeContributor } = this.props;
    const {
      title,
      section,
      content,
      titleError,
      contributorsError } = this.state;
    const isErrorDialogOpen = errors.length > 0;
    return (
    <div>
        <FormErrorDialog
          isErrorDialogOpen={isErrorDialogOpen}
          error={errors}
          onRetry={this.handleSubmit}
          onCancel={this.handleDialogCancel}
        />
        <form onSubmit={this.handleSubmit}>
        <TitleInput
          errorText={titleError}
          title={title}
          hintText={"Enter a title"}
          handleTitleChange={this.handleTitleChange}
        />
        {
          contributors.length > 0 &&
          <ContributorsList
            contributors={contributors}
            removeContributor={removeContributor}
          />
        }
        <ContributorsInput
          errorText={contributorsError}
          availableUsers={availableUsers}
          contributors={contributors}
          randomUser={randomUser}
          addContributor={addContributor}
        />

            <SectionInput
              section={section}
              handleSectionChange={this.handleSectionChange}
            />


            <ContentInput
              content={content}
              handleContentChange={this.handleContentChange}
            />

            <div className={classes.button}>
              <RaisedButton
                primary={true}
                label="Submit"
                onClick={this.handleSubmit}
              />
            </div>
          </form>
      </div>
    );
  }
}

export default injectSheet(styles)(ArticleForm);
