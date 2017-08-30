import React, { Component } from "react";
import TitleInput from "./ArticleInputs/TitleInput";
import ContentInput from "./ArticleInputs/ContentInput";
import SectionInput from "./ArticleInputs/SectionInput";
import ContributorsList from "./ContributorsList";
import ContributorsInput from "./ArticleInputs/ContributorsInput";
import injectSheet from "react-jss";
import RaisedButton from "material-ui/RaisedButton";
import FormErrorDialog from "../../forms/components/FormErrorDialog";

const styles = {
  button: {
    maxWidth: "100px",
    paddingTop: "5%"
  }
};

class ArticleForm extends Component {
  handleDialogCancel = () => {
    this.props.dequeueError();
  };

  handleSubmit = event => {
    const {
      title,
      content,
      sections,
      section,
      contributors,
      onSubmit
    } = this.props;
    if (this.validateForm(title, content, sections, section, contributors)) {
      onSubmit();
    }
  };

  validateForm = (title, content, sections, sectionId, contributors) => {
    // TODO: Make errors a stack, not just a string
    let validForm = true;
    const { handleTitleError, handleContributorsError } = this.props;
    if (title === undefined || !title.length > 0) {
      handleTitleError("Title cannot be blank");
      validForm = false;
    }
    if (content === undefined || !content.length > 0) {
      this.props.enqueueError("Content cannot be blank");
      validForm = false;
    }
    if (!sections.find(section => section.id === sectionId)) {
      this.props.enqueueError("Please choose a valid section");
      validForm = false;
    }
    if (!contributors.length > 0) {
      handleContributorsError("Contributors cannot be blank");
      validForm = false;
    }
    return validForm;
  };

  render() {
    const {
      classes,
      contributors,
      formErrors,
      availableUsernames,
      randomUser,
      addContributor,
      removeContributor,
      sections,
      handleTitleChange,
      handleSectionChange,
      handleContentChange,
      title,
      content,
      section,
      titleError,
      contributorsError
    } = this.props;
    return (
      <div>
        <FormErrorDialog
          formErrors={formErrors}
          onRetry={this.handleSubmit}
          onCancel={this.handleDialogCancel}
        />
        <form onSubmit={this.handleSubmit}>
          <TitleInput
            errorText={titleError}
            title={title}
            hintText={"Enter a title"}
            handleTitleChange={handleTitleChange}
          />
          {contributors.length > 0 &&
            <ContributorsList
              contributors={contributors}
              removeContributor={removeContributor}
            />}
          <ContributorsInput
            errorText={contributorsError}
            availableUsernames={availableUsernames}
            contributors={contributors}
            randomUser={randomUser}
            addContributor={addContributor}
          />

          <SectionInput
            section={section}
            sections={sections}
            handleSectionChange={handleSectionChange}
          />

          <ContentInput
            content={content}
            handleContentChange={handleContentChange}
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
