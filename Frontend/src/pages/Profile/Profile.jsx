import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
	selectCurrentToken,
	selectCurrentUser,
} from "@/features/auth/authSlice";

function Profile() {
	const token = useSelector(selectCurrentToken);
	const user = useSelector(selectCurrentUser);
	const navigate = useNavigate();
	return (
		<div>
			<button onClick={() => navigate("/")}>Home</button>
			<br />
			<div>Token: {token ? token : "undefined"}</div>
			<div>User: {user ? user : "undefined"}</div>
		</div>
	);
}

export default Profile;
