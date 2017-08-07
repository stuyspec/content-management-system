/**
 * Created by nicholas on 8/5/17.
 */
import React from 'react'
import { connect } from 'react-redux'
import { currentUserSelector } from '../../users/selectors'

const HomePage = ({ currentUser }) => (
  <h1> Welcome {currentUser.name} </h1>
)

const mapStateToProps = state => ({
  currentUser: currentUserSelector(state)
})

export default connect(
  mapStateToProps
)(HomePage)