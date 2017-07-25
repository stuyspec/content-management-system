/**
 * Created by nicholas on 7/24/17.
 */
import React from 'react'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import { connect } from 'react-redux'
import injectSheet from 'react-jss'
import UserChip from '../../users/components/UserChip'
import { articlesPreviewSelector } from '../selectors'
import { updateSelectedArticles } from '../actions'

const styles = {
  articlesTable: {
    maxWidth: "1200px",
    margin: "5%"
  }
}

const ArticlesTable = ({ articles,
                         classes,
                         users,
                         selectedArticles,
                         handleRowSelection }) => {
  const isSelected = id => selectedArticles.includes(id)

  return (
    <div className={classes.articlesTable}>
      <h2> Articles Table </h2>
      <Table
        fixedHeader={false}
        onRowSelection={handleRowSelection}
        multiSelectable
      >
        <TableHeader>
          <TableRow>
            <TableHeaderColumn> Title </TableHeaderColumn>
            <TableHeaderColumn> Contributors </TableHeaderColumn>
            <TableHeaderColumn> Content </TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          { articles.map(article =>
            <TableRow selected={isSelected(article.id)}>
              <TableRowColumn> {article.title} </TableRowColumn>
              <TableRowColumn>
                { article.contributors.map(
                  contributor =>
                    <UserChip
                      user={
                        users.find(
                          user => user.id === contributor
                        )
                      }
                    />
                )
                }
              </TableRowColumn>
              <TableRowColumn>
                <div
                  dangerouslySetInnerHTML={
                    {__html: article.content.slice(0, 200)}
                  }
                />
              </TableRowColumn>
            </TableRow>
          )
          }
        </TableBody>
      </Table>
    </div>
  );
}


const mapStateToProps = state => ({
  articles: articlesPreviewSelector(state),
  selectedArticles: state.articles.selectedArticles,
  users: state.users.list,
})

const mapDispatchToProps = dispatch => ({
  handleRowSelection: selectedRows =>
    dispatch(updateSelectedArticles(selectedRows))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectSheet(styles)(ArticlesTable));