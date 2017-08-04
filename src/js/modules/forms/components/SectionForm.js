/**
 * Created by nicholas on 7/28/17.
 */
import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import injectSheet from 'react-jss'
import { createSection } from '../actions'
import { connect } from 'react-redux'

const styles = {
  formContainer: {
    padding: "5%"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    padding: "5%",

  },
  inputs: {
    marginLeft: "2%"
  },
  titleInput: {
    marginBottom: "2%"
  },
  descriptionInput: {
    padding: "2%"
  },
  button: {
    maxWidth: "100px",
    paddingLeft: "2%"
  }
}

class SectionForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      name: "",
      description: "",
      parentSection: 0,
    }
  }

  handleNameChange = event => {
    this.setState({ name: event.target.value })
  }

  handleDescriptionChange = event => {
    this.setState({ description: event.target.value })
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.createSection(this.state)
  }

  render() {
    const { classes, topLevelSections } = this.props;
    const { name, description, parentSection } = this.state;
    return (
      <div className={classes.formContainer}>
        <Paper zDepth={2} className={classes.form}>
          <h2> Section Form </h2>
          <form onSubmit={this.handleSubmit}>
            <div className={classes.titleInput}>
              <TextField
                floatingLabelText="Name"
                value={name}
                onChange={this.handleNameChange}
              />
            </div>
            <div className={classes.descriptionInput}>
              <TextField
                multiLine
                hintText="Description"
                value={description}
                onChange={this.handleDescriptionChange}
              />
            </div>
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
    )
  }
}

const mapDispatchToProps = dispatch => ({
  createSection: section => {
    dispatch(createSection(section))
  }
})

export default connect(
  null,
  mapDispatchToProps
)(injectSheet(styles)(SectionForm));