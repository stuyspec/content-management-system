/**
 * Created by nicholas on 7/28/17.
 */
import React, { Component }         from 'react'
import Paper                        from 'material-ui/Paper'
import TextField                    from 'material-ui/TextField'
import SelectField                  from 'material-ui/SelectField'
import MenuItem                     from 'material-ui/MenuItem'
import RaisedButton                 from 'material-ui/RaisedButton'
import injectSheet                  from 'react-jss'
import {
  topLevelSectionsSelector,
  randomSectionSelector
}                                   from '../../sections/selectors'
import { connect }                  from 'react-redux'


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
    marginBottom: "2%"
  },
  parentSectionInput: {
    marginBottom: "2%"
  },
};

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

  handleParentChange = (event, index, value) => {
    this.setState({ parentSection: value})
  }

  render() {
    const { classes, topLevelSections, randomSection } = this.props;
    const { name, description, parentSection } = this.state;
    return (
      <div className={classes.formContainer}>
        <Paper zDepth={2} className={classes.form}>
          <h2> Section Form </h2>
          <form>
            <div className={classes.inputs}>
              <div className={classes.titleInput}>
                <TextField
                  floatingLabelText="Name"
                  hintText={randomSection.name}
                  value={name}
                  onChange={this.handleNameChange}
                />
              </div>
              <div className={classes.descriptionInput}>
                <TextField
                  multiLine
                  floatingLabelText="Description"
                  hintText={randomSection.description}
                  value={description}
                  onChange={this.handleDescriptionChange}
                />
              </div>
              <div className={classes.parentSectionInput}>
                <SelectField
                  value={parentSection}
                  onChange={this.handleParentChange}
                  floatingLabelText="Parent Section"
                >
                  { topLevelSections.map(section =>
                    <MenuItem
                      value={section.id}
                      primaryText={section.name}
                      key={section.id}
                    />
                  )}
                </SelectField>
              </div>
            </div>
            <div>
              <RaisedButton primary={true} label="Submit" />
            </div>
          </form>
        </Paper>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  topLevelSections: topLevelSectionsSelector(state),
  randomSection: randomSectionSelector(state)
})

export default connect(
  mapStateToProps
)(injectSheet(styles)(SectionForm));