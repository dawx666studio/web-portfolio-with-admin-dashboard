export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
}

export interface ProductItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  isFeatured: boolean;
  isArchived: boolean;
  category: string;
  tags: string[];
  images: { id: string; url: string; altText: string | null; isPrimary: boolean }[];
  createdAt: string;
}

export interface BlogPostItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  isPublished: boolean;
  publishedAt: string;
  authorName: string;
  authorAvatar?: string;
  tags: string[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  orderIndex: number;
}

export interface ContactMessageItem {
  id: string;
  firstName: string;
  lastName?: string;
  email: string;
  orderNumber?: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface OrderItemRecord {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerAddress?: string;
  customerCity?: string;
  customerZip?: string;
  customerCountry?: string;
  subtotal: number;
  shipping: number;
  total: number;
  status: "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  paymentStatus: "UNPAID" | "PAID" | "REFUNDED";
  trackingNumber?: string;
  notes?: string;
  createdAt: string;
  items: {
    id: string;
    productId: string | null;
    productTitle: string;
    productPrice: number;
    quantity: number;
    image?: string;
  }[];
}

export interface SiteSettingsData {
  announcementText: string;
  announcementActive: boolean;
  heroHeadline: string;
  heroSubheadline: string;
  heroCtaText: string;
  heroCtaLink: string;
  artistName: string;
  artistTitle: string;
  bioHeadline: string;
  bioParagraph1: string;
  bioParagraph2: string;
  instagramUrl: string;
  twitterUrl: string;
  tiktokUrl: string;
  youtubeUrl: string;
  email: string;
}
