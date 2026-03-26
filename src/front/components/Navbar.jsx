import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
	const { store, actions } = useGlobalReducer();


	const navigate = useNavigate();

	const handleLogout = () => {
		actions.logout();
		navigate("/login");
	};

	return (
		<nav style={styles.nav}>
			<Link to="/" style={styles.brand}>My App</Link>

			<div style={styles.links}>
				{!store.token ? (
					<>
						<Link to="/login" style={styles.link}>Login</Link>
						<Link to="/signup" style={styles.link}>Signup</Link>
					</>
				) : (
					<button onClick={handleLogout} style={styles.logoutBtn}>
						Logout
					</button>
				)}
			</div>
		</nav>
	);
};

const styles = {
	nav: {
		padding: "15px 25px",
		background: "#222",
		color: "white",
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
	},
	brand: {
		color: "white",
		textDecoration: "none",
		fontSize: "20px",
		fontWeight: "bold",
	},
	links: {
		display: "flex",
		gap: "15px",
	},
	link: {
		color: "white",
		textDecoration: "none",
		fontSize: "16px",
	},
	logoutBtn: {
		background: "#ff4a4a",
		border: "none",
		padding: "8px 14px",
		borderRadius: "6px",
		color: "white",
		cursor: "pointer",
	},
};