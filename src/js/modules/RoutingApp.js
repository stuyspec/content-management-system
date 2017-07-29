import Provider from 'react-redux/lib/components/Provider';
import React, { Component } from 'react';
import appHistory from 'tools/appHistory';
import ArticleForm from './forms/components/ArticleForm';
import SectionForm from './forms/components/SectionForm';
import ArticlesTable from './articles/components/ArticlesTable'
import UsersList from './users/components/UsersList'
import ConnectedRouter from 'react-router-redux/ConnectedRouter';
import store from '../store';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Route } from 'react-router-dom'
import MainApp from './main/components/MainApp'

class RoutingApp extends Component
{
    render ()
    {
        return (
          <MuiThemeProvider>
            <Provider store={ store }>
                <ConnectedRouter history={ appHistory }>
                    <div>
                      <Route
                        path="/"
                        component={ MainApp }
                      />
                      <Route exact path="/articles"
                             component={ ArticlesTable }
                      />
                      <Route
                        path="/articles/new"
                        component={ ArticleForm }
                      />
                      <Route exact path="/users"
                             component={ UsersList }
                      />
                      <Route
                        path="/sections/new"
                        component={ SectionForm }
                      />
                    </div>
                </ConnectedRouter>
            </Provider>
          </MuiThemeProvider>
            );
    }
}

export default RoutingApp