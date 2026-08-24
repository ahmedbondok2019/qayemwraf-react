import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { updateUser } from "@/features/auth/authSlice";
import userApi from "../api/userApi";
import { useEffect } from "react";

export const useProfile = (options = {}) => {
	const dispatch = useDispatch();

	const query = useQuery({
		queryKey: ["profile"],
		queryFn: async () => {
			const res = await userApi.getProfile();
			return res.data || res;
		},
		...options,
	});

	const profileData = query.data;

	useEffect(() => {
		if (profileData) {
			dispatch(updateUser(profileData));
		}
	}, [profileData, dispatch]);

	return query;
};

export default useProfile;
