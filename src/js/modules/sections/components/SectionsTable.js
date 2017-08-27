import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import SectionsTableForm from "./SectionsTableForm";

const SectionsTable = () => {
  const handleSubmit = values => {
    console.log(values);
  };
  return (
    <div>
      <SectionsTableForm onSubmit={ handleSubmit }/>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ }, dispatch);
};

export default connect(null, mapDispatchToProps)(SectionsTable);