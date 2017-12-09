import React, { Component } from "react";
import { connect } from "react-redux";
import MenuItem from "material-ui/MenuItem";
import { AutoComplete as MUIAutoComplete, RaisedButton } from "material-ui";
import { Field, reduxForm, change } from "redux-form";
import { createArticle } from "../selectors";
import { EditorState } from "draft-js";
import { SelectField, TextField, AutoComplete } from "redux-form-material-ui";
import { getSections } from "../../sections/selectors";
import ContributorsList from "./ContributorsList";

/* Props:
     sections,
     availableEmails,
     addContributor,
     removeContributor,
     clearContributorField,
     contributors,
     handleSubmit,
     fields,
     initialValues,
     form
  */
class ArticleForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty()
    };
  }

  handleNewRequest = email => {
    const { addContributor, clearContributorField, form } = this.props;
    addContributor(email);
    clearContributorField(form);
  };

  handleChange = editorState => {
    this.setState({ editorState });
  };

  render() {
    const {
      handleSubmit,
      availableEmails,
      sections,
      removeContributor,
      contributors
    } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <Field name="title" component={TextField} hintText="Title" />
        </div>
        <div>
          <Field name="section" component={SelectField} hintText="Section">
            {sections.map(section =>
              <MenuItem value={section.id} primaryText={section.name} />
            )}
          </Field>
        </div>
        <div>
          <Field
            name="volume"
            type="number"
            component={TextField}
            hintText="Volume"
          />
          <Field
            name="issue"
            type="number"
            component={TextField}
            hintText="Issue"
          />
        </div>
        <div>
          <Field
            name="contributors"
            floatingLabelText="Add a contributor"
            openOnFocus
            filter={MUIAutoComplete.fuzzyFilter}
            component={AutoComplete}
            onNewRequest={this.handleNewRequest}
            dataSource={availableEmails}
          />
          {contributors.length > 0 &&
            <ContributorsList
              contributors={contributors}
              removeContributor={removeContributor}
            />}
        </div>
        <RaisedButton type="submit" label="Submit" />
      </form>
    );
  }
}

const mapStateToProps = state => ({
  sections: getSections(state),
  availableEmails: createArticle.getAvailableEmails(state),
  contributors: createArticle.contributorsUsersSelector(state)
});

const mapDispatchToProps = dispatch => ({
  clearContributorField: formName =>
    dispatch(change(formName, "contributors", ""))
});

export default reduxForm({})(
  connect(mapStateToProps, mapDispatchToProps)(ArticleForm)
);
