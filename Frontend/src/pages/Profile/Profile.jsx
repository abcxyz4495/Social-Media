import { useNavigate } from "react-router-dom";

function Profile() {
	const navigate = useNavigate();
	return (
		<div>
			<button onClick={() => navigate("/")}>Home</button>
		</div>
	);
}

export default Profile;
