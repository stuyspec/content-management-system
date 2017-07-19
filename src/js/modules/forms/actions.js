import * as t from "./actionTypes";
import { usersSelector } from './selectors'

export const addContributor = contributorName => (
  (dispatch, getState) => {
    const users = usersSelector(getState());
    const contributor = users.find(
      user => user.name === contributorName
    );
    const contributorId = contributor.id

    dispatch({
      type: t.ADD_CONTRIBUTOR,
      payload: { contributorId }
    });
  }
);

export const removeContributor = contributorId => ({
  type: t.REMOVE_CONTRIBUTOR,
  payload: { contributorId }
});

export const saveArticleData = (
  title,
  content,
  section,
) => ({
  type: t.SAVE_ARTICLE_DATA,
  payload: { title, content, section }
})