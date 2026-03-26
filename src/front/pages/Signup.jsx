import React, { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
    const { store, actions } = useGlobalReducer();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async (e) => {
        e.preventDefault();
        const success = await actions.signup(email, password);

        if (success) {
            alert("Signup successful! Please log in.");
            navigate("/login");
        } else {
            alert("Signup failed.");
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Create Account</h2>

                <form onSubmit={handleSignup} style={styles.form}>
                    <input
                        type="email"
                        placeholder="Email"
                        style={styles.input}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        style={styles.input}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type="submit" style={styles.button}>
                        Sign Up
                    </button>
                </form>

                <p style={styles.text}>
                    Already have an account? <a href="/login">Log in</a>
                </p>
            </div>
        </div>
    );
};

const styles = {
    container: {
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    card: {
        width: "350px",
        padding: "30px",
        borderRadius: "10px",
        background: "#ffffff",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    },
    title: {
        textAlign: "center",
        marginBottom: "20px",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "15px",
    },
    input: {
        padding: "12px",
        borderRadius: "6px",
        border: "1px solid #ccc",
    },
    button: {
        padding: "12px",
        borderRadius: "6px",
        border: "none",
        background: "#4a4aff",
        color: "white",
        cursor: "pointer",
        fontWeight: "bold",
    },
    text: {
        marginTop: "15px",
        textAlign: "center",
    },
};