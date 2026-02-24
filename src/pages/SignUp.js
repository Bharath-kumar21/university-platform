import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app, this would create an account via an API
        console.log("Signing up with:", name, email, password);
        // Redirect to profile upon signup
        navigate("/profile");
    };

    return (
        <div className="container page-layout" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 200px)' }}>
            <div style={{ width: '100%', maxWidth: '400px', background: 'var(--white)', padding: '2rem', borderRadius: 'var(--radius)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>

                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.5rem' }}>Create Account</h2>
                    <p className="text-secondary" style={{ fontSize: '0.875rem' }}>Join UniSearch to access full features</p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Full Name</label>
                        <input
                            type="text"
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border-color)', fontSize: '0.875rem' }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Email Address</label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border-color)', fontSize: '0.875rem' }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Password</label>
                        <input
                            type="password"
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border-color)', fontSize: '0.875rem' }}
                        />
                        <p className="text-secondary" style={{ fontSize: '0.75rem', marginTop: '0.5rem' }}>Must be at least 8 characters.</p>
                    </div>

                    <button type="submit" className="btn-black" style={{ width: '100%', padding: '0.75rem', marginTop: '0.5rem' }}>
                        Create Account
                    </button>
                </form>

                <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.875rem' }}>
                    <span className="text-secondary">Already have an account? </span>
                    <Link to="/login" style={{ color: 'var(--text-primary)', fontWeight: 500, textDecoration: 'none' }}>Log in</Link>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
