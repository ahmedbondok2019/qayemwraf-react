import LocalizedLink from "@/components/ui/LocalizedLink";
import React from "react";
import { } from "react-router-dom";
import { motion } from "framer-motion";

export const DealButton = ({ deal, language }) => {
	return (
		<LocalizedLink
			to={deal.link}
			className="group flex items-center justify-center w-full outline-none p-1 cursor-pointer select-none"
		>
			<motion.div
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				transition={{ type: "spring", stiffness: 400, damping: 17 }}
				className="w-full flex items-center justify-center"
			>
				{/* Directly render the image designed by the project owner */}
				<img
					src={deal.image}
					alt={deal.alt[language]}
					className="w-full shadow-sm group-hover:shadow-md transition-shadow duration-300"
				/>
			</motion.div>
		</LocalizedLink>
	);
};

export default DealButton;
