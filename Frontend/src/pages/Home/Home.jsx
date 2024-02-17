import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useGetUsersQuery } from "@/features/users/userApiSlice";
import { logOut } from "@/features/auth/authSlice";

function Home() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const {
		data: user,
		isLoading,
		isSuccess,
		isError,
		error,
	} = useGetUsersQuery();

	let content;
	if (isLoading) {
		content = <p>Loading...</p>;
	} else if (isSuccess) {
		content = (
			<section>
				<h1>Users List</h1>
				<ul>
					{user.map((each) => (
						<li key={each._id}>{each.email}</li>
					))}
				</ul>
			</section>
		);
	} else if (isError) {
		content = <p>{JSON.stringify(error)}</p>;
	}

	function handleLogout() {
		dispatch(logOut());
	}

	return (
		<div className="w-full h-screen">
			<button onClick={() => navigate("/profile")}>Profile</button>
			<br />
			{content}
			<button onClick={handleLogout}>Log Out</button>
		</div>
	);
}

export default Home;
