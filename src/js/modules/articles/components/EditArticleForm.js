import React from "react";
import ArticleForm from "./ArticleForm";
import { createEditorState } from "medium-draft";

const EditArticleForm = () => {
  const handleSubmit = event => {
    event.preventDefault();
    console.log("Submitting updated article");
  };
  const initialValues = {
    content: createEditorState()
  };
  return (
    <ArticleForm
      form="edit"
      handleSubmit={handleSubmit}
      initialValues={initialValues}
    />
  );
};

export default EditArticleForm;
