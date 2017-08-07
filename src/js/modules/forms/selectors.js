/**
 * Created by nicholas on 7/13/17.
 */
import { createSelector } from 'reselect'
import { usersSelector } from '../users/selectors'

const contributorsSelector = state =>
  state.forms.articles.create.contributors;
export const contributorsUsersSelector = createSelector(
  usersSelector,
  contributorsSelector,
  (users, contributors) =>
    users.filter(user => contributors.includes(user.id))
);

export const contributorsNamesSelector = createSelector(
  contributorsUsersSelector,
  contributors =>
    contributors.map(user => user.name)
);
export const availableUsersSelector = createSelector(
  usersSelector,
  contributorsSelector,
  (users, contributors) => {
    return users.filter(user => !contributors.includes(user.id))
  }
);

export const availableUsersNamesSelector = createSelector(
  availableUsersSelector,
  availableUsers => (
    availableUsers.map(user => user.name)
  )
)
