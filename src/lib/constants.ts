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
  address: "Karigamombe Centre, First Floor Room 109, Corner Julius Nyerere & Samora Machel, Harare, Zimbabwe",
  operatingHours: {
    weekdays: "7:00 AM – 6:00 PM",
    saturday: "8:00 AM – 4:00 PM",
    sunday: "8:00 AM – 1:00 PM",
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
  {
    id: "professional-moaners",
    title: "Professional Moaners",
    shortTitle: "Moaners",
    description:
      "Experienced professional mourners for funerals and memorial services. We provide respectful, culturally appropriate mourning services to honor your loved ones.",
    icon: "Heart",
    image: "/services/professional-moaners.jpg",
    benefits: [
      "Culturally respectful mourning",
      "Experienced professional mourners",
      "Flexible scheduling for services",
      "Dignified and compassionate",
    ],
    features: [
      "Traditional funeral mourning",
      "Memorial service support",
      "Night vigil attendance",
      "Cultural rites participation",
    ],
    useCases: [
      "Funerals requiring traditional mourning",
      "Memorial services",
      "Night vigils (kurova guva)",
      "Family needing mourning support",
    ],
  },
  {
    id: "funeral-moving-support",
    title: "Funeral & Moving Support",
    shortTitle: "Funeral Moving",
    description:
      "Comprehensive logistical support for funerals and household moves. We handle transport, setup, and coordination so you can focus on what matters.",
    icon: "Truck",
    image: "/services/funeral-moving.jpg",
    benefits: [
      "Stress-free logistics",
      "Experienced coordination team",
      "Flexible scheduling",
      "Respectful handling of belongings",
    ],
    features: [
      "Body transport coordination",
      "Funeral venue setup",
      "Household moving & packing",
      "Furniture disassembly/reassembly",
    ],
    useCases: [
      "Families organizing funerals",
      "Household relocations",
      "Funeral logistics coordination",
      "Elderly relatives moving homes",
    ],
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


