/**
 * Created by nicholas on 7/13/17.
 */
import { createSelector } from 'reselect'

export const usersSelector = state => state.users.articles;
export const currentUserIdSelector = state => state.users.currentUser;
export const currentUserSelector = createSelector(
  usersSelector,
  currentUserIdSelector,
  (users, currentUserId) => (
    users.find(user => user.id === currentUserId)
  )
)

export const randomUserSelector = createSelector(
  usersSelector,
  users => users[Math.floor(Math.random() * users.length)]
)