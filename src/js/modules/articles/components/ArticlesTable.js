/**
 * Created by nicholas on 7/24/17.
 */
import React, { Component} from 'react'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton'
import { connect } from 'react-redux'
import injectSheet from 'react-jss'
import UserChip from '../../users/components/UserChip'
import { articlesPreviewSelector } from '../selectors'
import { contributorsByArticle } from '../../authorships/selectors'
import { setSelectedArticles, deleteArticles } from '../actions'

const styles = {
  articlesTable: {
    maxWidth: "800px",
    margin: "5%"
  }
}
// TODO: Change selected logic to ids instead of indices
class ArticlesTable extends Component {
  constructor(props) {
    super(props)
  }

  isSelected = slug => {
    const { selectedArticles } = this.props;
    return selectedArticles.indexOf(slug) !== -1
  }


  handleRowSelection = rowsSelected => {
    const { articles, setSelectedArticles } = this.props;
    if (rowsSelected === 'none') {
      setSelectedArticles([])
    }
    else if (rowsSelected === 'all') {
      const allArticleSlugs = articles.map(article => article.slug)
      setSelectedArticles(allArticleSlugs)
    }
    else {
      const selectedArticleSlugs = rowsSelected.map(row => articles[row].slug)
      setSelectedArticles(selectedArticleSlugs)
    }
  }

  handleRowDeletion = () => {
    const {
      selectedArticles,
      setSelectedArticles,
      deleteSelectedArticles
    } = this.props;

    if (selectedArticles) {
      deleteSelectedArticles(selectedArticles)
      setSelectedArticles([])
    }
  }

  render() {
    const { articles, classes, contributors, selectedArticles } = this.props;
    const deleteButtonLabel = selectedArticles.length > 1 ?
      "Delete Articles" : "Delete Article"
    const editButtonLabel = selectedArticles.length > 1 ?
      "Edit Articles" : "Edit Article"
    return (
      <div className={classes.articlesTable}>
        <h2> Articles Table </h2>
        <RaisedButton
          label={deleteButtonLabel}
          onClick={this.handleRowDeletion}
        />
        <RaisedButton label={editButtonLabel}/>
        <Table
          fixedHeader={false}
          onRowSelection={this.handleRowSelection}
          multiSelectable
        >
          <TableHeader>
            <TableRow>
              <TableHeaderColumn> Title </TableHeaderColumn>
              <TableHeaderColumn> Contributors </TableHeaderColumn>
              <TableHeaderColumn> Content </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody deselectOnClickaway={false}>
            { articles.map(article =>
              <TableRow
                key={article.id}
                selected={this.isSelected(article.slug)}
              >
                <TableRowColumn> {article.title} </TableRowColumn>
                <TableRowColumn>
                  {
                    contributors[article.id].map(
                      contributor =>
                        <UserChip
                          key={contributor.id}
                          user={contributor}
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
}

const mapStateToProps = state => ({
  articles: articlesPreviewSelector(state),
  users: state.users.list,
  selectedArticles: state.articles.selected,
  contributors: contributorsByArticle(state)
})

const mapDispatchToProps = dispatch => ({
  deleteSelectedArticles: selectedArticleIds =>
    dispatch(deleteArticles(selectedArticleIds)),
  setSelectedArticles: selectedArticles =>
    dispatch(setSelectedArticles(selectedArticles))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectSheet(styles)(ArticlesTable));