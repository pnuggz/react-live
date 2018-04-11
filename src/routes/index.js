import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ContestsTable from '../containers/ContestsTable'

const Home = () => (
  <div>
    Home TEST
    <ContestsTable />
  </div>
);

const About = () => (
  <div>
    About
  </div>
);

const AboutHome = () => (
  <div>
    About Home
  </div>
);

const AboutChildren = (props) => (
  <div className="childern">
    {console.log('childern', props)}
    {props.title}
    {props.path}
  </div>
);

const AboutInfo = (props) => (
  <div>
    {console.log('info', props)}
    <AboutChildren
      title="info "
      path={props.match.path}
    />
  </div>
);

const AboutRoutes = (props) => (
  <Switch>
    <Route
      exact={true}
      path={props.match.path}
      component={AboutHome}
    />
    <Route
      exact={true}
      path={`${props.match.path}/info`}
      component={AboutInfo}
    />
    <Route
      exact={true}
      path={`${props.match.path}/children`}
      render={(props) => <AboutChildren {...props} title="About Children Direct" />}
    />
  </Switch>
);

const Routes = () => (
  <Switch>
    <Route
      exact={true}
      path="/"
      component={Home}
    />
    <Route
      path="/about"
      component={AboutRoutes}
    />
  </Switch>
);

export default Routes;
