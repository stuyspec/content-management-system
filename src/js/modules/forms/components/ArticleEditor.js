import React, { Component }   from "react";
import ArticleTitleInput      from "./EditorInputs/TitleInput";
import ContentInput    from "./EditorInputs/ContentInput";
import SectionInput from "./EditorInputs/SectionInput";
import ContributorsList       from './ContributorsList'
import ContributorsInput      from "./EditorInputs/Contributors/ContributorsInput";
import injectSheet            from 'react-jss'
import { createArticle }      from './../actions'
import { connect }            from 'react-redux'
import Paper                  from 'material-ui/Paper'

const styles = {
  editorContainer: {
    padding: "5%"
  },
  editor: {
    display: "flex",
    flexDirection: "column",
    padding: "5%",

  },
  button: {
    maxWidth: "100px",
    paddingTop: "5%"
  }
}
class ArticleEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
      author: "",
      section: "A&E"
    };
  }

  handleContentChange = content => {
    this.setState({ content: content });
  };

  handleTitleChange = event => {
    this.setState({ title: event.target.searchText });
  };

  handleAuthorChange = event => {
    this.setState({ author: event.target.searchText });
  };

  handleSectionChange = event => {
    this.setState({ section: event.target.searchText })
  };

  handleSubmit = event => {
    event.preventDefault();
    const { title, content, author, section } = this.state;
    const { contributors, onSubmit } = this.props;
    onSubmit(title, content, author, section, contributors);
  };

  render() {
    const { classes, contributors } = this.props;
    return (
    <div className={classes.editorContainer}>
      <h2> Article Editor </h2>
      <Paper
        className={classes.editor}
        zDepth={2}
      >
      <form onSubmit={this.handleSubmit}>
        <ArticleTitleInput
          title={this.state.title}
          onTitleChange={this.handleTitleChange}
        />
        { contributors.length > 0 && <ContributorsList /> }
        <ContributorsInput
          author={this.state.author}
          onAuthorChange={this.handleAuthorChange}
        />

        <SectionInput
          section={this.state.section}
          onSectionChange={this.handleSectionChange}
        />
        <ContentInput
          content={this.state.content}
          onContentChange={this.handleContentChange}
        />

        <div className={classes.button}>
          <input type="submit" value="Submit" />
        </div>
      </form>
      </Paper>
    </div>
    );
  }
}

export default connect(
  state => ({
    contributors: state.forms.contributors
  }),
  dispatch => ({
    onSubmit: (title,
               content,
               author,
               section,
               contributors) => {
      dispatch(
        createArticle(title, content, author, section, contributors)
      )
    }
  }),

)(injectSheet(styles)(ArticleEditor));
