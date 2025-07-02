import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
    const [msg, setMsg] = useState('');
    const [err, setErr] = useState('');
    const [product, setProduct] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios
            .get('http://localhost:8080/api/protected', {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                setMsg(res.data.msg);
                setProduct(res.data.product);
            })
            .catch(() => setErr('Unauthorized or session expired.'));
    }, []);

    const logout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    return (
        <div className="container my-5">
            <div className="text-center mb-4">
                <h2 className="fw-bold">Dashboard</h2>
                {msg && <p className="text-success fs-5">{msg}</p>}
                {err && <p className="text-danger fs-5">{err}</p>}
                <button className="btn btn-danger mt-3" onClick={logout}>
                    Logout
                </button>
            </div>

            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
                {product.map((item, index) => (
                    <div className="col" key={index}>
                        <div className="card h-100 shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title text-primary">{item.name}</h5>
                                <p className="card-text">{item.des}</p>
                            </div>
                            <div className="card-footer bg-white">
                                <span className="fw-bold text-success">₹ {item.price}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
