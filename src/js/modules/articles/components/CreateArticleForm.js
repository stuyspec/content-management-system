import React from "react";
import { connect } from "react-redux";
import MenuItem from "material-ui/MenuItem";
import { AutoComplete as MUIAutoComplete } from "material-ui";
import { Field, reduxForm } from "redux-form";
import { createArticle } from "../selectors";
import { SelectField, TextField, AutoComplete } from "redux-form-material-ui";
import { createArticleActions } from "../actions";
import { getSections } from "../../sections/selectors";
import ContributorsList from "./ContributorsList";

const CreateArticleForm = ({
  sections,
  availableEmails,
  addContributor,
  removeContributor,
  contributors
}) => {
  const handleNewRequest = email => {
    console.log("Request");
    addContributor(email);
  };
  return (
    <form>
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
          type="humber"
          floatingLabelText="Add a contributor"
          openOnFocus
          filter={MUIAutoComplete.fuzzyFilter}
          component={AutoComplete}
          onNewRequest={handleNewRequest}
          dataSource={availableEmails}
        />
        <ContributorsList
          contributors={contributors}
          removeContributor={removeContributor}
        />
      </div>
    </form>
  );
};

const mapStateToProps = state => ({
  sections: getSections(state),
  availableEmails: createArticle.getAvailableEmails(state),
  contributors: createArticle.contributorsUsersSelector(state)
});

const mapDispatchToProps = dispatch => ({
  addContributor: email => dispatch(createArticleActions.addContributor(email)),
  removeContributor: contributorId =>
    dispatch(createArticleActions.removeContributor(contributorId))
});

export default reduxForm({
  form: "createArticle"
})(connect(mapStateToProps, mapDispatchToProps)(CreateArticleForm));
