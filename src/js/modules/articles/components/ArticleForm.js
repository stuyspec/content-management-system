import React, { Component } from "react";
import TitleInput from "./ArticleInputs/TitleInput";
import ContentInput from "./ArticleInputs/ContentInput";
import SectionInput from "./ArticleInputs/SectionInput";
import ContributorsList from "./ContributorsList";
import ContributorsInput from "./ArticleInputs/ContributorsInput";
import injectSheet from "react-jss";
import RaisedButton from "material-ui/RaisedButton";
import FormErrorDialog from '../../forms/components/FormErrorDialog'

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
      section: 2
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
    this.props.clearError();
  }

  handleSubmit = event => {
    const { title, content, section } = this.state;
    const { contributors, onSubmit, sections } = this.props;
    const formData = { title, content, sections, section, contributors };
    if (this.validateForm(formData)) {
      onSubmit(formData);
    }
  };

  validateForm = ({ title, content, sections, section, contributors }) => {
    // TODO: Make errors a stack, not just a string
    let validForm = true;
    if (title === undefined || !title.length > 0) {
      this.setState({titleError: "Title cannot be blank"})
      validForm = false
    }
    if (content === undefined || !content.length > 0) {
      this.props.throwError("Content cannot be blank");
      validForm = false
    }
    if (!sections.includes(section)) {
      this.props.throwError("Please choose a valid section")
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
      formError,
      availableUsers,
      randomUser,
      addContributor,
      sections,
      removeContributor } = this.props;
    const {
      title,
      section,
      content,
      titleError,
      contributorsError } = this.state;
    return (
    <div>
        <FormErrorDialog
          error={formError}
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
              sections={sections}
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
