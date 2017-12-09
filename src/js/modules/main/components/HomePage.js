/**
 * Created by nicholas on 8/5/17.
 */
import React from 'react'
import { connect } from 'react-redux'
import { currentUserSelector } from '../../users/selectors'
import ArticlesList from "../../articles/components/ArticlesList"

const HomePage = ({ currentUser }) => (
  <div>
    <ArticlesList/>
  </div>
)

const mapStateToProps = state => ({
  currentUser: currentUserSelector(state)
})

export default connect(
  mapStateToProps
)(HomePage)