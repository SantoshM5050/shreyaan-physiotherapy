export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  summary: string;
  author: string;
  date: string;
  readTime: string;
  heroImage: string;
  content: { heading: string; paragraph: string }[];
}

const isDemoEnabled =
  process.env.NODE_ENV !== "production" &&
  (process.env.ENABLE_DEMO_BLOGS === "true" || process.env.ALLOW_DEMO_DATA === "true");

const DEMO_BLOG_POSTS: Record<string, BlogPost> = {
  "exercises-for-lower-back-pain": {
    slug: "exercises-for-lower-back-pain",
    title: "5 Effective Exercises for Lower Back Pain Relief at Home",
    category: "Back Pain",
    summary: "Discover evidence-guided home exercises to strengthen your lumbar core and relieve persistent lower back stiffness safely.",
    author: "Dr. Sonam Maurya",
    date: "August 1, 2026",
    readTime: "5 min read",
    heroImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&auto=format&fit=crop&q=80",
    content: [
      {
        heading: "Understanding Lower Back Muscle Tightness",
        paragraph: "Lower back pain often stems from muscle weakness in the abdomen and gluteal muscles paired with tight hip flexors and prolonged sedentary sitting. Strengthening core muscles provides natural anatomical support to lumbar vertebrae.",
      },
      {
        heading: "Exercise 1: Pelvic Tilts",
        paragraph: "Lie flat on your back with knees bent. Gently tighten your lower abdominal muscles, pressing your lower back flush into the floor. Hold for 5 seconds and repeat 10 times.",
      },
      {
        heading: "Exercise 2: Cat-Cow Stretch",
        paragraph: "On hands and knees, slowly arch your spine upward toward the ceiling, then dip your abdomen down while raising your head gently. Perform 10 fluid repetitions.",
      },
      {
        heading: "When to Consult a Physiotherapist",
        paragraph: "If lower back pain radiates down your leg or is accompanied by numbness, stop home exercises and seek immediate clinical evaluation at Shreyaan Physiotherapy Center.",
      },
    ],
  },

  "ergonomic-desk-setup-neck-pain": {
    slug: "ergonomic-desk-setup-neck-pain",
    title: "How Ergonomic Desk Setup Prevents Chronic Neck Pain",
    category: "Neck Pain",
    summary: "Simple posture adjustments to eliminate forward-head strain, upper back stiffness, and tension headaches caused by computer work.",
    author: "Dr. Sonam Maurya",
    date: "July 28, 2026",
    readTime: "4 min read",
    heroImage: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=1200&auto=format&fit=crop&q=80",
    content: [
      {
        heading: "The Danger of 'Tech Neck'",
        paragraph: "For every inch your head moves forward from its neutral position, the effective weight on your cervical spine increases by 10 pounds. This causes severe strain on upper trapezius muscles.",
      },
      {
        heading: "Key Monitor & Chair Adjustments",
        paragraph: "Position your computer monitor so the top third of the screen sits at eye level. Adjust your armrests so your elbows rest at a 90-degree angle without shrugging shoulders.",
      },
    ],
  },

  "knee-osteoarthritis-physiotherapy": {
    slug: "knee-osteoarthritis-physiotherapy",
    title: "Understanding Knee Osteoarthritis: Can Physiotherapy Defer Surgery?",
    category: "Knee Pain",
    summary: "Clinical insights into how quadriceps conditioning and joint mobilization reduce joint friction and preserve natural knee function.",
    author: "Dr. Sonam Maurya",
    date: "July 20, 2026",
    readTime: "6 min read",
    heroImage: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=1200&auto=format&fit=crop&q=80",
    content: [
      {
        heading: "Role of Muscular Offloading",
        paragraph: "Strong quadriceps and hamstring muscles act as natural shock absorbers for the knee joint, reducing mechanical pressure on worn cartilage during walking.",
      },
    ],
  },

  "non-surgical-sciatica-relief": {
    slug: "non-surgical-sciatica-relief",
    title: "Non-Surgical Relief for Sciatica & Slip Disc Herniation",
    category: "Sciatica",
    summary: "How lumbar decompression, McKenzie extension, and nerve gliding flossing relieve nerve compression without surgery.",
    author: "Dr. Sonam Maurya",
    date: "July 15, 2026",
    readTime: "5 min read",
    heroImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&auto=format&fit=crop&q=80",
    content: [
      {
        heading: "Decompressing Sciatic Nerve Roots",
        paragraph: "Conservative physiotherapy focuses on centralizing radiating pain back into the lumbar spine using targeted extension exercises and nerve mobilization.",
      },
    ],
  },
};

export const BLOG_POSTS: Record<string, BlogPost> = isDemoEnabled ? DEMO_BLOG_POSTS : {};
