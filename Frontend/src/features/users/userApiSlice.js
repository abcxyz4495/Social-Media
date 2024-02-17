import { apiSlice } from "@/app/api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getUsers: builder.query({
			query: () => "/user",
			keepUnusedDataFor: 5,
		}),
	}),
});

export const { useGetUsersQuery } = userApiSlice;
