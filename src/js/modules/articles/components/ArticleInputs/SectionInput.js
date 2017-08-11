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
  }
};


const SectionInput = ({ classes,
                        section,
                        handleSectionChange,
                        sections }) => (
  <div className={classes.ArticleDepartmentInput}>
    <SelectField
      floatingLabelText="Section"
      value={section}
      onChange={handleSectionChange}
    >
      { sections.map(section => (
          <MenuItem
            value={section.id}
            key={section.id}
            primaryText={section.name}
          />
        )
      )}
    </SelectField>
  </div>
);

export default injectSheet(styles)(SectionInput);