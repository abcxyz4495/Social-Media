import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile/Profile";
import RequireAuth from "./features/auth/RequireAuth";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/login" element={<Login />} />

				<Route element={<RequireAuth />}>
					<Route path="/" element={<Home />} />
					<Route path="/profile" element={<Profile />} />
				</Route>

				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
