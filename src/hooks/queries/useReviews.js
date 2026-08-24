import { useMutation, useQueryClient } from "@tanstack/react-query";
import reviewApi from "@/features/reviews/api/reviewApi";

export const useAddReview = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (reviewData) => {
			const response = await reviewApi.addReview(reviewData);
			return response.data || response;
		},
		onSuccess: () => {
			// Invalidate product details to pull updated average rating and reviews list
			queryClient.invalidateQueries({ queryKey: ["product"] });
		},
	});
};
