import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
    const [msg, setMsg] = useState('');
    const [err, setErr] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios
            .get('http://localhost:8080/api/protected', {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => setMsg(res.data.message))
            .catch(() => setErr('Unauthorized or session expired.'));
    }, []);

    const logout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow text-center" style={{ maxWidth: '500px', width: '100%' }}>
                <h2 className="mb-4">Dashboard</h2>
                {msg && <p className="lead">{msg}</p>}
                {err && <p className="text-danger">{err}</p>}
                <button className="btn btn-danger mt-3" onClick={logout}>
                    Logout
                </button>
            </div>
        </div>
    );
}
