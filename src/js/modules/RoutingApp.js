import Provider from 'react-redux/lib/components/Provider';
import React, { Component } from 'react';
import appHistory from 'tools/appHistory';
import ArticleEditor from './forms/components/ArticleEditor';
import ArticlesList from './core/components/ArticlesList'
import ConnectedRouter from 'react-router-redux/ConnectedRouter';
import store from '../store';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Route } from 'react-router-dom'
import MainApp from './core/components/MainApp'

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
                    </div>
                </ConnectedRouter>
            </Provider>
          </MuiThemeProvider>
            );
    }
}

export default RoutingApp