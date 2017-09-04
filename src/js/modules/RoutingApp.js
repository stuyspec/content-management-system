import Provider from "react-redux/lib/components/Provider";
import React, { Component } from "react";
import appHistory from "tools/appHistory";
import CreateArticlePage from "./articles/components/CreateArticlePage";
import EditArticlePage from "./articles/components/EditArticlePage"
import SectionForm from "./sections/components/SectionForm";
import ArticlesTable from "./articles/components/ArticlesTable";
import UsersList from "./users/components/UsersList";
import ConnectedRouter from "react-router-redux/ConnectedRouter";
import store from "../store";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { Route, Switch } from "react-router-dom";
import MainApp from "./main/components/MainApp";
import NotFoundPage from "./main/components/NotFoundPage"
import HomePage from "./main/components/HomePage"

class RoutingApp extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Provider store={store}>
          <ConnectedRouter history={appHistory}>
            <MainApp>
              <Switch>
                <Route exact path="/articles" component={ArticlesTable} />
                <Route path="/articles/new" component={CreateArticlePage} />
                <Route path="/articles/edit" component={EditArticlePage} />
                <Route exact path="/users" component={UsersList} />
                <Route path="/sections/new" component={SectionForm} />
                <Route exact path="/" component={HomePage} />
                <Route component={NotFoundPage} />
              </Switch>
            </MainApp>
          </ConnectedRouter>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default RoutingApp;
