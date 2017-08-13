import Provider from 'react-redux/lib/components/Provider';
import React, { Component } from 'react';
import appHistory from 'tools/appHistory';
import ArticleEditor from './forms/components/ArticleEditor';
import ArticlesList from './articles/components/ArticlesList'
import UsersList from './users/components/UsersList'
import ConnectedRouter from 'react-router-redux/ConnectedRouter';
import store from '../store';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Route } from 'react-router-dom'
import MainApp from './main/components/MainApp'
import Confirmation from './forms/components/Confirmation';

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
                             component={ ArticlesList }
                      />
                      <Route
                        path="/articles/new"
                        component={ ArticleEditor }
                      />
                      <Route exact path="/users"
                        component={ UsersList }
                      />
                      <Route exact path="/confirmation"
                        component={ Confirmation }
                      />
                    </div>
                </ConnectedRouter>
            </Provider>
          </MuiThemeProvider>
            );
    }
}

export default RoutingApp