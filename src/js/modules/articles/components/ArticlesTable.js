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
import { articlesPreviewSelector, contributorsByArticle } from '../selectors'
import { saveSelectedArticles, deleteSelectedArticles } from '../actions'

const styles = {
  articlesTable: {
    maxWidth: "1200px",
    margin: "5%"
  }
}
// TODO: Change selected logic to ids instead of indices
class ArticlesTable extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedArticles: props.selected
    }
  }

  componentWillUnmount() {
    this.props.saveSelectedArticles(this.state.selected);
  }

  isSelected = id => {
    const { selectedArticles } = this.state;
    return selectedArticles.indexOf(id) !== -1
  }

  handleRowSelection = rowSelected => {
    this.setState({selected: rowSelected})
  }

  handleRowDeletion = () => {
    const { selectedArticles } = this.state;
    const { articles } = this.props;
    const selectedArticleIds = selectedArticles.map(articleIndex =>
      articles[articleIndex].id
    )
    this.props.deleteSelectedArticles(selectedArticleIds)
    this.setState({ selected: []})
  }

  render() {
    const { articles, classes, contributors } = this.props;
    const { selectedArticles } = this.state;

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
                selected={this.isSelected(article.id)}
              >
                <TableRowColumn> {article.title} </TableRowColumn>
                <TableRowColumn>
                  {
                    contributors[article.id]
                    .map(
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
  selected: state.articles.selected,
  contributors: contributorsByArticle(state)
})
const mapDispatchToProps = dispatch => ({
  deleteSelectedArticles: selectedArticleIds =>
    dispatch(deleteSelectedArticles(selectedArticleIds)),
  saveSelectedArticles: selectedArticles =>
    dispatch(saveSelectedArticles(selectedArticles))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectSheet(styles)(ArticlesTable));