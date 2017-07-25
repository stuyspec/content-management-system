import * as t from "./actionTypes";

export const createUsers = user => ({
  type: t.CREATE_USER,
  payload: user
})
