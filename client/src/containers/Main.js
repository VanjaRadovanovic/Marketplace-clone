import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Homepage from '../components/Homepage/Homepage';
import AuthForm from '../components/AuthForm';
import { useSelector } from 'react-redux';
import CreatePost from '../components/CreatingPost/CreatingPosts';
import IndividualPost from '../components/IndividualPost/Index';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { SET_CURRENT_USER, GET_ALL_POSTS } from '../store/actionTypes';
import { callApi } from '../store/actions/api';
import { useHistory } from 'react-router-dom';

function Main() {

  const isLoggedin = useSelector(state => state.currentUser.isAuthenticated);
  const dispatch = useDispatch();
  const history = useHistory();

  const verifyingCookie = async () => {
    try {
      let cookie = Cookies.get('user');
      if (cookie) {
        console.log('jagos dupli vrogos')
        let user = await axios.get('/api/auth/verifying-cookie');
        await dispatch({
          type: SET_CURRENT_USER,
          user: user.data
        });
        let posts = await callApi('get', `/api/users/${user.data.id}/posts/allmessages`, {}, user.data.token);
        await dispatch({
          type: GET_ALL_POSTS,
          posts: posts
        })
        console.log(JSON.parse(Cookies.get('path')), 'aaaaa')
        history.push(JSON.parse(Cookies.get('path')))
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    verifyingCookie();
  }, [])

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
        <Route path="/user/my-posts/update/:message_id" render={props => (
          isLoggedin ? <CreatePost {...props} /> : <Redirect to="/signin" />
        )} />
        <Route path="/posts/:id" render={props => (
          isLoggedin ? <IndividualPost update={true} {...props} /> : <Redirect to="/signin" />
        )} />
        <Route path="/" render={props => (
          isLoggedin ? <Homepage {...props} /> : <Redirect to="/signin" />
        )} />
      </Switch>
    </div>
  )
}

export default Main;