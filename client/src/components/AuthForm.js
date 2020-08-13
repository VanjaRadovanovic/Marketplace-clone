import React, { useState, useEffect, useCallback } from 'react';
import './AuthForm.css';
import IsEmail from 'validator/lib/isEmail';
import axios from 'axios';

function AuthForm(props) {

  const [formData, setFormData] = useState({});
  const [errMessages, setErrMessages] = useState({});
  const [errOutline, setErrOutline] = useState({})

  useEffect(() => {

    const fetchData = async () => {
      try {
        let results = await axios.get('/api/posts');
        console.log(results.data)
      } catch (error) {
        console.log(error, 'error')
      }
    }

    setFormData({ email: '', password: '' });
    setErrOutline({});
    setErrMessages({});
    fetchData();
  }, [props.signup]);



  const passwordsDontMach = () => {
    setErrMessages({ ...errMessages, password: "Passwords don't match", repeatPassword: "Passwords don't match" });
    setErrOutline({ ...errOutline, password: 'is-invalid', repeatPassword: 'is-invalid' });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let data;
    if (props.signup) {
      if (formData.password !== formData.repeatPassword) return passwordsDontMach();
      data = formData;
    } else {
      data = {
        email: formData.email,
        password: formData.password
      }
    }
    console.log(data);
    setFormData({ username: '', email: '', password: '', repeatPassword: '', imageUrl: '' });
    setErrOutline({});
    setErrMessages({});
  }

  const emailOnChange = (e) => {
    let email = e.target.value
    setFormData({ ...formData, email: e.target.value });
    if (!IsEmail(email) && email) {
      setErrMessages({ ...errMessages, email: 'This email is not valid' });
      setErrOutline({ ...errOutline, email: 'is-invalid' });
      return
    } else if (IsEmail(email)) {
      setErrMessages({ ...errMessages, email: '' });
      setErrOutline({ ...errOutline, email: 'is-valid' });
      return
    }
    setErrMessages({ ...setErrMessages, email: '' });
    setErrOutline({ ...errOutline, email: '' });
  }

  const changingRepeatPasswords = (e) => {
    let pass = e.target.value;
    setFormData({ ...formData, repeatPassword: e.target.value });
    if (pass === '') {
      setErrMessages({ ...errMessages, password: '', repeatPassword: '' });
      setErrOutline({ ...errOutline, password: '', repeatPassword: '' });
      return
    }
    if (formData.password === pass) {
      setErrMessages({ ...errMessages, password: '', repeatPassword: '' });
      setErrOutline({ ...errOutline, password: 'is-valid', repeatPassword: 'is-valid' });
      return
    }
    passwordsDontMach();
  }

  const changingPassword = (e) => {
    setFormData({ ...formData, password: e.target.value, repeatPassword: '' });
    setErrMessages({ ...errMessages, password: '', repeatPassword: '' });
    setErrOutline({ ...errOutline, password: '', repeatPassword: '' });
  }

  return (
    <div className="auth-form-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        {props.signup ? (
          <div className="form-group">
            <label htmlFor="username-label">Username</label>
            <input type="text" className={`form-control ${errOutline.username}`} id="username-label" value={formData.username} onChange={e => setFormData({ ...formData, username: e.target.value })} />
            <small id="usernameHelp" className="form-text text-muted">{errMessages.username}</small>
          </div>
        ) : null}
        <div className="form-group">
          <label htmlFor="email-label">Email address</label>
          <input type="email" className={`form-control ${errOutline.email}`} id="email-label" aria-describedby="emailHelp" value={formData.email} onChange={emailOnChange} />
          <small id="emailHelp" className="form-text text-muted">{errMessages.email}</small>
        </div>
        <div className="form-group">
          <label htmlFor="password-label">Password</label>
          <input type="password" className={`form-control ${errOutline.password}`} id="password-label" value={formData.password} onChange={e => changingPassword(e)} />
          <small id="passwordHelp" className="form-text text-muted">{errMessages.password}</small>
        </div>
        {props.signup ? (
          <>
            <div className="form-group">
              <label htmlFor="password-label">Repeat Password</label>
              <input type="password" className={`form-control ${errOutline.repeatPassword}`} id="password-label" value={formData.repeatPassword} onChange={e => changingRepeatPasswords(e)} />
              <small id="emailHelp" className="form-text text-muted">{errMessages.repeatPassword}</small>
            </div>
            <div className="form-group">
              <label htmlFor="imageUrl-label">Image Url</label>
              <input type="text" className="form-control" id="imageUrl-label" value={formData.imageUrl} onChange={e => setFormData({ ...formData, imageUrl: e.target.value })} />
              <small id="imageUrlHelp" className="form-text text-muted"> </small>
            </div>
          </>
        ) : null}
        <button id="auth-submit" type="submit" className="btn btn-primary mt-2">{props.buttonText}</button>
      </form>
    </div>
  )
}

export default AuthForm;
