import React, { Suspense, lazy } from "react"
import { Router, Switch, Route } from "react-router-dom"
import { history } from "./history"
import { connect } from "react-redux"
import Spinner from "./components/@vuexy/spinner/Loading-spinner"
import { ContextLayout } from "./utility/context/Layout"

// Route-based code splitting
const Dashboard = lazy(() =>
  import("./views/pages/Dashboard/Dashboard.js")
)

const Projects = lazy(() =>
  import("./views/pages/Projects/Projects")
)

const Earning = lazy(() =>
  import("./views/pages/Earning/Earning")
)

const Engineer = lazy(() =>
  import("./views/pages/Engineer/Engineer")
)

const Technology = lazy(() =>
  import("./views/pages/Technology/Technology")
)

const Skills = lazy(() =>
  import("./views/pages/Skills/Skills")
)

const Overview = lazy(() =>
  import("./views/pages/Overview/Overview")
)

const login = lazy(() =>
  import("./views/pages/authentication/login/Login")
)

const Test = lazy(() =>
  import("./views/pages/Test/AnalyticsDashboard")
)

// Set Layout and Component Using App Route
const RouteConfig = ({
  component: Component,
  fullLayout,
  permission,
  user,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      return (
        <ContextLayout.Consumer>
          {context => {
            let LayoutTag =
              fullLayout === true
                ? context.fullLayout
                : context.state.activeLayout === "horizontal"
                ? context.horizontalLayout
                : context.VerticalLayout
              return (
                <LayoutTag {...props} permission={props.user}>
                  <Suspense fallback={<Spinner />}>
                    <Component {...props} />
                  </Suspense>
                </LayoutTag>
              )
          }}
        </ContextLayout.Consumer>
      )
    }}
  />
)
const mapStateToProps = state => {
  return {
    user: state.auth.login.userRole
  }
}

const AppRoute = connect(mapStateToProps)(RouteConfig)

class AppRouter extends React.Component {
  render() {
    return (
      // Set the directory path if you are deploying in sub-folder
      <Router history={history}>
        <Switch>
          <AppRoute
            exact
            path="/"
            component={Dashboard}
          />
          <AppRoute
            path="/projects"
            component={Projects}
          />
          <AppRoute
            path="/earning"
            component={Earning}
          />
          <AppRoute
            path="/engineer"
            component={Engineer}
          />
          <AppRoute
            path="/technology"
            component={Technology}
          />
          <AppRoute
            path="/skills"
            component={Skills}
          />
          <AppRoute
            path="/overview"
            component={Overview}
          />
          <AppRoute
            path="/test"
            component={Test}
          />
          <AppRoute
            path="/pages/login"
            component={login}
            fullLayout
          />
        </Switch>
      </Router>
    )
  }
}

export default AppRouter
