import { createSlice } from "@reduxjs/toolkit";
import storage from "@/services/storage/storage";
import { STORAGE_KEYS } from "@/services/storage/storageKeys";

/**
 * @typedef {import('@/lib/models').AuthState} AuthState
 */

/** @type {AuthState} */
const initialState = {
	user: storage.get(STORAGE_KEYS.USER, null),
	accessToken: storage.get(STORAGE_KEYS.AUTH_TOKEN, null),
	isAuthenticated: !!storage.get(STORAGE_KEYS.AUTH_TOKEN, null),
	status: 'idle',
	error: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setCredentials: (state, action) => {
			const { user, accessToken } = action.payload;
			state.user = user;
			state.accessToken = accessToken;
			state.isAuthenticated = true;
			state.error = null;
			state.status = 'succeeded';

			// Persist to storage
			storage.set(STORAGE_KEYS.USER, user);
			storage.set(STORAGE_KEYS.AUTH_TOKEN, accessToken);
		},
		updateUser: (state, action) => {
			if (state.user) {
				state.user = { ...state.user, ...action.payload };
				storage.set(STORAGE_KEYS.USER, state.user);
			}
		},
		clearCredentials: (state) => {
			state.user = null;
			state.accessToken = null;
			state.isAuthenticated = false;
			state.error = null;
			state.status = 'idle';

			// Remove from storage
			storage.remove(STORAGE_KEYS.USER);
			storage.remove(STORAGE_KEYS.AUTH_TOKEN);
		},
		logout: (state) => {
			state.user = null;
			state.accessToken = null;
			state.isAuthenticated = false;
			state.error = null;
			state.status = 'idle';

			storage.remove(STORAGE_KEYS.USER);
			storage.remove(STORAGE_KEYS.AUTH_TOKEN);
		}
	},
});

export const { setCredentials, updateUser, clearCredentials, logout } = authSlice.actions;

// Selectors
export const selectCurrentUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer;
