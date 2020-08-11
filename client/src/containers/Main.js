import React from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Homepage from '../components/Homepage';
import AuthForm from '../components/AuthForm';

function Main() {
  return (
    <div>
      <Switch>
        <Route exact path='/' render={props => <Homepage {...props} />} />
        <Route path="/signup" render={props => <AuthForm buttonText="Signup" {...props} />} />
        <Route path="/signin" render={props => <AuthForm buttonText="Log in" {...props} />} />
      </Switch>
    </div>
  )
}

export default Main;