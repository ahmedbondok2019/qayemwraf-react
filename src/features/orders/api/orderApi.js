import api from "@/services/api/client";

export const orderApi = {
	getOrders: () => api.get("/orders"),
	getOrderById: (id) => api.get(`/orders/${id}`),
	createOrder: (data) => api.post("/orders", data),
	cancelOrder: (orderId) => api.post("/cancel-order", { order_id: orderId }),
};

export default orderApi;
