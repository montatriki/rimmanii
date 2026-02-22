export interface Service {
    id: string;
    title: string;
    desc: string;
    img: string;
    fullDesc: string;
    benefits: string[];
    process: string[];
}

export const services: Service[] = [
    {
        id: "aesthetic-dermotherapy",
        title: "Aesthetic Dermotherapy",
        desc: "Non-invasive skin treatments for rejuvenation and health.",
        img: "/assets/WhatsApp Image 2026-02-06 at 22.05.38.jpeg",
        fullDesc: "Our Aesthetic Dermotherapy programs are designed to revitalize your skin's natural health and radiance without invasive surgery. Using cutting-edge technology and premium products, we target specific skin concerns such as aging, acne, hyperpigmentation, and texture irregularities. Our approach combines medical precision with aesthetic artistry to deliver results that look natural and last longer.",
        benefits: [
            "Stimulates collagen production",
            "Improves skin texture and tone",
            "Reduces fine lines and wrinkles",
            "Treats acne scars and pigmentation",
            "Minimal downtime"
        ],
        process: [
            "In-depth Skin Analysis",
            "Customized Treatment Plan",
            "Pre-treatment preparation",
            "Specialized Procedure",
            "Post-care guidance"
        ]
    },
    {
        id: "paramedical-dermopigmentation",
        title: "Paramedical Dermopigmentation",
        desc: "Reconstructive tattooing for scar camouflage and restoration.",
        img: "/assets/WhatsApp Image 2026-02-06 at 22.03.12.jpeg",
        fullDesc: "Paramedical Dermopigmentation is a specialized technique that uses tattooing to restore the natural appearance of the skin. It is ideal for camouflaging scars, restoring areolas after mastectomy, and treating conditions like vitiligo. Our specialists are trained in color theory and tissue integration to ensure that the results blend seamlessly with your surrounding skin tone.",
        benefits: [
            "Restores natural skin appearance",
            "Boosts self-confidence",
            "Long-lasting results",
            "Safe and sterile procedure",
            "Personalized color matching"
        ],
        process: [
            "Consultation & Color Matching",
            "Patch Test (if required)",
            "Pigmentation Session",
            "Healing & Follow-up",
            "Touch-up session"
        ]
    },
    {
        id: "skin-consultation",
        title: "Skin Consultation",
        desc: "Professional analysis and personalized treatment planning.",
        img: "/assets/WhatsApp Image 2026-02-06 at 22.20.08.jpeg",
        fullDesc: "Everything starts with a proper diagnosis. Our Comprehensive Skin Consultation involves a detailed analysis of your skin type, condition, and history. We use advanced diagnostic tools to see beneath the surface layers, allowing us to create a truly personalized treatment roadmap. Whether you're dealing with a specific issue or just want to maintain healthy skin, this is your first step.",
        benefits: [
            "Scientific skin analysis",
            "Tailored home-care routine",
            "Professional treatment recommendations",
            "Prevention of future skin issues",
            "Education on your specific skin type"
        ],
        process: [
            "Lifestyle & History Review",
            "Visual & Device Analysis",
            "Concern Discussion",
            "Routine Formulation",
            "Treatment Scheduling"
        ]
    }
];
