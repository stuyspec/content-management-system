import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Field, reduxForm } from "redux-form";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from "material-ui/Table";

import { fetchSections } from "../actions";

class SectionTableForm extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.refresh();
  }

  refresh = () => {
    this.props.fetchSections();
  }

  render() {
    const {
      handleSubmit,
      pristine,
      reset,
      sections,
      submitting,
    } = this.props;
    const columns = [ 'id', 'name', 'slug', 'description' ];
    return (
      <div>
        <button onClick={ () => this.refresh() }>refresh</button>
        <form onSubmit={ handleSubmit }>
          <Field name="bulkAction" component="select">
            <option/>
            <option value="delete">delete</option>
          </Field>
          <button type="submit" disabled={ pristine || submitting }>Submit
          </button>
          <button type="button" disabled={ pristine || submitting }
                  onClick={ reset }>
            Clear Values
          </button>
          <table>

          </table>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  sections: state.sections.list,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchSections }, dispatch);
};

const SmartSectionTableForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(SectionTableForm);

export default reduxForm({
  form: 'sectionTable',
})(SmartSectionTableForm);