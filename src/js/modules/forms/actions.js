import * as t from "./actionTypes";

export const addContributor = contributorName => ({
  type: t.ADD_CONTRIBUTOR,
  payload: { contributorName }
});

export const removeContributor = contributorId => ({
  type: t.REMOVE_CONTRIBUTOR,
  payload: { contributorId }
});