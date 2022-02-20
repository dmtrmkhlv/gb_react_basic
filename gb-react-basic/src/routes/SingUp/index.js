import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {auth} from "../../services/firebase";

export const SingUp = () => {
    const { push } = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handlePassChange = (e) => {
        setPassword(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await auth.createUserWithEmailAndPassword(email, password);
            push("/profile");
        } catch (e) {
            setError(e);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Sign up</h1>
            <div >
                <label>Email address</label>
                <input
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    onChange={handleEmailChange}
                    value={email}
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
                />
            </div>
            {error && <div>{error.toString()}</div>}

            <button variant="primary" type="submit">
                Submit
            </button>
            <hr />
            <p>
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </form>
    );
};