import { useQuery } from "@tanstack/react-query";
import api from "@/services/api/client";
import { API_ENDPOINTS } from "@/services/api/endpoints";

export const fallbackBlogs = [
	{
		id: 1,
		slug: "choosing-right-medical-bed",
		title: {
			en: "5 Tips for Choosing the Right Medical Bed at Home",
			ar: "5 نصائح لاختيار السرير الطبي المناسب في المنزل"
		},
		category: {
			id: "home-care",
			title: { en: "Home Care", ar: "الرعاية المنزلية" }
		},
		excerpt: {
			en: "Selecting a medical bed for a loved one is crucial for their recovery and comfort. Learn about movements, sizes, and mattress types.",
			ar: "اختيار السرير الطبي للمريض في المنزل أمر بالغ الأهمية لراحته وتعافيه. تعرف على أنواع الحركات والمقاسات والمراتب."
		},
		content: {
			en: `
				<p>Caring for a bedridden loved one at home comes with unique challenges. One of the most important decisions you will make is selecting a suitable medical bed. A good bed not only ensures the patient's comfort but also aids caregivers in daily tasks and prevents complications like bedsores.</p>
				<h3>1. Understand the Bed Movements</h3>
				<p>Medical beds come in 2-position, 3-position, or 5-position (5-movement) configurations. A 5-movement bed allows raising the head, foot, entire bed height, Trendelenburg (tilt head down), and Reverse Trendelenburg. For patients needing long-term recovery, a 5-movement electrical bed is highly recommended.</p>
				<h3>2. Electrical vs. Manual</h3>
				<p>Electrical beds use a remote control, allowing patients to adjust their own position if capable. Manual beds require hand cranks, which can be physically demanding for caregivers.</p>
				<h3>3. Safety Rails and Guards</h3>
				<p>Ensure the bed has sturdy ABS or steel side rails to prevent falls. ABS side rails are lightweight, easy to clean, and can be easily folded down.</p>
				<h3>4. High-Quality Mattress</h3>
				<p>A high-density foam mattress covered with a water-resistant, sterile medical leather cover is essential. This allows easy sanitization and long-term durability.</p>
				<h3>5. Mobility and Braking</h3>
				<p>Look for beds with premium 5-inch wheels and a reliable central or individual braking system to ensure safety during transfers.</p>
			`,
			ar: `
				<p>إن رعاية المريض طريح الفراش في المنزل تنطوي على تحديات فريدة. ومن أهم القرارات التي ستتخذها هي اختيار السرير الطبي المناسب. لا يضمن السرير الجيد راحة المريض فحسب، بل يساعد أيضاً مقدمي الرعاية في المهام اليومية ويمنع مضاعفات مثل قرح الفراش.</p>
				<h3>1. فهم حركات السرير</h3>
				<p>تأتي الأسرة الطبية بتهيئة حركتين، 3 حركات، أو 5 حركات. يتيح السرير ذو الـ 5 حركات رفع الرأس والقدمين وارتفاع السرير بالكامل، بالإضافة إلى وضعيتي تريندلينبرغ وتريندلينبرغ العكسية (الميل الطولي). للمرضى الذين يحتاجون إلى فترات طويلة من النقاهة، يوصى بشدة بالسرير الكهربائي ذو الـ 5 حركات.</p>
				<h3>2. كهربائي أم يدوي؟</h3>
				<p>تستخدم الأسرة الكهربائية جهاز التحكم عن بعد (الريموت)، مما يتيح للمريض تعديل وضعيته بنفسه إذا كان قادراً. أما الأسرة اليدوية فتتطلب تدوير المقابض يدوياً، مما قد يكون مجهداً بدنياً لمقدمي الرعاية.</p>
				<h3>3. حواجز وجوانب الأمان</h3>
				<p>تأكد من أن السرير يحتوي على حواجز جانبية متينة مصنوعة من ABS أو الصلب لمنع السقوط. جوانب الـ ABS خفيفة الوزن وسهلة التنظيف ويمكن طيها لأسفل بسهولة.</p>
				<h3>4. مرتبة عالية الجودة</h3>
				<p>المرتبة الإسفنجية عالية الكثافة والمغطاة بغطاء جلدي طبي معقم ومقاوم للماء هي خيار أساسي. يسمح هذا بالتعقيم السهل ويوفر متانة تدوم طويلاً.</p>
				<h3>5. العجلات ونظام الفرامل</h3>
				<p>ابحث عن أسرة مزودة بعجلات ممتازة مقاس 5 بوصات ونظام فرامل مركزي أو فردي موثوق لضمان الأمان أثناء نقل المريض.</p>
			`
		},
		image: "https://images.unsplash.com/photo-1584820927498-cafe8c1c969b?auto=format&fit=crop&q=80&w=800",
		author: {
			name: { en: "Dr. Sarah Ahmed", ar: "د. سارة أحمد" },
			avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=150"
		},
		publishedAt: "2026-07-20",
		readTime: { en: "5 min read", ar: "5 دقائق قراءة" }
	},
	{
		id: 2,
		slug: "why-omron-hypertension-leader",
		title: {
			en: "Why OMRON is the Leader in Blood Pressure Monitors",
			ar: "لماذا تعد أجهزة أومرون الرائدة في قياس ضغط الدم؟"
		},
		category: {
			id: "medical-devices",
			title: { en: "Medical Devices", ar: "أجهزة طبية" }
		},
		excerpt: {
			en: "Accuracy is key when monitoring hypertension. Find out why OMRON devices are recommended by doctors worldwide.",
			ar: "الدقة هي المفتاح عند مراقبة ضغط الدم المرتفع. اكتشف لماذا يوصي الأطباء بأجهزة أومرون عالمياً."
		},
		content: {
			en: `
				<p>Hypertension is often called the "silent killer" because it rarely has noticeable symptoms. Regular monitoring at home is vital for early detection and management. When choosing a blood pressure monitor, accuracy is the single most critical factor—which is why OMRON is the world-renowned choice.</p>
				<h3>Clinical Validation</h3>
				<p>Every OMRON monitor undergoes rigorous testing by major medical organizations (such as the European Society of Hypertension). Unlike generic brands, OMRON devices are clinically validated, ensuring that the readings you get at home are as accurate as those at the hospital.</p>
				<h3>Intellisense Technology</h3>
				<p>One common issue with blood pressure monitors is over-inflation of the cuff, which causes discomfort and inaccurate readings. OMRON's Intellisense technology automatically inflates the cuff to the ideal level for each individual user, making measurements quick, comfortable, and highly precise.</p>
				<h3>Easy Cuff Placement</h3>
				<p>Correct cuff placement is essential for accuracy. OMRON's Intelli Wrap Cuff features a 360-degree accuracy zone, meaning it delivers precise measurements in any position around the upper arm, eliminating errors due to incorrect positioning.</p>
			`,
			ar: `
				<p>غالباً ما يُطلق على ارتفاع ضغط الدم اسم "القاتل الصامت" لأنه نادراً ما يصاحبه أعراض واضحة. تعد المراقبة المنتظمة في المنزل أمراً حيوياً للكشف المبكر والسيطرة عليه. عند اختيار جهاز قياس ضغط الدم، تعد الدقة هي العامل الأكثر أهمية — ولهذا السبب تعد أومرون الخيار المفضل عالمياً.</p>
				<h3>التحقق السريري (Clinical Validation)</h3>
				<p>يخضع كل جهاز قياس من أومرون لاختبارات صارمة من قبل منظمات طبية كبرى (مثل الجمعية الأوروبية لارتفاع ضغط الدم). على عكس العلامات التجارية غير المعروفة، فإن أجهزة أومرون معتمدة سريرياً، مما يضمن دقة القياسات المنزلية ومطابقتها للمستشفيات.</p>
				<h3>تقنية Intellisense الذكية</h3>
				<p>تتمثل إحدى المشكلات الشائعة في أجهزة قياس ضغط الدم في النفخ المفرط للسوار، مما يسبب عدم الراحة وقراءات غير دقيقة. تقوم تقنية Intellisense من أومرون تلقائياً بنفخ السوار إلى المستوى المثالي لكل مستخدم على حدة، مما يجعل القياسات سريعة ومريحة ودقيقة للغاية.</p>
				<h3>سهولة وضع السوار على الذراع</h3>
				<p>الوضع الصحيح للسوار ضروري للحصول على دقة عالية. يتميز سوار Intelli Wrap Cuff من أومرون بمنطقة دقة 360 درجة، مما يعني أنه يعطي قياسات دقيقة في أي وضع حول الذراع، مما يقضي على الأخطاء الناتجة عن وضع السوار بشكل خاطئ.</p>
			`
		},
		image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&q=80&w=800",
		author: {
			name: { en: "Dr. Khaled Youssef", ar: "د. خالد يوسف" },
			avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=150"
		},
		publishedAt: "2026-07-15",
		readTime: { en: "4 min read", ar: "4 دقائق قراءة" }
	},
	{
		id: 3,
		slug: "medical-clinic-equipment-checklist",
		title: {
			en: "Equipping Your Medical Clinic: A Complete Checklist",
			ar: "تجهيز عيادتك الطبية الجديدة: الدليل الشامل للأجهزة والمستلزمات"
		},
		category: {
			id: "clinic-equipment",
			title: { en: "Clinic Equipment", ar: "تجهيزات العيادات" }
		},
		excerpt: {
			en: "From diagnostic tools to examination tables, here is the essential list of equipment you need to launch a successful clinic.",
			ar: "من أدوات التشخيص إلى شاذلونج الكشف، إليك قائمة الأجهزة الأساسية التي تحتاجها لإطلاق عيادة ناجحة."
		},
		content: {
			en: `
				<p>Starting a new medical clinic is an exciting milestone, but equipping it can be overwhelming. To provide the best patient care and ensure seamless daily operations, you need to invest in the right foundational equipment. Here is a comprehensive guide to help you launch your clinic successfully.</p>
				<h3>1. The Examination Room Foundation</h3>
				<p>At the center of any clinic is the examination table (شاذلونج). Whether you choose a manual examination bed or a multi-movement electrical table, it must be sturdy, easy to disinfect, and comfortable for patients. You will also need doctor stools, step stools, and focused medical lighting.</p>
				<h3>2. Diagnostic Essentials</h3>
				<p>Every medical practitioner requires reliable diagnostics. This includes a wall-mounted otoscope/ophthalmoscope set, stethoscope, blood pressure monitor, clinical thermometer, and a professional height-and-weight scale.</p>
				<h3>3. Infection Control & Sterilization</h3>
				<p>Patient safety is paramount. Autoclaves and dry-heat sterilizers are mandatory for sanitizing clinic instruments. You also need stainless steel trays, sterile containers, and biohazard waste bins.</p>
				<h3>4. Furniture and Cabinets</h3>
				<p>Organizing medical supplies keeps operations efficient. Double-door glass medical cabinets allow storage and easy retrieval of instruments, medicine, and consumables.</p>
			`,
			ar: `
				<p>إن بدء عيادة طبية جديدة يعد علامة بارزة ومثيرة، ولكن تجهيزها قد يكون أمراً شاقاً. لتقديم أفضل رعاية للمرضى وضمان سير العمل اليومي بسلاسة، تحتاج للاستثمار في المعدات التأسيسية المناسبة. إليك دليلاً شاملاً لمساعدتك في إطلاق عيادتك بنجاح.</p>
				<h3>1. أساسيات غرفة الكشف</h3>
				<p>في قلب أي عيادة يقع سرير الكشف (شاذلونج). سواء اخترت سرير كشف يدوي أو طاولة كهربائية متعددة الحركات، يجب أن يكون متيناً وسهل التطهير ومريحاً للمرضى. ستحتاج أيضاً إلى مقاعد للأطباء، وسلالم صعود صغيرة، وإضاءة طبية مركزة.</p>
				<h3>2. أساسيات التشخيص</h3>
				<p>يحتاج كل طبيب إلى أدوات تشخيص موثوقة. ويشمل ذلك مجموعة منظار الأذن والعين المثبتة على الحائط، السماعة الطبية، جهاز قياس ضغط الدم، ميزان الحرارة الطبي، وميزان قياس الطول والوزن المهني.</p>
				<h3>3. مكافحة العدوى والتعقيم</h3>
				<p>سلامة المرضى هي الأهم. تعد أجهزة التعقيم (الأتوتوكلاف) إلزامية لتعقيم أدوات العيادة. ستحتاج أيضاً إلى صواني من الاستانلس استيل، وحاويات معقمة، وسلال للتخلص من النفايات الطبية الخطرة.</p>
				<h3>4. الأثاث والخزائن الطبية</h3>
				<p>يساعد تنظيم المستلزمات الطبية في الحفاظ على كفاءة العمل. تسمح الدواليب الطبية الزجاجية ذات البابين بتخزين وعرض الأدوات والأدوية والمستهلكات لسهولة الاستخدام.</p>
			`
		},
		image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800",
		author: {
			name: { en: "Dr. Abdo Hamed", ar: "د. عبده حامد" },
			avatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=150"
		},
		publishedAt: "2026-07-10",
		readTime: { en: "6 min read", ar: "6 دقائق قراءة" }
	},
	{
		id: 4,
		slug: "role-of-oxygen-therapy-at-home",
		title: {
			en: "The Essential Guide to Oxygen Therapy at Home",
			ar: "الدليل الشامل للعلاج بالأكسجين المنزلي"
		},
		category: {
			id: "home-care",
			title: { en: "Home Care", ar: "الرعاية المنزلية" }
		},
		excerpt: {
			en: "Oxygen therapy is life-saving for patients with respiratory issues. Understand oxygen concentrators, cylinders, and safety guidelines.",
			ar: "العلاج بالأكسجين ينقذ حياة المرضى الذين يعانون من مشاكل تنفسية. تعرف على مكثفات الأكسجين، الأسطوانات، وإرشادات السلامة."
		},
		content: {
			en: `
				<p>Home oxygen therapy involves using a device that delivers extra oxygen into your lungs. It is commonly prescribed for patients with COPD, severe asthma, or other respiratory conditions. Doing it safely at home requires the right equipment and adherence to key safety procedures.</p>
				<h3>Oxygen Concentrators vs. Cylinders</h3>
				<p>Oxygen concentrators are electrical devices that filter oxygen out of the surrounding air, providing a continuous supply. Oxygen cylinders hold pressurized oxygen and have a finite limit, needing regular refills. Concentrators are highly recommended for daily, long-term home use.</p>
				<h3>Safety First</h3>
				<p>Oxygen is highly flammable. Keep all oxygen devices at least 5 to 10 feet away from open flames, gas stoves, and heaters. Never smoke or allow anyone to smoke near the patient.</p>
			`,
			ar: `
				<p>يتضمن العلاج بالأكسجين المنزلي استخدام جهاز يوصل أكسجيناً إضافياً إلى رئتيك. يوصى به عادةً للمرضى الذين يعانون من الانسداد الرئوي المزمن أو الربو الحاد. يتطلب القيام بذلك بأمان في المنزل المعدات المناسبة والالتزام بإجراءات السلامة.</p>
				<h3>مكثفات الأكسجين مقابل الأسطوانات</h3>
				<p>مكثفات الأكسجين هي أجهزة كهربائية تقوم بتصفية الأكسجين من الهواء المحيط، مما يوفر إمداداً مستمراً. أما أسطوانات الأكسجين فتحتوي على أكسجين مضغوط ولها سعة محدودة، مما يتطلب إعادة ملء دوري. يوصى بالمكثفات للاستخدام المنزلي اليومي طويل الأمد.</p>
				<h3>السلامة أولاً</h3>
				<p>الأكسجين سريع الاشتعال للغاية. احتفظ بجميع أجهزة الأكسجين على بعد 5 إلى 10 أقدام على الأقل من اللهب المكشوف ومواقد الغاز والسخانات. لا تدخن أبداً ولا تسمح لأي شخص بالتدخين بالقرب من المريض.</p>
			`
		},
		image: "https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&q=80&w=800",
		author: {
			name: { en: "Dr. Sarah Ahmed", ar: "د. سارة أحمد" },
			avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=150"
		},
		publishedAt: "2026-07-05",
		readTime: { en: "5 min read", ar: "5 دقائق قراءة" }
	}
];

export const mapBlogData = (apiBlog) => {
	if (!apiBlog) return null;

	// Sometimes category is null in the response
	const categoryObj = apiBlog.category && typeof apiBlog.category === 'object' 
		? { id: String(apiBlog.category.id || "cat-0"), title: { en: apiBlog.category.name || "", ar: apiBlog.category.name || "" } }
		: { id: "general", title: { en: "General", ar: "عام" } };

	// Description often contains HTML from API
	const contentHtml = apiBlog.description || "";
	
	// Strip HTML tags for the excerpt if needed, or just use meta_description
	const plainExcerpt = apiBlog.meta_description ? apiBlog.meta_description.replace(/<[^>]+>/g, '') : contentHtml.replace(/<[^>]+>/g, '').substring(0, 150) + "...";

	return {
		id: apiBlog.id,
		slug: apiBlog.slug || String(apiBlog.id),
		title: { en: apiBlog.title || apiBlog.name || "", ar: apiBlog.title || apiBlog.name || "" },
		category: categoryObj,
		excerpt: { en: plainExcerpt, ar: plainExcerpt },
		content: { en: contentHtml, ar: contentHtml },
		image: apiBlog.image || apiBlog.primary_image || "",
		author: {
			name: { en: apiBlog.author_name || "Admin", ar: apiBlog.author_name || "المدير" },
			avatar: "https://ui-avatars.com/api/?name=Admin&background=random"
		},
		publishedAt: apiBlog.created_at || apiBlog.published_at || new Date().toISOString().split('T')[0],
		readTime: { en: "5 min read", ar: "5 دقائق قراءة" },
		_apiOriginal: apiBlog
	};
};

export const useBlogs = () => {
	return useQuery({
		queryKey: ["blogs"],
		queryFn: async () => {
			try {
				const res = await api.get(API_ENDPOINTS.BLOGS);
				// If the API succeeds and returns list, return it. Otherwise use fallback.
				const list = res?.data?.data || res?.data || res;
				if (Array.isArray(list) && list.length > 0) {
					return list.map(mapBlogData).filter(Boolean);
				}
				return fallbackBlogs;
			} catch (e) {
				console.warn("Blogs API failed, using fallback blogs:", e);
				return fallbackBlogs;
			}
		},
	});
};

export const useBlogBySlug = (slug) => {
	return useQuery({
		queryKey: ["blog", slug],
		queryFn: async () => {
			try {
				const res = await api.get(`${API_ENDPOINTS.BLOGS}/${slug}`);
				const post = res?.data?.data || res?.data || res;
				if (post && post.id) {
					return mapBlogData(post);
				}
				return fallbackBlogs.find(p => p.slug === slug) || null;
			} catch (e) {
				console.warn(`Blog details API for ${slug} failed, using fallback:`, e);
				return fallbackBlogs.find(p => p.slug === slug) || null;
			}
		},
		enabled: !!slug
	});
};

export default useBlogs;
