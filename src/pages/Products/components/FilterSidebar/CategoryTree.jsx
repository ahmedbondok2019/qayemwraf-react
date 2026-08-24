import React, { useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import { CheckboxGroup } from "./CheckboxGroup";
import { useLanguage } from "@/app/providers/I18nProvider";
import { cn } from "@/lib/utils";

/**
 * CategoryTree Component
 * Supports flat or nested category selection.
 */
export const CategoryTree = ({ categories = [], selectedCategories = [], onChange }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";
	const [expandedNodes, setExpandedNodes] = useState({});

	const toggleExpand = (categoryId, e) => {
		e.preventDefault();
		e.stopPropagation();
		setExpandedNodes(prev => ({
			...prev,
			[categoryId]: !prev[categoryId]
		}));
	};

	const renderNode = (node, depth = 0) => {
		const isExpanded = expandedNodes[node.id];
		const hasChildren = node.children && node.children.length > 0;
		const isChecked = selectedCategories.includes(node.id);

		return (
			<div key={node.id} className="flex flex-col">
				<div className={cn(
					"flex items-center justify-between",
					depth > 0 && (isRtl ? "pr-4 border-r border-border/40" : "pl-4 border-l border-border/40")
				)}>
					<div className="flex-1">
						<CheckboxGroup 
							label={node.label?.[language] || node.label?.en}
							value={node.id}
							count={node.count}
							checked={isChecked}
							onChange={onChange}
						/>
					</div>
					{hasChildren && (
						<button 
							onClick={(e) => toggleExpand(node.id, e)}
							className="p-1 rounded-md text-text-muted hover:text-text hover:bg-surface-2 transition-colors ml-2"
						>
							{isExpanded ? (
								<ChevronDown className="w-4 h-4" />
							) : (
								<ChevronRight className={cn("w-4 h-4", isRtl && "scale-x-[-1]")} />
							)}
						</button>
					)}
				</div>
				{hasChildren && isExpanded && (
					<div className="mt-1 flex flex-col gap-1">
						{node.children.map(child => renderNode(child, depth + 1))}
					</div>
				)}
			</div>
		);
	};

	return (
		<div className="flex flex-col max-h-[250px] overflow-y-auto no-scrollbar pe-1 gap-1">
			{categories.length > 0 ? (
				categories.map(cat => renderNode(cat, 0))
			) : (
				<span className="text-sm text-text-muted italic py-2">
					{isRtl ? "لا توجد أقسام مطابقة." : "No categories found."}
				</span>
			)}
		</div>
	);
};

export default CategoryTree;
