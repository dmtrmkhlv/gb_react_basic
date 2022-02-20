import React  from "react";

export const LoginFormTestIds = {
    submit: 'LoginForm-submit',
    loginField: 'LoginForm-loginField',
    passwordField: 'LoginForm-passwordField',
  }

export const LoginTest = ({setFieldValue, getFieldValue, onSubmit}) => {
    
    const handlePassChange = (e) => {
        setFieldValue('password', e.target.value);
    };

    const handleEmailChange = (e) => {
        setFieldValue('login', e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit('test');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Login</h1>
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

        </form>
    );
};