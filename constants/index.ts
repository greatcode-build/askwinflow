import { MessageSquare, LucideIcon, Star, Bell, Paperclip } from "lucide-react";

export const keyFeatures: {
  id: number;
  title: string;
  text: string;
  icon: LucideIcon;
}[] = [
  {
    id: 1,
    title: "Threaded Comments",
    text: "Conversations stay organized with nested replies up to 3 levels deep.",
    icon: MessageSquare,
  },
  {
    id: 2,
    title: "Community Rating",
    text: "The best ideas rise to the top through transparent rating and downvote signals.",
    icon: Star,
  },
  {
    id: 3,
    title: "File Attachments",
    text: "Attach PDFs, images, and documents directly to your posts for full context.",
    icon: Bell,
  },
  {
    id: 4,
    title: "Smart Notifications",
    text: "Stay informed about replies, mentions, and activity on posts you follow.",
    icon: Paperclip,
  },
];

export const HowItWorksData: {
  id: number;
  title: string;
  text: string;
  image: string;
}[] = [
  {
    id: 1,
    title: "Create Your Profile",
    text: "Select your profession and interests to personalize your experience.",
    image: "/frame_3.png",
  },
  {
    id: 2,
    title: "Post a Question or Idea",
    text: "Share challenges, insights, or resources with the community.",
    image: "/frame_4.png",
  },
  {
    id: 3,
    title: "Collaborate with Experts",
    text: "Participate in meaningful discussions and exchange knowledge.",
    image: "/frame_5.png",
  },
];

export const interestOptions = [
  {
    id: "tech_enthusiast",
    title: "Tech Enthusiast",
    description: "Product, Design, Engineering",
    icon: "/cpu.png",
  },
  {
    id: "educator",
    title: "Educator",
    description: "Product, Design, Engineering",
    icon: "/graduation_cap.png",
  },
  {
    id: "tech",
    title: "Tech Enthusiast",
    description: "Product, Design, Engineering",
    icon: "/cpu.png",
  },
];

export const discussionsData = [
  {
    id: 1,
    name: "Kelvin Park",
    text: "Rust vs. Go for building CLI developer tools in 2026",
    image: "/image_9.png",
    comment: 400,
    rating: 200,
  },
  {
    id: 2,
    name: "Kenneth Kelvin",
    text: "Best practices for running async product discovery sprints?",
    image: "/image_2.png",
    comment: 40,
    rating: 7,
  },
  {
    id: 3,
    name: "Kelly Watercary",
    text: "How do you assess student engagement in hybrid classrooms?",
    image: "/image_3.png",
    comment: 5,
    rating: 10,
  },
  {
    id: 4,
    name: "Kenneth Kelvin",
    text: "Best practices for running async product discovery sprints?",
    image: "/image_9.png",
    comment: 7,
    rating: 8,
  },
  {
    id: 5,
    name: "Kelvin Park",
    text: "Framework for prioritizing product features with limited eng capacity",
    image: "/image_9.png",
    comment: 400,
    rating: 200,
  },
];
