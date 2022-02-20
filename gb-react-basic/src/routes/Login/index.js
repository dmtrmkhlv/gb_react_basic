import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {auth} from "../../services/firebase";
import {userApi} from "../../services/request/user"

export const LoginFormTestIds = {
    submit: 'LoginForm-submit',
    loginField: 'LoginForm-loginField',
    passwordField: 'LoginForm-passwordField',
  }

export const Login = ({setFieldValue, getFieldValue, onSubmit}) => {
    const { push } = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handlePassChange = (e) => {
        setPassword(e.target.value);
        setFieldValue('password', e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setFieldValue('login', e.target.value);
    };

    const handleSubmit = async (e) => {
        console.log(email, password);
        e.preventDefault();
        onSubmit('test');
        try {
            // await auth.signInWithEmailAndPassword(email, password);
            await userApi.registration(email, password);

            push("/profile");
        } catch (e) {
            setError(e);
        }
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
                    value={email}
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
                    value={password}
                    data-testid={LoginFormTestIds.passwordField}
                />
            </div>

            {error && <div>{error.toString()}</div>}

            <button variant="primary" type="submit" data-testid={LoginFormTestIds.submit}>
                Submit
            </button>
            <hr />
            <p>
                Already have an account? <Link to="/SingUp">Sign up</Link>
            </p>
        </form>
    );
};