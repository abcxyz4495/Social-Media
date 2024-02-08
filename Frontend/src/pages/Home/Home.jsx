import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Home() {
	const navigate = useNavigate();
	const axiosPrivate = useAxiosPrivate();
	const location = useLocation();
	const [users, setUsers] = useState([]);

	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();

		const getUsers = async () => {
			try {
				const response = await axiosPrivate.get("/user", {
					signal: controller.signal,
				});
				console.log(response.data);
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
	}, []);

	console.log(users);
	return <div className="w-full h-screen">Home</div>;
}

export default Home;
