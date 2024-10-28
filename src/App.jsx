import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import BlogEditor from "./components/Editor.jsx/Editor";
import Navbar from "./components/Navbar/Navbar";

import { ConfigProvider, theme } from "antd";

import { StyleProvider } from "@ant-design/cssinjs";
import PageRoutes from "../Routes";
import LoginContainer from "./components/LoginContainer/LoginContainer";

function App() {
	const [user, setUser] = useState(
		JSON.parse(localStorage.getItem("user")) || null
	);
	const login = (userData) => {
		setUser(userData);
		localStorage.setItem("user", JSON.stringify(userData));
	};
	const logout = () => {
		setUser(null);
		localStorage.setItem("user", JSON.stringify(null));
	};

    return (
		<ConfigProvider
			theme={{
				token: {
					// Seed Token
					colorPrimary: "#46A29F",
					borderRadius: 8,

					// Alias Token
					colorBgContainer: "#fff",
				},

				algorithm: theme.lightAlgorithm,
			}}
		>
			
				<div className="app">
					<BrowserRouter>
						<Navbar
							user={user}
							logout={logout}
							login={login}
						></Navbar>
						{user &&
						(user.role == "admin" || user.role == "editor") ? (
							<PageRoutes></PageRoutes>
						) : (
							<LoginContainer
								user={user}
								login={login}
							></LoginContainer>
						)}
						{/* <BlogEditor></BlogEditor> */}
					</BrowserRouter>
				</div>
			
		</ConfigProvider>
	);
}

export default App;
