import React, { Component }   from "react";
import TitleInput             from "./EditorInputs/TitleInput";
import ContentInput           from "./EditorInputs/ContentInput";
import SectionInput           from "./EditorInputs/SectionInput";
import ContributorsList       from './ContributorsList'
import ContributorsInput      from "./EditorInputs/Contributors/ContributorsInput";
import injectSheet            from 'react-jss'
import { createArticle }      from './../actions'
import { connect }            from 'react-redux'
import Paper                  from 'material-ui/Paper'
import { saveArticleData }    from './../actions'
import RaisedButton           from 'material-ui/RaisedButton'

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
    const { title, content, section} = this.props;
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
    this.setState({ section: value })
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
        <TitleInput
          title={this.state.title}
          onTitleChange={this.handleTitleChange}
        />
        { contributors.length > 0 && <ContributorsList /> }
        <ContributorsInput />

        <SectionInput
          section={this.state.section}
          onSectionChange={this.handleSectionChange}
        />
        <ContentInput
          content={this.state.content}
          onContentChange={this.handleContentChange}
        />

        <div className={classes.button}>
          <RaisedButton primary={true} label="Submit" />
        </div>
      </form>
      </Paper>
    </div>
    );
  }
}

export default connect(
  state => ({
    contributors: state.forms.contributors,
    title: state.forms.title,
    content: state.forms.content,
    section: state.forms.section
  }),
  dispatch => ({
    onSubmit: (title,
               content,
               section) => {
      dispatch(
        createArticle(title, content, section)
      )
    },
    saveArticleData: (title, content, section ) => {
      dispatch(saveArticleData(title, content, section))
    }
  }),
)(injectSheet(styles)(ArticleEditor));
