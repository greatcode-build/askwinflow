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

export const HowItWorks: {
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
