import React from 'react';
import {useState} from "react";
import {userApi} from "../../services/request/user";

export const LoginFormTestIds = {
    submit: 'LoginForm-submit',
    loginField: 'LoginForm-loginField',
    passwordField: 'LoginForm-passwordField',
  }
  
export const SingUpTest = ({setFieldValue}) => {
    const [loginValue, setLoginValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");

    const handlePassChange = (e) => {
        setPasswordValue(e.target.value);
    };

    const handleEmailChange = (e) => {
        setLoginValue(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        userApi.login(loginValue, passwordValue);
    };

    return (<form onSubmit={handleSubmit}>
            <h1>Sign up</h1>
            <div >
                <label>Email address</label>
                <input
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    onChange={handleEmailChange}
                    data-testid={LoginFormTestIds.loginField}
                />
            </div>

            <div >
                <label>Password</label>
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handlePassChange}
                    data-testid={LoginFormTestIds.passwordField}
                />
            </div>
            <button variant="primary" type="submit" data-testid={LoginFormTestIds.submit}>
                Submit
            </button>
        </form>);
};