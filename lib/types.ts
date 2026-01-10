export interface MileageOption {
  mileage: number
  condition: "Excellent" | "Good" | "Fair"
  price: number
  warranty: string
  availability: "In Stock" | "Limited" | "Out of Stock"
}

export interface Part {
  id: string
  name: string
  category: string
  subcategory?: string
  brand: string
  partNumber: string
  description: string
  fitment: string[]
  mileageOptions: MileageOption[]
  images: string[]
  store: {
    name: string
    distance: number
    rating: number
    reviewCount: number
  }
  specs: Record<string, string>
  rating: number
  reviewCount: number
  badges?: string[]
  faqs?: FAQ[]
  videos?: Video[]
  articles?: Article[]
}

export interface Brand {
  id: string
  name: string
  logo: string
  description: string
  partCount: number
  history?: string
  foundedYear?: number
  headquarters?: string
  articles?: Article[]
  banner?: string
  gallery?: string[]
  isPublished?: boolean
  googleMerchantSync?: boolean
  categoryAssets?: BrandCategoryAsset[]
  googleMerchantFeedSettings?: GoogleMerchantFeedSettings
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  partCount: number
  subcategories?: string[]
}

export interface CartItem {
  productId: string
  product: Part
  mileageOption: MileageOption
  quantity: number
}

export interface Review {
  id: string
  author: string
  rating: number
  date: string
  comment: string
  verified: boolean
  helpful: number
}

export interface Article {
  id: string
  title: string
  excerpt: string
  content: string
  image: string
  date: string
  author: string
}

export interface FAQ {
  question: string
  answer: string
}

export interface Video {
  title: string
  url: string
  thumbnail: string
}

export interface BrandCategoryAsset {
  categorySlug: string
  type: "image" | "video" | "social" | "marketing"
  url: string
  label?: string
  redirectUrl?: string
}

export interface GoogleMerchantFeedSettings {
  feedUrl?: string
  autoSync: boolean
  syncFrequency: "hourly" | "daily" | "weekly"
  includeOutOfStock: boolean
  customLabels?: {
    label0?: string
    label1?: string
    label2?: string
    label3?: string
    label4?: string
  }
  lastSyncDate?: string
  totalProductsSynced?: number
}

export type UserRole = "super_admin" | "admin" | "manager" | "staff"

export type Department =
  | "customer_support"
  | "sales"
  | "buying"
  | "product_management"
  | "content_management"
  | "marketing"

export type Permission =
  | "manage_products"
  | "manage_users"
  | "manage_orders"
  | "manage_customers"
  | "manage_content"
  | "manage_reviews"
  | "bulk_upload"
  | "edit_pages"
  | "view_analytics"

export interface AdminUser {
  id: string
  name: string
  email: string
  role: UserRole
  department: Department
  avatar?: string
  createdAt: string
  lastLogin?: string
  permissions: Permission[]
}

export interface Customer {
  id: string
  name: string
  email: string
  phone?: string
  address?: string
  city?: string
  state?: string
  zip?: string
  totalOrders: number
  totalSpent: number
  createdAt: string
  lastOrder?: string
  notes?: string
}

export interface Order {
  id: string
  customerId: string
  customerName: string
  items: CartItem[]
  total: number
  status: OrderStatus
  createdAt: string
  shippingAddress: string
  trackingNumber?: string
}

export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled"

export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  admin: ["all"],
  product_manager: ["manage_products", "manage_content", "view_analytics"],
  sales: ["view_orders", "manage_orders", "view_customers"],
  customer_support: ["view_orders", "manage_reviews", "view_customers", "reply_messages"],
  super_admin: ["manage_users", "bulk_upload", "edit_pages"],
  manager: ["manage_orders", "manage_customers"],
  staff: ["view_orders", "view_customers"],
}
