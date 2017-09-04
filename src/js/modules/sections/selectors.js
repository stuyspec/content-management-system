/**
 * Created by nicholas on 7/29/17.
 */
import { createSelector } from 'reselect'

export const getSections = state => state.sections.list

export const getTopLevelSections = createSelector(
  getSections,
  sections => sections.filter(section => section.parentId === null)
)

