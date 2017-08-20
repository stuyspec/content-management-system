/**
 * Created by nicholas on 7/29/17.
 */
import { createSelector } from 'reselect'

export const sectionsSelector = state => state.sections.list

export const topLevelSectionsSelector = createSelector(
  sectionsSelector,
  sections => sections.filter(section => section.parentId === null)
)

