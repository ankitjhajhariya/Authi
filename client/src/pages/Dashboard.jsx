import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
    const [err, setErr] = useState('');
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios
            .get('https://authi-fe2r.onrender.com/api/protected', {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                setProducts(res.data.products); // ✅ fixed
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
                <p className="text-success fs-5">Welcome to your dashboard!</p>
                {err && <p className="text-danger fs-5">{err}</p>}
                <button className="btn btn-danger mt-3" onClick={logout}>
                    Logout
                </button>
            </div>

            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
                {products.map((item, index) => (
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
