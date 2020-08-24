import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Homepage from '../components/Homepage/Homepage';
import AuthForm from '../components/AuthForm';
import { useSelector } from 'react-redux';
import CreatePost from '../components/CreatingPost/CreatingPosts';

function Main() {

  const isLoggedin = useSelector(state => state.currentUser.isAuthenticated);

  return (
    <div>
      <Switch>
        <Route exact path='/' render={props => (
          isLoggedin ? <Homepage {...props} /> : <Redirect to="/signin" />
        )} />
        <Route path="/signup" render={props => (
          isLoggedin ? <Redirect to="/" /> : <AuthForm buttonText="Signup" signup={true} {...props} />
        )} />
        <Route path="/signin" render={props => (
          isLoggedin ? <Redirect to="/" /> : <AuthForm buttonText="Log in" signup={false} {...props} />
        )} />
        <Route path="/create-post" render={props => (
          isLoggedin ? <CreatePost {...props} /> : <Redirect to="/signin" />
        )} />
        <Route path="/" render={props => (
          isLoggedin ? <Homepage {...props} /> : <Redirect to="/signin" />
        )} />
      </Switch>
    </div>
  )
}

export default Main;