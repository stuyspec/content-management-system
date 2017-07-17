import Provider from 'react-redux/lib/components/Provider';
import React, { Component } from 'react';
import appHistory from 'tools/appHistory';
import MainApp from './core/components/MainApp';
import ArticleEditor from './forms/components/ArticleEditor';
import ConnectedRouter from 'react-router-redux/ConnectedRouter';
import store from '../store';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Link, Route } from 'react-router-dom'

class RoutingApp extends Component
{
    render ()
    {
        return (
            <Provider store={ store }>
                <ConnectedRouter history={ appHistory }>
                  <MuiThemeProvider>
                    <div>
                      <MainApp>
                          <Route
                            exact path="/"
                            component={ ArticleEditor }
                          />
                        <Link to="/"> Home </Link>
                        <Link to="/create_article"> Create Article </Link>
                      </MainApp>
                    </div>
                  </MuiThemeProvider>
                </ConnectedRouter>
            </Provider>
            );
    }
}

export default RoutingApp