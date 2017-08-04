import React, { Component } from "react";
import TitleInput from "./ArticleInputs/TitleInput";
import ContentInput from "./ArticleInputs/ContentInput";
import SectionInput from "./ArticleInputs/SectionInput";
import ContributorsList from "./ContributorsList";
import ContributorsInput from "./ArticleInputs/ContributorsInput";
import injectSheet from "react-jss";
import { connect } from "react-redux";
import Paper from "material-ui/Paper";
import { saveArticleData, createArticle } from "./../actions";
import RaisedButton from "material-ui/RaisedButton";

const styles = {
  formContainer: {
    padding: "5%"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    padding: "5%"
  },
  button: {
    maxWidth: "100px",
    paddingTop: "5%"
  }
};
class ArticleForm extends Component {
  constructor(props) {
    super(props);
    const { title, content, section } = this.props;
    this.state = {
      title,
      content,
      section
    };
  }

  componentWillUnmount() {
    const { title, content, section } = this.state;
    this.props.saveArticleData(title, content, section);
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

  handleSubmit = event => {
    const { title, content, section } = this.state;
    const { contributors, onSubmit } = this.props;
    onSubmit({title, content, section, contributors});
  };

  render() {
    const { classes, contributors } = this.props;
    const { title, section, content } = this.state;
    return (
    <div className={classes.formContainer}>
      <Paper
        className={classes.form}
        zDepth={2}
      >
        <h2> Article Form </h2>
        <form onSubmit={this.handleSubmit}>
        <TitleInput
          title={title}
          hintText={"Enter a title"}
          handleTitleChange={this.handleTitleChange}
        />
        { contributors.length > 0 && <ContributorsList /> }
        <ContributorsInput />

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
        </Paper>
      </div>
    );
  }
}

export default connect(
  state => ({
    contributors: state.forms.article.contributors,
    title: state.forms.title,
    content: state.forms.content,
    section: state.forms.section,
  }),
  dispatch => ({
    onSubmit: (title, content, section) => {
      dispatch(createArticle(title, content, section));
    },
    saveArticleData: (title, content, section) => {
      dispatch(saveArticleData(title, content, section));
    }
  })
)(injectSheet(styles)(ArticleForm));
