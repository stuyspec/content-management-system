/**
 * Created by nicholas on 7/28/17.
 */
import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import injectSheet from 'react-jss'


const styles = {
  formContainer: {
    padding: "5%"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    padding: "5%",

  },
  titleInput: {
    padding: "2%"
  },
  descriptionInput: {
    padding: "2%"
  }
}
class SectionForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      name: "",
      description: ""
    }
  }

  handleNameChange = event => {
    this.setState({ name: event.target.value })
  }

  handleDescriptionChange = event => {
    this.setState({ description: event.target.value })
  }

  render() {
    const { classes } = this.props;
    const { name, description } = this.state;
    return (
      <div className={classes.formContainer}>
        <Paper zDepth={2} className={classes.form}>
          <h2> Section Form </h2>
          <form>
            <div className={classes.titleInput}>
              <TextField
                floatingLabelText="Name"
                value={name}
                onChange={this.handleNameChange}
              />
            </div>
            <div className={classes.descriptionInput}>
              <TextField
                multiline
                hintText="Description"
                value={description}
                onChange={this.handleDescriptionChange}
              />
            </div>
          </form>
        </Paper>
      </div>
    )
  }
}


export default injectSheet(styles)(SectionForm);