import React  from "react";
import CreateArticleForm from "./CreateArticleForm";

export default CreateArticlePage = () => {
  const handleSubmit = values => {
    // createArticle(values);
    console.log(values);
  }

  return (
    <CreateArticleForm onSubmit={handleSubmit}/>
  );
};