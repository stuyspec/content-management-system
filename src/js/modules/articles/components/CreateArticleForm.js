import React from "react";
import ArticleForm from "./ArticleForm";
import { createArticleActions } from "../actions";
import { connect } from "react-redux";
import RichTextEditor from "react-rte";

const CreateArticleForm = ({
  addContributor,
  removeContributor,
  submitArticle
}) => {
  const initialValues = {
    content: RichTextEditor.createEmptyValue()
  };
  return (
    <ArticleForm
      form="createArticle"
      onSubmit={submitArticle}
      addContributor={addContributor}
      removeContributor={removeContributor}
      initialValues={initialValues}
    />
  );
};

const mapDispatchToProps = dispatch => ({
  addContributor: email => dispatch(createArticleActions.addContributor(email)),
  removeContributor: contributorId =>
    dispatch(createArticleActions.removeContributor(contributorId)),
  submitArticle: values => dispatch(createArticleActions.submitArticle(values))
});
export default connect(null, mapDispatchToProps)(CreateArticleForm);
