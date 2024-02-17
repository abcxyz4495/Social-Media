/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaGithub } from "react-icons/fa";
import { FaLessThan } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setCredentials } from "@/features/auth/authSlice";
import { logOut } from "@/features/auth/authSlice";
import { useLoginMutation } from "@/features/auth/authApiSlice";

function Login() {
	const navigate = useNavigate();
	const [login, { isLoading }] = useLoginMutation();
	const dispatch = useDispatch();

	const [hasAccount, setHasAccount] = useState(true);

	const { register, handleSubmit, reset } = useForm();

	const from = location.state?.from?.pathname || "/";

	async function handlerUserLogin(data) {
		try {
			const userData = await login({
				email: data.email,
				password: data.password,
			}).unwrap();
			dispatch(setCredentials({ ...userData, email: data.email }));
			reset();
			navigate(from, { replace: true });
		} catch (error) {
			if (!error?.response) console.log("No server response");
			else if (error.response?.status === 400)
				console.log("Missing email or password");
			else if (error.response?.status === 401)
				console.log("Unauthorized");
			else console.log("Login Failed");
		}
	}

	function handlerUserSignUp(data) {
		console.log("SignUp", data);
		reset();
	}

	return (
		<div className="w-full h-screen flex">
			<div className="h-full w-2/4 max-[1100px]:w-full">
				<div className="w-full h-full flex justify-center items-center">
					<div className="max-w-[600px] min-w-[300px]">
						<div className="p-8">
							<h1 className="text-gray-600 text-md font-semibold pb-[50px]"></h1>
							<h2 className="font-bold text-3xl pb-1">
								{hasAccount ? "Sign In" : "Sign Up"}
							</h2>
							<p className="text-gray-600 pb-10">
								Enter your email address to get started
							</p>
							<button className="w-full h-[40px] border rounded-lg mb-3 text-sm font-bold shadow-md duration-75 hover:shadow-none">
								<FaGithub className="inline mr-1 text-lg" />{" "}
								Sign in with Github
							</button>
							<button className="w-full h-[40px] border rounded-lg mb-8 text-sm font-bold text-center shadow-md duration-75 hover:shadow-none">
								<FcGoogle className="inline mr-1 text-lg" />
								Sign in with Google
							</button>
							<br />
							<form
								onSubmit={handleSubmit(
									hasAccount
										? handlerUserLogin
										: handlerUserSignUp
								)}
							>
								<label
									htmlFor="email"
									className="text-gray-600 mb-2"
								>
									Email Address
								</label>
								<input
									type="email"
									{...register("email")}
									placeholder="Your email address"
									className="w-full border h-10 rounded-lg p-4 mb-4"
									autoComplete="false"
									required
								/>
								<label
									htmlFor="password"
									className="text-gray-600"
								>
									Your Password
								</label>
								<input
									type="password"
									{...register("password", { minLength: 8 })}
									placeholder="Your password"
									className="w-full border h-10 rounded-lg p-4 mb-6"
									autoComplete="false"
									required
								/>
								<button
									className="w-full border h-[40px] rounded-lg text-white bg-slate-900 font-bold shadow-md hover:bg-slate-950 duration-75"
									type="submit"
								>
									{hasAccount ? "Sign In" : "Sign Up"}
								</button>
							</form>
							<div className="text-center">
								<p
									className="pt-7 pb-1 text-sm underline text-slate-500 cursor-pointer"
									onClick={() =>
										setHasAccount((prev) => !prev)
									}
								>
									{hasAccount
										? "Don't have an account? Sign Up"
										: "Already have ab account? Sign In"}
								</p>
								<p className="text-sm underline text-slate-500"></p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="bg-green-500 h-full w-2/4 max-[1100px]:hidden"></div>
		</div>
	);
}

export default Login;
