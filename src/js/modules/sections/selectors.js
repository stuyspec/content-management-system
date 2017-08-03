/**
 * Created by nicholas on 7/29/17.
 */
import { createSelector } from 'reselect'

export const sectionsSelector = state => state.sections.articles

export const topLevelSectionsSelector = createSelector(
  sectionsSelector,
  sections => sections.filter(section => section.parentId === null)
)

export const randomSectionSelector = createSelector(
  sectionsSelector,
  sections => sections[Math.floor(Math.random() * sections.length)]
)