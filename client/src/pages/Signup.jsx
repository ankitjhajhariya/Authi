import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');

    const signup = async (e) => {
        e.preventDefault();
        const API_URL = import.meta.env.VITE_API_URL;
        if (password !== confirm) {
            alert('Passwords do not match.');
            return;
        }

        try {
            const res = await axios.post(`${API_URL}/api/signup`, {
                name,
                email,
                password,
            });
            window.location.href = '/login';
        } catch (err) {
            alert(err.response?.data?.message || 'Signup failed.');
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
                <h2 className="text-center mb-4">Sign Up</h2>
                <form onSubmit={signup}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            type="text"
                            id="name"
                            className="form-control"
                            placeholder="Your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            onInvalid={(e) => e.target.setCustomValidity('Please enter your name')}
                            onInput={(e) => e.target.setCustomValidity('')}
                        />

                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input
                            type="email"
                            id="email"
                            className="form-control"
                            placeholder="Your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            onInvalid={(e) => e.target.setCustomValidity('Please enter your email.')}
                            onInput={(e) => e.target.setCustomValidity('')}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            placeholder="Create password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            onInvalid={(e) => e.target.setCustomValidity('Please create password.')}
                            onInput={(e) => e.target.setCustomValidity('')}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="confirm" className="form-label">Confirm Password</label>
                        <input
                            type="password"
                            id="confirm"
                            className="form-control"
                            placeholder="Confirm password"
                            value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
                            required
                            onInvalid={(e) => e.target.setCustomValidity('Please confirm your password.')}
                            onInput={(e) => e.target.setCustomValidity('')}
                        />
                    </div>

                    <button type="submit" className="btn btn-success w-100">Sign Up</button>
                </form>

                <p className="mt-3 text-center">
                    Already have an account? <Link to="/login">Log In</Link>
                </p>
            </div>
        </div>
    );
}
