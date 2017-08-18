/**
 * Created by nicholas on 7/28/17.
 */
import React, { Component } from "react";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import injectSheet from "react-jss";
import { createSection } from "../actions";
import { connect } from "react-redux";
import { topLevelSectionsSelector } from "../selectors";

const styles = {
  formContainer: {
    padding: "5%"
  },
  form: {
    display: "flex",
    flexDirection: "column"
  },
  input: {
    margin: "10px"
  },
  button: {
    maxWidth: "100px",
    paddingLeft: "2%"
  }
};

class SectionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      parentSection: 0
    };
  }

  handleNameChange = event => {
    this.setState({ name: event.target.value });
  };

  handleDescriptionChange = event => {
    this.setState({ description: event.target.value });
  };

  handleSectionChange = (event, index, value) => {
    this.setState({ parentSection: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { name, description, parentSection } = this.state;
    if (parentSection === -1) {
      this.props.createSection({ name, description });
    } else {
      this.props.createSection({ name, description, parentId: parentSection });
    }
  };

  render() {
    const { classes, topLevelSections } = this.props;
    const { name, description, parentSection } = this.state;
    return (
      <Paper zDepth={2} className={classes.formContainer}>
        <h2> New Section </h2>
        <form onSubmit={this.handleSubmit} className={classes.form}>
          <div>
            <div className={classes.input}>
              <TextField
                floatingLabelText="Name"
                value={name}
                onChange={this.handleNameChange}
              />
            </div>
            <div className={classes.input}>
              <TextField
                multiLine
                hintText="Description"
                value={description}
                onChange={this.handleDescriptionChange}
              />
            </div>
            <div className={classes.input}>
              <SelectField
                floatingLabelText="Parent Section"
                value={parentSection}
                onChange={this.handleSectionChange}
              >
                <MenuItem value={-1} primaryText="None" />
                {topLevelSections.map(section =>
                  <MenuItem value={section.id} primaryText={section.name} />
                )}
              </SelectField>
            </div>
            <div className={classes.button}>
              <RaisedButton
                primary={true}
                label="Submit"
                onClick={this.handleSubmit}
              />
            </div>
          </div>
        </form>
      </Paper>
    );
  }
}

const mapStateToProps = state => ({
  topLevelSections: topLevelSectionsSelector(state)
});
const mapDispatchToProps = dispatch => ({
  createSection: section => {
    dispatch(createSection(section));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  injectSheet(styles)(SectionForm)
);
