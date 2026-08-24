import React, { useState } from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import { MessageCircle, HelpCircle, ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export const QnASubtab = () => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	const [qaList, setQaList] = useState([
		{
			id: 1,
			question: {
				en: "Does this blood pressure monitor run on batteries or electricity?",
				ar: "هل يعمل جهاز ضغط الدم هذا بالبطاريات أم بالكهرباء؟"
			},
			answer: {
				en: "It runs on both! It comes with 4 AA batteries included, and it also has a micro-USB port if you want to connect it directly to an electrical outlet.",
				ar: "يعمل بكليهما! يأتي معه 4 بطاريات AA، ويحتوي أيضاً على منفذ micro-USB إذا كنت تريد توصيله بمأخذ الكهرباء مباشرة."
			},
			author: "Mohamed A.",
			date: { en: "2 weeks ago", ar: "منذ أسبوعين" }
		},
		{
			id: 2,
			question: {
				en: "Is the cuff size suitable for large arms?",
				ar: "هل حجم الكفة (المحبس) مناسب للذراع الكبيرة؟"
			},
			answer: {
				en: "Yes, the included cuff is a wide-range cuff that fits arm circumferences from 22cm to 42cm, which covers most adult sizes.",
				ar: "نعم، الكفة المرفقة هي كفة ذات نطاق واسع تناسب محيط الذراع من 22 سم إلى 42 سم، وهو ما يغطي معظم مقاسات البالغين."
			},
			author: "Sarah K.",
			date: { en: "1 month ago", ar: "منذ شهر" }
		}
	]);

	const [question, setQuestion] = useState("");
	const [name, setName] = useState("");
	const [isSubmitted, setIsSubmitted] = useState(false);

	const handleAskQuestion = (e) => {
		e.preventDefault();
		if (!question.trim()) return;

		const newQA = {
			id: Date.now(),
			question: { en: question, ar: question },
			answer: null, // No answer yet
			author: name.trim() || (isRtl ? "مستخدم" : "Anonymous"),
			date: { en: "Just now", ar: "الآن" }
		};

		setQaList([newQA, ...qaList]);
		setQuestion("");
		setName("");
		setIsSubmitted(true);
		setTimeout(() => setIsSubmitted(false), 4000);
	};

	return (
		<div className="flex flex-col gap-8 animate-in fade-in duration-300">
			
			{/* Question List */}
			<div className="flex flex-col gap-6">
				<h3 className="text-xl font-bold text-text flex items-center gap-2">
					<HelpCircle className="w-5 h-5 text-primary" />
					{isRtl ? "أسئلة وأجوبة العملاء" : "Customer Questions & Answers"}
				</h3>

				<div className="flex flex-col gap-4">
					{qaList.map(item => (
						<div key={item.id} className="p-5 bg-surface-2/40 rounded-2xl border border-border/50 flex flex-col gap-3">
							{/* Question */}
							<div className="flex items-start gap-3">
								<span className="w-6 h-6 bg-primary/10 text-primary text-xs font-bold rounded-full flex items-center justify-center shrink-0 mt-0.5">Q</span>
								<div className="flex flex-col gap-1">
									<h4 className="font-bold text-text text-sm sm:text-base leading-relaxed">{item.question[language]}</h4>
									<span className="text-[10px] text-text-muted">{isRtl ? "طرحه" : "Asked by"} {item.author} • {item.date[language]}</span>
								</div>
							</div>

							{/* Answer */}
							{item.answer ? (
								<div className="flex items-start gap-3 pt-3 border-t border-border/40">
									<span className="w-6 h-6 bg-success/10 text-success text-xs font-bold rounded-full flex items-center justify-center shrink-0 mt-0.5">A</span>
									<p className="text-sm text-text-secondary leading-relaxed">{item.answer[language]}</p>
								</div>
							) : (
								<div className="flex items-start gap-3 pt-3 border-t border-border/40 text-text-muted italic text-xs">
									<span className="w-6 h-6 bg-border/20 rounded-full flex items-center justify-center shrink-0 mt-0.5">A</span>
									<p>{isRtl ? "لم يتم الرد على هذا السؤال بعد. سيقوم خبير طبي بالرد قريباً." : "Not answered yet. A medical expert will respond shortly."}</p>
								</div>
							)}
						</div>
					))}
				</div>
			</div>

			{/* Ask a Question Form */}
			<div className="bg-surface rounded-2xl border border-border/60 p-6">
				<h3 className="text-lg font-bold text-text mb-4">
					{isRtl ? "هل لديك سؤال؟ اسأل هنا" : "Have a Question? Ask Here"}
				</h3>

				{isSubmitted ? (
					<div className="p-4 bg-success/10 text-success border border-success/20 rounded-xl flex items-center gap-3">
						<div className="w-8 h-8 rounded-full bg-success text-white flex items-center justify-center shrink-0">
							<Check className="w-4 h-4" />
						</div>
						<div className="flex flex-col">
							<span className="font-bold text-sm">{isRtl ? "تم إرسال سؤالك بنجاح!" : "Question submitted successfully!"}</span>
							<span className="text-xs text-success/80">{isRtl ? "سنقوم بمراجعته والإجابة عليه في أقرب وقت." : "We will review and answer it as soon as possible."}</span>
						</div>
					</div>
				) : (
					<form onSubmit={handleAskQuestion} className="flex flex-col gap-4">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="flex flex-col gap-1.5">
								<label className="text-xs font-bold text-text-secondary">{isRtl ? "الاسم (اختياري)" : "Name (Optional)"}</label>
								<input 
									type="text" 
									value={name}
									onChange={e => setName(e.target.value)}
									placeholder={isRtl ? "مثال: أحمد محمد" : "e.g. John Doe"}
									className="h-11 px-4 bg-surface-2 border border-border/80 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm"
								/>
							</div>
						</div>
						<div className="flex flex-col gap-1.5">
							<label className="text-xs font-bold text-text-secondary">{isRtl ? "سؤالك" : "Your Question"}</label>
							<textarea 
								rows="3"
								value={question}
								onChange={e => setQuestion(e.target.value)}
								placeholder={isRtl ? "اكتب سؤالك بوضوح وتفصيل هنا..." : "Type your question clearly here..."}
								className="p-4 bg-surface-2 border border-border/80 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm resize-none"
								required
							/>
						</div>
						<div className="flex justify-end">
							<button 
								type="submit"
								className="h-12 px-6 bg-primary hover:bg-primary-hover text-white font-extrabold rounded-xl transition-all shadow-sm active:scale-[0.98] text-sm"
							>
								{isRtl ? "ارسل السؤال" : "Submit Question"}
							</button>
						</div>
					</form>
				)}
			</div>

		</div>
	);
};

export default QnASubtab;
