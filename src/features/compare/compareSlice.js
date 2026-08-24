import { createSlice } from "@reduxjs/toolkit";
import storage from "@/services/storage/storage";
import { STORAGE_KEYS } from "@/services/storage/storageKeys";

const MAX_COMPARE_ITEMS = 4;

const persistedCompare = storage.get(STORAGE_KEYS.COMPARE, {
	items: [], // Array of products
	count: 0
});

const initialState = persistedCompare;

const compareSlice = createSlice({
	name: "compare",
	initialState,
	reducers: {
		addToCompare: (state, action) => {
			const product = action.payload;
			if (state.items.length < MAX_COMPARE_ITEMS && !state.items.find(item => item.id === product.id)) {
				state.items.push(product);
				state.count = state.items.length;
				storage.set(STORAGE_KEYS.COMPARE, state);
			}
		},
		removeFromCompare: (state, action) => {
			const productId = action.payload;
			state.items = state.items.filter(item => item.id !== productId);
			state.count = state.items.length;
			storage.set(STORAGE_KEYS.COMPARE, state);
		},
		toggleCompare: (state, action) => {
			const product = action.payload;
			const existingIndex = state.items.findIndex(item => item.id === product.id);
			
			if (existingIndex >= 0) {
				state.items.splice(existingIndex, 1);
			} else if (state.items.length < MAX_COMPARE_ITEMS) {
				state.items.push(product);
			}
			
			state.count = state.items.length;
			storage.set(STORAGE_KEYS.COMPARE, state);
		},
		clearCompare: (state) => {
			state.items = [];
			state.count = 0;
			storage.remove(STORAGE_KEYS.COMPARE);
		},
	},
});

export const { addToCompare, removeFromCompare, toggleCompare, clearCompare } = compareSlice.actions;

// Selectors
export const selectCompareItems = (state) => state.compare.items;
export const selectCompareCount = (state) => state.compare.count;
export const selectIsCompared = (productId) => (state) => state.compare.items.some(item => item.id === productId);

export default compareSlice.reducer;
