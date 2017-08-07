import React, { PureComponent } from 'react'
import injectSheet from 'react-jss'
import connect from 'react-redux/lib/connect/connect'
import { refreshWindowDimensions } from './../actions'
import Navbar from './Navbar'
import NavDrawer from './NavDrawer'
import UserDrawer from '../../users/components/UserDrawer'
import { fetchSections } from '../../sections/actions'
import { fetchArticles } from '../../articles/actions'
import { fetchUsers } from '../../users/actions'
import { fetchAuthorships } from '../../authorships/actions'
import { withRouter } from 'react-router-dom'

const styles = {
  appWrapper :
    {
      minHeight       : '100%',
      margin          : '0px auto',
      display         : 'flex',
      flexDirection   : 'row'
    },
  mainWrapper :
    {
      minHeight       : '100%',
      margin          : '0px auto',
      display         : 'flex',
      flexDirection   : 'column',
      flex            : '2 0 auto'
    },
  mainContent :
    {
      display: "block",
      padding: "3%"
    },
};


class MainApp extends PureComponent
{
  onResizeWindow = ()=>
  {
    this.props.onResizeWindow();
  };
  componentDidMount()
  {
    const {
      fetchArticles,
      fetchSections,
      fetchAuthorships,
      fetchUsers,
    } = this.props
    fetchArticles();
    fetchSections();
    fetchAuthorships();
    fetchUsers();
    window.addEventListener('resize', this.onResizeWindow);
  }
  componentWillUnmount()
  {
    window.removeEventListener('resize', this.onResizeWindow);
  }
  render ()
  {
    const { classes } = this.props;
    return (
      <div className={classes.appWrapper}>
        <div className={classes.mainWrapper}>
          <Navbar />
          <NavDrawer />
          <UserDrawer />
          <div className={classes.mainContent}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

const VisibleMainApp = connect(
  null,
  (dispatch)=>
    ({
      onResizeWindow: () => {
        dispatch(refreshWindowDimensions())
      },
      fetchSections: () => {
        dispatch(fetchSections())
      },
      fetchArticles: () => {
        dispatch(fetchArticles())
      },
      fetchAuthorships: () => {
        dispatch(fetchAuthorships())
      },
      fetchUsers: () => {
        dispatch(fetchUsers())
      }
    })
)(injectSheet(styles)(MainApp));

export default withRouter(VisibleMainApp)
