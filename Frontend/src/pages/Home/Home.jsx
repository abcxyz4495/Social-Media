import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import useLogout from "@/hooks/useLogout";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Home() {
	const navigate = useNavigate();
	const axiosPrivate = useAxiosPrivate();
	const location = useLocation();
	const logout = useLogout();
	const [users, setUsers] = useState([]);

	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();

		const getUsers = async () => {
			try {
				const response = await axiosPrivate.get("/user", {
					signal: controller.signal,
				});
				console.log("Response Data", response.data);
				isMounted && setUsers(response.data);
			} catch (err) {
				console.error(err);
				navigate("/login", {
					state: { from: location },
					replace: true,
				});
			}
		};

		getUsers();

		return () => {
			isMounted = false;
			controller.abort();
		};
	}, [axiosPrivate, location, navigate]);

	console.log("User", users);

	async function signOut() {
		await logout();
		navigate("/login");
	}
	return (
		<div className="w-full h-screen">
			<button onClick={() => navigate("/profile")}>Profile</button>
			<br />
			<button onClick={signOut}>Log Out</button>
		</div>
	);
}

export default Home;
