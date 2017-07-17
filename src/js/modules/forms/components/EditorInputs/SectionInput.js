/**
 * Created by nicholas on 7/9/17.
 */
import React from 'react'
import { connect } from 'react-redux'
import injectSheet from 'react-jss'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

const styles = {
  ArticleDepartmentInput: {
    maxWidth: "200px",
    wordSpacing: "10px",
  }
};

const SectionInput = ({ classes,
                           currentSection,
                           onSectionChange,
                           sections }) => (
  <div
    className={classes.ArticleDepartmentInput}
  >
  <SelectField
    floatingLabelText="Section"
    value={currentSection}
    onChange={onSectionChange}
  >
    { sections.map(section => (
      <MenuItem value={section.name} key={section.id}>
        { section.name }
      </MenuItem>
      )
    )}
  </SelectField>
  </div>
);

const mapStateToProps = state => ({
  sections : state.forms.sections
});

export default connect(
  mapStateToProps,
  null
)(injectSheet(styles)(SectionInput))