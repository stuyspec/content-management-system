import React from 'react'
import { connect } from "react-redux";
import MenuItem from 'material-ui/MenuItem'
import { Field, reduxForm } from 'redux-form';
import {
  SelectField,
  TextField,
} from 'redux-form-material-ui';
import { getSections } from '../../sections/selectors';

const CreateArticleForm = ({ sections }) => {
  return (
    <form>
      <div>
        <Field name="title" component={TextField} hintText="Title"/>
      </div>
      <div>
        <Field name="section" component={SelectField} hintText="Section">
          {sections.map(section => <MenuItem value={section.id} primaryText={section.name} />)}
        </Field>
      </div>
      <div>
        <Field name="volume" type="number" component={TextField} hintText="Volume"/>
        <Field name="issue" type="number" component={TextField} hintText="Issue"/>
      </div>
    </form>
  );
};

const mapStateToProps = state => ({
  sections: getSections(state),
});

export default reduxForm({
  form: 'createArticle'
})(connect(mapStateToProps)(CreateArticleForm));