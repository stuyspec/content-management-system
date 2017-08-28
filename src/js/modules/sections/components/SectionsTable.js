/**
 * Created by nicholas on 8/28/17.
 */
import React, { Component } from "react";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";
import RaisedButton from "material-ui/RaisedButton";
import { connect } from "react-redux";
import injectSheet from "react-jss";
import { setSelectedSections, deleteSections } from '../actions'

const styles = {
  sectionsTable: {
    margin: "5%",
    maxWidth: "800px"
  }
};

const SectionsTable = ({
  classes,
  sections,
  selectedSections,
  setSelectedSections,
  deleteSelectedSections,
  editSelectedSections
}) => {
  const isSelected = id => {
    return selectedSections.indexOf(id) !== -1;
  };

  const handleRowSelection = rowsSelected => {
    if (rowsSelected === "none") {
      setSelectedSections([]);
    } else if (rowsSelected === "all") {
      const allSectionIds = sections.map(section => section.id);
      setSelectedSections(allSectionIds);
    } else {
      const selectedSectionIds = rowsSelected.map(row => sections[row].id);
      setSelectedSections(selectedSectionIds);
    }
  };

  const handleRowDeletion = () => {
    if (selectedSections) {
      deleteSelectedSections(selectedSections);
      setSelectedSections([]);
    }
  };

  const deleteButtonLabel =
    selectedSections.length > 1 ? "Delete Sections" : "Delete Section";
  const editButtonLabel =
    selectedSections.length > 1 ? "Edit Sections" : "Edit Section";
  return (
    <div className={classes.sectionsTable}>
      <h2> Sections Table </h2>
      <RaisedButton
        label={deleteButtonLabel}
        onClick={handleRowDeletion}
      />
      <RaisedButton label={editButtonLabel} onClick={editSelectedSections} />
      <Table
        fixedHeader={false}
        onRowSelection={handleRowSelection}
        multiSelectable
      >
        <TableHeader>
          <TableRow>
            <TableHeaderColumn> Name </TableHeaderColumn>
            <TableHeaderColumn> Description </TableHeaderColumn>
            <TableHeaderColumn> No. of Articles </TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody deselectOnClickaway={false}>
          {sections.map(section =>
            <TableRow key={section.id} selected={isSelected(section.id)}>
              <TableRowColumn>
                {" "}{section.name}{" "}
              </TableRowColumn>
              <TableRowColumn>
                {" "}{section.description}{" "}
              </TableRowColumn>
              <TableRowColumn />
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

const mapStateToProps = state => ({
  sections: state.sections.list,
  selectedSections: state.sections.selected
});

const mapDispatchToProps = dispatch => ({
  deleteSelectedSections: selectedSectionIds =>
    dispatch(deleteSections(selectedSectionIds)),
  setSelectedSections: selectedSections =>
    dispatch(setSelectedSections(selectedSections)),
  editSelectedSections: () => console.log("TBD: Json implements editing")
});

export default connect(mapStateToProps, mapDispatchToProps)(
  injectSheet(styles)(SectionsTable)
);
