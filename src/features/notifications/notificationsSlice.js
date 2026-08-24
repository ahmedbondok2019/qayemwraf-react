import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	notifications: [], // Array of { id, message, type, read }
};

const notificationsSlice = createSlice({
	name: "notifications",
	initialState,
	reducers: {
		addNotification: (state, action) => {
			state.notifications.push({
				id: Date.now().toString(),
				read: false,
				...action.payload,
			});
		},
		markAsRead: (state, action) => {
			const notification = state.notifications.find(n => n.id === action.payload);
			if (notification) {
				notification.read = true;
			}
		},
		markAllAsRead: (state) => {
			state.notifications.forEach(n => {
				n.read = true;
			});
		},
		removeNotification: (state, action) => {
			state.notifications = state.notifications.filter(n => n.id !== action.payload);
		},
		clearNotifications: (state) => {
			state.notifications = [];
		},
	},
});

export const {
	addNotification,
	markAsRead,
	markAllAsRead,
	removeNotification,
	clearNotifications,
} = notificationsSlice.actions;
export default notificationsSlice.reducer;
