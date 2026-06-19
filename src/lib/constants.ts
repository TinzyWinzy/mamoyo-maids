export const SITE_CONFIG = {
  name: "WOBIC Employment Services",
  tagline: "Your Trusted Employment Partner",
  description:
    "Professional recruitment, staff placement, and training services. We provide reliable people with police clearances for domestic work, security, driving, construction, and more.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://mamoyo-maids.vercel.app",
  phone: process.env.NEXT_PUBLIC_BUSINESS_PHONE || "+263734257057",
  whatsapp: process.env.NEXT_PUBLIC_BUSINESS_WHATSAPP || "+263734257057",
  phoneSecondary: process.env.NEXT_PUBLIC_BUSINESS_PHONE_SECONDARY || "+263783717844",
  email: process.env.NEXT_PUBLIC_BUSINESS_EMAIL || "info@wobic.co.zw",
  address: "Karigamombe Centre, 11th Floor, Corner Julius Nyerere & Samora Machel, Harare, Zimbabwe",
  operatingHours: {
    weekdays: "7:00 AM – 6:00 PM",
    saturday: "8:00 AM – 4:00 PM",
    sunday: "Closed",
  },
  social: {
    facebook: "https://facebook.com/wobicemployment",
    instagram: "https://instagram.com/wobicemployment",
    tiktok: "https://tiktok.com/@wobic0",
    linkedin: "https://linkedin.com/company/wobic",
  },
};

export const SERVICES = [
  {
    id: "home-cleaning",
    title: "Home Cleaning",
    shortTitle: "Home Cleaning",
    description:
      "Regular cleaning to keep your home fresh, tidy, and welcoming every day.",
    icon: "Home",
    image: "/services/home-cleaning.jpg",
    benefits: [
      "Consistent freshness",
      "Tailored to your schedule",
      "All rooms covered",
      "Eco-friendly products available",
    ],
    features: [
      "Dusting & vacuuming",
      "Mopping & sweeping",
      "Kitchen & bathroom sanitization",
      "Surface wiping & tidying",
    ],
    useCases: [
      "Weekly maintenance cleaning",
      "Busy families needing regular help",
      "Professionals with limited time",
    ],
  },
  {
    id: "deep-cleaning",
    title: "Deep Cleaning",
    shortTitle: "Deep Cleaning",
    description:
      "Thorough top-to-bottom cleaning for a truly spotless home.",
    icon: "Sparkles",
    image: "/services/deep-cleaning.jpg",
    benefits: [
      "Eliminates hidden dirt",
      "Improves air quality",
      "Restores shine to every surface",
      "Perfect for seasonal refresh",
    ],
    features: [
      "Inside appliance cleaning",
      "Baseboard & trim detailing",
      "Window sill & blind cleaning",
      "Grout & tile scrubbing",
    ],
    useCases: [
      "Pre- or post-event cleaning",
      "Seasonal deep refresh",
      "First-time service trial",
    ],
  },
  {
    id: "laundry-ironing",
    title: "Laundry & Ironing",
    shortTitle: "Laundry",
    description:
      "Wash, dry, fold, and iron — we handle it all so you don't have to.",
    icon: "Shirt",
    image: "/services/laundry.jpg",
    benefits: [
      "Fresh, crisp laundry",
      "Time-saving convenience",
      "Careful garment handling",
      "Custom preferences honored",
    ],
    features: [
      "Washing & drying",
      "Folding & organizing",
      "Professional ironing",
      "Stain treatment",
    ],
    useCases: [
      "Busy households",
      "Families with children",
      "Professionals needing pressed workwear",
    ],
  },
  {
    id: "organizing-decluttering",
    title: "Organizing & Decluttering",
    shortTitle: "Organizing",
    description:
      "Transform cluttered spaces into organized, peaceful environments.",
    icon: "LayoutGrid",
    image: "/services/organizing.jpg",
    benefits: [
      "More usable space",
      "Reduced stress",
      "Systematic organization",
      "Long-term maintenance tips",
    ],
    features: [
      "Closet & wardrobe organization",
      "Kitchen pantry sorting",
      "Drawer & cabinet organizing",
      "Decluttering consultation",
    ],
    useCases: [
      "Moving into a new home",
      "Post-renovation organizing",
      "Overwhelmed homeowners",
    ],
  },
  {
    id: "maid-training",
    title: "Maid Training & Upskilling",
    shortTitle: "Maid Training",
    description:
      "Professional training programs for domestic workers to build skills, earn certification, and deliver exceptional service.",
    icon: "GraduationCap",
    image: "/services/maid-training.jpg",
    benefits: [
      "Nationally recognised certification",
      "Improved employability",
      "Higher earning potential",
      "Confidence and professionalism",
    ],
    features: [
      "Cleaning techniques & standards",
      "Hygiene & sanitation protocols",
      "Safety & emergency procedures",
      "Customer service & etiquette",
    ],
    useCases: [
      "New domestic workers seeking training",
      "Experienced maids wanting to upskill",
      "Employers who want professionally trained staff",
    ],
  },
  {
    id: "move-cleaning",
    title: "Move-in / Move-out Cleaning",
    shortTitle: "Move Cleaning",
    description:
      "Start fresh or leave spotless with our comprehensive move cleaning service.",
    icon: "Truck",
    image: "/services/move-cleaning.jpg",
    benefits: [
      "Deposit-back guarantee",
      "Complete property coverage",
      "Fast turnaround",
      "Stress-free transitions",
    ],
    features: [
      "Inside cabinet cleaning",
      "Appliance deep clean",
      "Wall & fixture wiping",
      "Floor restoration",
    ],
    useCases: [
      "Tenants moving out",
      "New homeowners moving in",
      "Property managers preparing listings",
    ],
  },
];

export const MAID_PROFILES = [
  {
    id: "maid-1",
    name: "Sarah",
    age: 28,
    areaOfOrigin: "Mashonaland East",
    church: "Methodist",
    children: 2,
    salaryExpectation: 250,
    policeClearance: true,
    previousWork: "3 years domestic work in Borrowdale",
    daysOff: "Sunday",
  },
  {
    id: "maid-2",
    name: "Tendai",
    age: 34,
    areaOfOrigin: "Manicaland",
    church: "Anglican",
    children: 3,
    salaryExpectation: 200,
    policeClearance: true,
    previousWork: "5 years live-in maid in Greendale",
    daysOff: "Saturday",
  },
  {
    id: "maid-3",
    name: "Chipo",
    age: 25,
    areaOfOrigin: "Mashonaland West",
    church: "Apostolic",
    children: 1,
    salaryExpectation: 280,
    policeClearance: true,
    previousWork: "2 years housekeeping at a lodge",
    daysOff: "Sunday",
  },
  {
    id: "maid-4",
    name: "Ruth",
    age: 31,
    areaOfOrigin: "Midlands",
    church: "Catholic",
    children: 2,
    salaryExpectation: 230,
    policeClearance: true,
    previousWork: "4 years domestic work in Avondale",
    daysOff: "Alternate Sundays",
  },
  {
    id: "maid-5",
    name: "Patience",
    age: 40,
    areaOfOrigin: "Masvingo",
    church: "ZCC",
    children: 4,
    salaryExpectation: 180,
    policeClearance: true,
    previousWork: "8 years live-out maid in Mt Pleasant",
    daysOff: "Sunday",
  },
  {
    id: "maid-6",
    name: "Nyasha",
    age: 27,
    areaOfOrigin: "Harare",
    church: "Baptist",
    children: 1,
    salaryExpectation: 300,
    policeClearance: true,
    previousWork: "3 years nanny and housekeeper",
    daysOff: "Saturday & Sunday",
  },
  {
    id: "maid-7",
    name: "Linda",
    age: 33,
    areaOfOrigin: "Bulawayo",
    church: "Seventh Day Adventist",
    children: 2,
    salaryExpectation: 220,
    policeClearance: true,
    previousWork: "6 years domestic worker in Highlands",
    daysOff: "Saturday",
  },
  {
    id: "maid-8",
    name: "Ruvarashe",
    age: 24,
    areaOfOrigin: "Mashonaland Central",
    church: "Pentecostal",
    children: 0,
    salaryExpectation: 260,
    policeClearance: true,
    previousWork: "1 year housekeeping at a guesthouse",
    daysOff: "Sunday",
  },
];

export const EMPLOYMENT_BENEFITS = [
  {
    title: "Competitive Pay",
    description: "Earn fair wages that recognize your skills and dedication.",
    icon: "Wallet",
  },
  {
    title: "Flexible Hours",
    description: "Choose shifts that fit your lifestyle and personal commitments.",
    icon: "Clock",
  },
  {
    title: "Training Provided",
    description: "We provide full training so you can deliver excellence from day one.",
    icon: "GraduationCap",
  },
  {
    title: "Growth Opportunities",
    description: "Advance your career with ongoing support and development.",
    icon: "TrendingUp",
  },
  {
    title: "Supportive Team",
    description: "Join a friendly, caring community that values every team member.",
    icon: "Heart",
  },
  {
    title: "Job Security",
    description: "Steady work with a trusted company that's growing fast.",
    icon: "ShieldCheck",
  },
];

export const TESTIMONIALS = [
  {
    name: "Grace M.",
    role: "Busy Mom",
    rating: 5,
    text: "Mamoyo Services made our home sparkle. The team is always punctual and so thorough. Highly recommended!",
  },
  {
    name: "Tendai K.",
    role: "Professional",
    rating: 5,
    text: "The team was punctual, friendly, and professional. My house has never looked this good. Thank you!",
  },
  {
    name: "Rudo P.",
    role: "Airbnb Host",
    rating: 5,
    text: "I use their move-in/move-out service for my rental properties. Consistently excellent results every time.",
  },
  {
    name: "David S.",
    role: "Elderly Homeowner",
    rating: 5,
    text: "Such a relief to find a service I can trust. They treat my home with care and respect.",
  },
  {
    name: "Chiedza L.",
    role: "Property Manager",
    rating: 5,
    text: "Reliable, professional, and great value. Mamoyo Services is my go-to for all property turnovers.",
  },
  {
    name: "Tariro N.",
    role: "Bride-to-Be",
    rating: 5,
    text: "The Aunt for Hire service was a lifesaver. She guided me through every tradition and made my wedding preparation so much smoother.",
  },
  {
    name: "Munyaradzi & Tsitsi",
    role: "Couple",
    rating: 5,
    text: "Marriage counselling helped us build a stronger foundation. We're grateful for the wisdom and patience shared with us.",
  },
];

export const WHY_CHOOSE_US = [
  {
    title: "Police Clearance Guaranteed",
    description:
      "Every person we place has a valid police clearance. Your safety and peace of mind come first.",
    icon: "ShieldCheck",
  },
  {
    title: "Trained & Reliable Staff",
    description:
      "We train our candidates so they arrive ready to deliver professional, high-quality service.",
    icon: "GraduationCap",
  },
  {
    title: "Wide Range of Services",
    description:
      "From house maids to security guards, drivers to construction workers — we cover all your staffing needs.",
    icon: "LayoutGrid",
  },
  {
    title: "Affordable Rates",
    description:
      "Competitive pricing with no hidden fees. Get the right staff at the right price.",
    icon: "Wallet",
  },
  {
    title: "Trusted Since Day One",
    description:
      "Hundreds of families and businesses trust us to deliver reliable staff every time.",
    icon: "Heart",
  },
];

export const TRUST_BADGES = [
  { label: "Police Cleared Staff", icon: "ShieldCheck" },
  { label: "Trained Professionals", icon: "GraduationCap" },
  { label: "Satisfaction Guaranteed", icon: "ThumbsUp" },
  { label: "Licensed Agency", icon: "Building2" },
];

export const BOOKING_STEPS = [
  {
    step: 1,
    title: "Pick Your Service",
    description: "Choose from our range of professional home services.",
    icon: "ClipboardList",
  },
  {
    step: 2,
    title: "Select Date & Time",
    description: "Pick a date and time that works perfectly for your schedule.",
    icon: "CalendarDays",
  },
  {
    step: 3,
    title: "Confirm & Relax",
    description: "We'll take care of the rest. Enjoy your peace of mind!",
    icon: "PartyPopper",
  },
];

export const TIKTOK_POSTS = [
  {
    id: "1",
    url: "https://www.tiktok.com/@mamoyomaids/video/1",
    title: "Professional Home Cleaning Tips",
    service: "Home Cleaning",
  },
  {
    id: "2",
    url: "https://www.tiktok.com/@mamoyomaids/video/2",
    title: "Deep Cleaning Before & After",
    service: "Deep Cleaning",
  },
  {
    id: "3",
    url: "https://www.tiktok.com/@mamoyomaids/video/3",
    title: "Marriage Prep Advice",
    service: "Marriage Counselling",
  },
  {
    id: "4",
    url: "https://www.tiktok.com/@mamoyomaids/video/4",
    title: "Behind the Scenes with Our Maids",
    service: "Maid Placement",
  },
];

export const TEAM_MEMBERS = [
  {
    name: "Mamoyo",
    role: "Founder & CEO",
    bio: "Mamoyo founded Mamoyo Services with a vision to provide reliable, trustworthy home and family services that families can depend on.",
  },
  {
    name: "Nyasha Chikwanha",
    role: "Operations Manager",
    bio: "Nyasha ensures every cleaning appointment runs smoothly and every customer receives exceptional service.",
  },
  {
    name: "Farai Mutasa",
    role: "Head of Quality",
    bio: "Farai leads our quality assurance team, ensuring consistent excellence across every cleaning job.",
  },
  {
    name: "Rumbidzai Ndlovu",
    role: "Customer Relations",
    bio: "Rumbidzai is dedicated to making every customer feel valued, heard, and satisfied with our services.",
  },
];
