"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  Tag,
  Wrench,
  Warehouse,
  Globe,
  MessageSquare,
  BarChart,
  Mail,
  CreditCard,
  Settings,
  ShieldCheck,
  Upload,
  FileText,
} from "lucide-react"

import DashboardPage from "../page"
import ProductsPage from "../products/page"
import OrdersPage from "../orders/page"
import CustomersPage from "../customers/page"
import BrandsPage from "../brands/page"
import MechanicsPage from "../partners/mechanics/page"
import JunkyardsPage from "../partners/junkyards/page"
import ContentPage from "../content/page"
import ReviewsPage from "../reviews/page"
import ChatbotPage from "../chatbot/page"
import AnalyticsPage from "../analytics/page"
import EmailsPage from "../emails/page"
import PaymentsPage from "../payments/page"
import SettingsPage from "../settings/page"
import UsersPage from "../users/page"
import BulkUploadPage from "../bulk-upload/page"
import FooterPage from "../footer/page"

export default function AdminPortalPage() {
  const [activeTab, setActiveTab] = useState("dashboard")

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="border-b border-white/10 bg-neutral-900 sticky top-0 z-50">
          <div className="px-4">
            <TabsList className="h-14 bg-transparent border-0 w-full justify-start overflow-x-auto flex-nowrap">
              <TabsTrigger
                value="dashboard"
                className="data-[state=active]:bg-red-600 data-[state=active]:text-white gap-2"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger
                value="products"
                className="data-[state=active]:bg-red-600 data-[state=active]:text-white gap-2"
              >
                <Package className="h-4 w-4" />
                Products
              </TabsTrigger>
              <TabsTrigger
                value="bulk-upload"
                className="data-[state=active]:bg-red-600 data-[state=active]:text-white gap-2"
              >
                <Upload className="h-4 w-4" />
                Bulk Upload
              </TabsTrigger>
              <TabsTrigger
                value="orders"
                className="data-[state=active]:bg-red-600 data-[state=active]:text-white gap-2"
              >
                <ShoppingCart className="h-4 w-4" />
                Orders
              </TabsTrigger>
              <TabsTrigger
                value="customers"
                className="data-[state=active]:bg-red-600 data-[state=active]:text-white gap-2"
              >
                <Users className="h-4 w-4" />
                Customers
              </TabsTrigger>
              <TabsTrigger
                value="brands"
                className="data-[state=active]:bg-red-600 data-[state=active]:text-white gap-2"
              >
                <Tag className="h-4 w-4" />
                Brands
              </TabsTrigger>
              <TabsTrigger
                value="mechanics"
                className="data-[state=active]:bg-red-600 data-[state=active]:text-white gap-2"
              >
                <Wrench className="h-4 w-4" />
                Mechanics
              </TabsTrigger>
              <TabsTrigger
                value="junkyards"
                className="data-[state=active]:bg-red-600 data-[state=active]:text-white gap-2"
              >
                <Warehouse className="h-4 w-4" />
                Junkyards
              </TabsTrigger>
              <TabsTrigger
                value="content"
                className="data-[state=active]:bg-red-600 data-[state=active]:text-white gap-2"
              >
                <Globe className="h-4 w-4" />
                Content
              </TabsTrigger>
              <TabsTrigger
                value="footer"
                className="data-[state=active]:bg-red-600 data-[state=active]:text-white gap-2"
              >
                <FileText className="h-4 w-4" />
                Footer
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="data-[state=active]:bg-red-600 data-[state=active]:text-white gap-2"
              >
                <MessageSquare className="h-4 w-4" />
                Reviews
              </TabsTrigger>
              <TabsTrigger
                value="chatbot"
                className="data-[state=active]:bg-red-600 data-[state=active]:text-white gap-2"
              >
                <MessageSquare className="h-4 w-4" />
                Chatbot
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                className="data-[state=active]:bg-red-600 data-[state=active]:text-white gap-2"
              >
                <BarChart className="h-4 w-4" />
                Analytics
              </TabsTrigger>
              <TabsTrigger
                value="users"
                className="data-[state=active]:bg-red-600 data-[state=active]:text-white gap-2"
              >
                <ShieldCheck className="h-4 w-4" />
                Users
              </TabsTrigger>
              <TabsTrigger
                value="emails"
                className="data-[state=active]:bg-red-600 data-[state=active]:text-white gap-2"
              >
                <Mail className="h-4 w-4" />
                Emails
              </TabsTrigger>
              <TabsTrigger
                value="payments"
                className="data-[state=active]:bg-red-600 data-[state=active]:text-white gap-2"
              >
                <CreditCard className="h-4 w-4" />
                Payments
              </TabsTrigger>
              <TabsTrigger
                value="settings"
                className="data-[state=active]:bg-red-600 data-[state=active]:text-white gap-2"
              >
                <Settings className="h-4 w-4" />
                Settings
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        <div className="p-0">
          <TabsContent value="dashboard" className="m-0">
            <DashboardPage />
          </TabsContent>
          <TabsContent value="products" className="m-0">
            <ProductsPage />
          </TabsContent>
          <TabsContent value="bulk-upload" className="m-0">
            <BulkUploadPage />
          </TabsContent>
          <TabsContent value="orders" className="m-0">
            <OrdersPage />
          </TabsContent>
          <TabsContent value="customers" className="m-0">
            <CustomersPage />
          </TabsContent>
          <TabsContent value="brands" className="m-0">
            <BrandsPage />
          </TabsContent>
          <TabsContent value="mechanics" className="m-0">
            <MechanicsPage />
          </TabsContent>
          <TabsContent value="junkyards" className="m-0">
            <JunkyardsPage />
          </TabsContent>
          <TabsContent value="content" className="m-0">
            <ContentPage />
          </TabsContent>
          <TabsContent value="footer" className="m-0">
            <FooterPage />
          </TabsContent>
          <TabsContent value="reviews" className="m-0">
            <ReviewsPage />
          </TabsContent>
          <TabsContent value="chatbot" className="m-0">
            <ChatbotPage />
          </TabsContent>
          <TabsContent value="analytics" className="m-0">
            <AnalyticsPage />
          </TabsContent>
          <TabsContent value="users" className="m-0">
            <UsersPage />
          </TabsContent>
          <TabsContent value="emails" className="m-0">
            <EmailsPage />
          </TabsContent>
          <TabsContent value="payments" className="m-0">
            <PaymentsPage />
          </TabsContent>
          <TabsContent value="settings" className="m-0">
            <SettingsPage />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
