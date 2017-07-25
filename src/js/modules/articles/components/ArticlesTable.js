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

const styles = {
  articlesTable: {
    maxWidth: "1000px",
    margin: "5%"
  }
}

const ArticlesTable = ({ articles, classes, users }) => (
  <div className={classes.articlesTable}>
    <h2> Articles Table </h2>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeaderColumn> Title </TableHeaderColumn>
          <TableHeaderColumn> Contributors </TableHeaderColumn>
          <TableHeaderColumn> Content </TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody>
        { articles.map(article =>
            <TableRow>
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


const mapStateToProps = state => ({
  articles: articlesPreviewSelector(state),
  users: state.users.list
})

export default connect(
  mapStateToProps,
  null
)(injectSheet(styles)(ArticlesTable));