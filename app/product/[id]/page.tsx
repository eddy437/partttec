"use client"

import { useEffect } from "react"

import React from "react"

import { useCartStore } from "@/lib/cart-store"
import { useParams, useRouter } from "next/navigation"

import { useState } from "react"

import Link from "next/link"
import Image from "next/image" // Added Image import

import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

// Mock data and functions (replace with actual imports/implementations)
const getProductById = (id: string) => {
  // Mock implementation
  return {
    id: "1",
    name: "Used Engine - 5.7L V8 HEMI",
    price: 2500,
    description: "A powerful V8 engine for Dodge and Chrysler vehicles.",
    category: "Engine",
    image: "https://via.placeholder.com/600/FF0000/FFFFFF?text=Engine",
    images: [
      "https://via.placeholder.com/600/FF0000/FFFFFF?text=Engine1",
      "https://via.placeholder.com/600/FF0000/FFFFFF?text=Engine2",
      "https://via.placeholder.com/600/FF0000/FFFFFF?text=Engine3",
    ],
    rating: 4.8,
    reviews: 127,
    inStock: true,
    warranty: "6-Month Warranty",
    condition: "Used",
    sku: "ENG-HEMI-57",
    make: "Dodge",
    model: "Challenger",
    year: 2019,
    fitment: [
      { year: "2019", make: "Dodge", model: "Challenger", engine: "5.7L V8 HEMI" },
      { year: "2020", make: "Dodge", model: "Challenger", engine: "5.7L V8 HEMI" },
      { year: "2019", make: "Dodge", model: "Charger", engine: "5.7L V8 HEMI" },
    ],
    salesLast24h: 5,
    stockLevel: 3,
    views: 127,
  }
}
const SiteHeader = ({ itemCount }: { itemCount: number }) => (
  <header className="bg-slate-900 text-white py-4 px-6 border-b border-slate-700">
    <div className="container mx-auto flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Link href="/" className="text-2xl font-bold hover:text-red-400 transition-colors">
          AUW
        </Link>
        <nav className="flex gap-4">
          <Link href="/shop" className="hover:text-red-400 transition-colors">
            Shop
          </Link>
          <Link href="/about" className="hover:text-red-400 transition-colors">
            About
          </Link>
          <Link href="/contact" className="hover:text-red-400 transition-colors">
            Contact
          </Link>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <button type="button" className="p-2 hover:bg-slate-700 rounded-full transition-colors">
          <Icons.Search className="h-5 w-5" />
        </button>
        <button type="button" className="p-2 hover:bg-slate-700 rounded-full transition-colors">
          <Icons.User className="h-5 w-5" />
        </button>
        <Link href="/cart" className="relative p-2 hover:bg-slate-700 rounded-full transition-colors">
          <Icons.ShoppingCart className="h-5 w-5" />
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </Link>
      </div>
    </div>
  </header>
)
const fitments = [
  { yearRange: "2019-2020", make: "Dodge", models: ["Challenger", "Charger"] },
  { yearRange: "2018-2022", make: "Chrysler", models: ["300"] },
]
const priceHistory = [100, 120, 150, 130, 160, 170, 190, 180, 200, 220, 210, 250]
const mileageTiers = [
  {
    label: "Economy",
    miles: "80,000 - 100,000 miles",
    price: 1875,
    warranty: "60-Day Warranty",
    condition: "Used",
    availability: "In Stock",
    color: "amber",
    badge: "Best Value",
  },
  {
    label: "Standard",
    miles: "50,000 - 80,000 miles",
    price: 2250,
    warranty: "90-Day Warranty",
    condition: "Used",
    availability: "In Stock",
    color: "blue",
    badge: "Popular Choice",
  },
  {
    label: "Premium",
    miles: "Under 50,000 miles",
    price: 2500,
    warranty: "6-Month Warranty",
    condition: "Remanufactured",
    availability: "In Stock",
    color: "emerald",
  },
]

// Mock data for shipping rates
const shippingRate = {
  standard: { price: 75.5, days: "5-7 Business Days" },
  express: { price: 120.0, days: "2-3 Business Days" },
  freight: { price: 250.0, days: "7-10 Business Days" },
  freeThreshold: 500,
}

// Mock Icons (assuming they are correctly imported or defined elsewhere)
const Icons = {
  Star: ({ className, fill }: { className?: string; fill?: string }) => (
    <svg className={className} fill={fill || "none"} stroke="currentColor" viewBox="0 0 24 24">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  Check: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  CheckCircle2: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  ShoppingCart: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  ),
  ChevronRight: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  ),
  ChevronDown: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  ),
  ChevronUp: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <polyline points="18 15 12 9 6 15" />
    </svg>
  ),
  PlayCircle: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
      <path d="M10 8l6 4-6 4z" />
    </svg>
  ),
  Phone: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  Mail: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  Send: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  ),
  Truck: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <rect x="1" y="3" width="15" height="13" />
      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  ),
  Shield: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  Package: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  ),
  Heart: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
  Share: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  ),
  Bell: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  ),
  Gauge: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="m12 14 4-4" />
      <path d="M3.34 19a10 10 0 1 1 17.32 0" />
    </svg>
  ),
  Car: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2" />
      <circle cx="6.5" cy="16.5" r="2.5" />
      <circle cx="16.5" cy="16.5" r="2.5" />
    </svg>
  ),
  Settings: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
  Tag: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  ),
  Calculator: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <line x1="8" y1="6" x2="16" y2="6" />
      <line x1="8" y1="10" x2="8" y2="10.01" />
      <line x1="12" y1="10" x2="12" y2="10.01" />
      <line x1="16" y1="10" x2="16" y2="10.01" />
      <line x1="8" y1="14" x2="8" y2="14.01" />
      <line x1="12" y1="14" x2="12" y2="14.01" />
      <line x1="16" y1="14" x2="16" y2="14.01" />
      <line x1="8" y1="18" x2="8" y2="18.01" />
      <line x1="12" y1="18" x2="12" y2="18.01" />
      <line x1="16" y1="18" x2="16" y2="18.01" />
    </svg>
  ),
  Eye: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  AlertCircle: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
  CheckCircle: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  X: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  Wrench: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  ),
  Flame: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  ),
  Headphones: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
    </svg>
  ),
  MessageSquare: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  FileText: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  ),
  Video: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <polygon points="23 7 16 12 23 17 23 7" />
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
    </svg>
  ),
  RotateCcw: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <polyline points="1 4 1 10 7 10" />
      <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
    </svg>
  ),
  RefreshCw: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <polyline points="23 4 23 10 17 10" />
      <polyline points="1 20 1 14 7 14" />
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
    </svg>
  ),
  Sparkles: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  ),
  TrendingDown: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
      <polyline points="17 18 23 18 23 12" />
    </svg>
  ),
  BadgeCheck: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  Layers: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  Lock: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  QrCode: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="3" height="3" />
      <rect x="18" y="14" width="3" height="3" />
      <rect x="14" y="18" width="3" height="3" />
      <rect x="18" y="18" width="3" height="3" />
    </svg>
  ),
  HelpCircle: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  Search: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  User: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  PlayCircle: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
      <path d="M10 8l6 4-6 4z" />
    </svg>
  ),
  X: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  Wrench: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  ),
  Flame: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  ),
  Headphones: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
    </svg>
  ),
  MessageSquare: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  FileText: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  ),
  Video: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <polygon points="23 7 16 12 23 17 23 7" />
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
    </svg>
  ),
  RotateCcw: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <polyline points="1 4 1 10 7 10" />
      <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
    </svg>
  ),
  RefreshCw: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <polyline points="23 4 23 10 17 10" />
      <polyline points="1 20 1 14 7 14" />
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
    </svg>
  ),
  Sparkles: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  ),
  TrendingDown: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
      <polyline points="17 18 23 18 23 12" />
    </svg>
  ),
  BadgeCheck: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  Layers: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  Lock: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  QrCode: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="3" height="3" />
      <rect x="18" y="14" width="3" height="3" />
      <rect x="14" y="18" width="3" height="3" />
      <rect x="18" y="18" width="3" height="3" />
    </svg>
  ),
  HelpCircle: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  Search: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  User: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  PlayCircle: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
      <path d="M10 8l6 4-6 4z" />
    </svg>
  ),
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}

function Badge({
  children,
  className,
  variant = "default",
}: {
  children: React.ReactNode
  className?: string
  variant?: "default" | "secondary" | "destructive" | "outline"
}) {
  const variants = {
    default: "bg-red-600 text-white",
    secondary: "bg-slate-200 text-slate-800",
    destructive: "bg-red-500 text-white",
    outline: "border border-slate-300 text-slate-700",
  }
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}

function Accordion({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("space-y-2", className)}>{children}</div>
}

function AccordionItem({ children, value }: { children: React.ReactNode; value: string }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="border rounded-lg">
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<{ isOpen?: boolean; toggle?: () => void }>, {
            isOpen,
            toggle: () => setIsOpen(!isOpen),
          })
        }
        return child
      })}
    </div>
  )
}

function AccordionTrigger({
  children,
  isOpen,
  toggle,
}: {
  children: React.ReactNode
  isOpen?: boolean
  toggle?: () => void
}) {
  return (
    <button
      type="button"
      onClick={toggle}
      className="flex w-full items-center justify-between px-4 py-3 font-medium text-left hover:bg-slate-50"
    >
      {children}
      <Icons.ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
    </button>
  )
}

function AccordionContent({ children, isOpen }: { children: React.ReactNode; isOpen?: boolean }) {
  if (!isOpen) return null
  return <div className="px-4 pb-3 text-slate-600">{children}</div>
}

function Dialog({
  open,
  onOpenChange,
  children,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
}) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={() => onOpenChange(false)} />
      <div className="relative bg-white rounded-lg shadow-xl max-w-lg w-full mx-4 max-h-[90vh] overflow-auto">
        {children}
      </div>
    </div>
  )
}

function DialogContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("p-6", className)}>{children}</div>
}

function DialogHeader({ children }: { children: React.ReactNode }) {
  return <div className="mb-4">{children}</div>
}

function DialogTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-lg font-semibold">{children}</h2>
}

function DialogDescription({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-slate-500 mt-1">{children}</p>
}

function DialogFooter({ children }: { children: React.ReactNode }) {
  return <div className="mt-6 flex justify-end gap-2">{children}</div>
}

// Types
interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  description: string
  category: string
  image: string
  images?: string[]
  rating: number
  reviews: number
  inStock: boolean
  warranty?: string
  condition?: string
  sku?: string
  mileage?: string
  make?: string
  model?: string
  year?: number
  fitment?: { year: string; make: string; model: string; engine?: string }[]
  views?: number
  salesLast24h?: number
  stockLevel?: number
}

interface MileageTier {
  id: string
  name: string
  range: string
  price: number
  warranty: string
  available: boolean
  popular?: boolean
  label: string
  miles: string
  condition: string
  availability: string
  color: "emerald" | "blue" | "amber"
  badge?: string
}

// Vehicle Fitments Data
const VEHICLE_FITMENTS: Record<string, { yearRange: string; make: string; models: string[] }[]> = {
  Engine: [
    { yearRange: "2018-2023", make: "Dodge", models: ["Challenger", "Charger", "Durango"] },
    { yearRange: "2019-2023", make: "RAM", models: ["1500", "2500", "3500"] },
    { yearRange: "2018-2022", make: "Chrysler", models: ["300"] },
  ],
  Transmission: [
    { yearRange: "2017-2023", make: "Ford", models: ["F-150", "Mustang", "Explorer"] },
    { yearRange: "2018-2023", make: "Chevrolet", models: ["Silverado 1500", "Camaro", "Tahoe"] },
    { yearRange: "2019-2023", make: "GMC", models: ["Sierra 1500", "Yukon"] },
  ],
  "Brakes & Brake Parts": [
    { yearRange: "2015-2023", make: "Toyota", models: ["Camry", "Corolla", "RAV4", "Highlander"] },
    { yearRange: "2016-2023", make: "Honda", models: ["Accord", "Civic", "CR-V", "Pilot"] },
  ],
  Suspension: [
    { yearRange: "2014-2023", make: "BMW", models: ["3 Series", "5 Series", "X3", "X5"] },
    { yearRange: "2015-2023", make: "Mercedes-Benz", models: ["C-Class", "E-Class", "GLC", "GLE"] },
  ],
  "Electrical Systems": [
    { yearRange: "2016-2023", make: "Nissan", models: ["Altima", "Sentra", "Rogue", "Pathfinder"] },
    { yearRange: "2017-2023", make: "Hyundai", models: ["Elantra", "Sonata", "Tucson", "Santa Fe"] },
  ],
  "Body & Exterior": [
    { yearRange: "2018-2023", make: "Jeep", models: ["Wrangler", "Grand Cherokee", "Cherokee", "Compass"] },
    { yearRange: "2017-2023", make: "Subaru", models: ["Outback", "Forester", "Crosstrek", "Impreza"] },
  ],
}

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedMileage, setSelectedMileage] = useState(1) // This state isn't directly used for selection logic, but represents the index
  const [zipCode, setZipCode] = useState("")
  const [shippingCost, setShippingCost] = useState<number | null>(null)
  const [coreExchange, setCoreExchange] = useState(false)
  const [vinNumber, setVinNumber] = useState("")
  const [vinResult, setVinResult] = useState<{
    compatible: boolean
    confidence: number
    vehicle: string
    year: string
    make: string
    model: string
    engine: string
    transmission: string
    drivetrain: string
  } | null>(null)
  const [showPriceAlert, setShowPriceAlert] = useState(false)
  const [targetPrice, setTargetPrice] = useState("")
  const [alertEmail, setAlertEmail] = useState("") // This variable is declared but not used. It's renamed to priceAlertEmail for clarity.
  const [priceAlertSet, setPriceAlertSet] = useState(false)
  const [financingMonths, setFinancingMonths] = useState(12)
  const [showChat, setShowChat] = useState(false)
  const [chatMessages, setChatMessages] = useState<{ role: string; content: string }[]>([])
  const [chatInput, setChatInput] = useState("")
  const [quoteForm, setQuoteForm] = useState({ name: "", email: "", phone: "", vehicle: "", message: "" })
  const [quoteSubmitted, setQuoteSubmitted] = useState(false)

  // State for UI elements
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [showCompare, setShowCompare] = useState(false)
  const [showVinDecoder, setShowVinDecoder] = useState(false)
  const [showShippingCalc, setShowShippingCalc] = useState(false)
  const [showQuoteForm, setShowQuoteForm] = useState(false)
  const [showFinancing, setShowFinancing] = useState(false)
  const [showLiveChat, setShowLiveChat] = useState(false)
  const [mechanicZip, setMechanicZip] = useState("")
  const [showMechanics, setShowMechanics] = useState(false)
  const [isDecodingVin, setIsDecodingVin] = useState(false) // Added state for VIN decoding loading
  const [shippingZip, setShippingZip] = useState("") // State for shipping calculator zip code
  const [hasCoreToReturn, setHasCoreToReturn] = useState(false) // State for core exchange
  const [selectedMileageIndex, setSelectedMileageIndex] = useState(0) // Index for selected mileage tier

  const addItem = useCartStore((state) => state.addItem)

  // This hook is called conditionally, violating the rules of hooks.
  // Moved `useCartStore` call to the top level.
  const itemCount = useCartStore((state) => state.getItemCount())

  useEffect(() => {
    if (params.id) {
      const productData = getProductById(params.id as string)
      if (productData) {
        setProduct(productData as Product)
      }
    }
  }, [params.id])

  // Generate mileage-based pricing tiers
  const selectedTier = mileageTiers[selectedMileageIndex] || {
    price: product?.price || 0,
    warranty: "90-Day Warranty",
    condition: "Used",
    availability: "In Stock",
    color: "amber",
  }

  const coreValue = product ? Math.round((product.price || 0) * 0.15) : 0
  const finalPrice = (selectedTier?.price || 0) - (hasCoreToReturn ? coreValue : 0)
  const monthlyPayment = Math.round(finalPrice / financingMonths)

  // Simulate shipping calculation
  const calculateShipping = () => {
    if (shippingZip.length === 5) {
      // Simulate calculation based on zip code
      console.log("Calculating shipping for ZIP:", shippingZip)
      setShippingCost(99.99) // Placeholder
    }
  }

  // VIN decoder simulation
  const decodeVin = () => {
    if (vinNumber.length === 17) {
      setIsDecodingVin(true)
      setTimeout(() => {
        setVinResult({
          compatible: Math.random() > 0.2,
          confidence: Math.round(85 + Math.random() * 15),
          vehicle: "2019 Dodge Challenger SE",
          year: "2019",
          make: "Dodge",
          model: "Challenger",
          engine: "5.7L V8 HEMI",
          transmission: "8-Speed Automatic",
          drivetrain: "RWD",
        })
        setIsDecodingVin(false)
      }, 1000)
    }
  }

  // Chat functionality
  const handleChatSubmit = () => {
    if (!chatInput.trim()) return
    const userMessage = {
      type: "user",
      text: chatInput,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }
    setChatMessages((prev) => [...prev, userMessage])

    setTimeout(() => {
      const assistantResponse = {
        type: "assistant",
        text: `Thank you for your message regarding the ${product?.name}. Our team will assist you shortly. We offer ${selectedTier?.warranty} and typically ship within 2-3 business days.`,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setChatMessages((prev) => [...prev, assistantResponse])
    }, 1500)

    setChatInput("")
  }

  // Quote submission
  const handleQuoteSubmit = () => {
    if (quoteForm.name && quoteForm.email && quoteForm.phone) {
      setQuoteSubmitted(true)
      localStorage.setItem(
        "quoteRequest",
        JSON.stringify({
          ...quoteForm,
          product: product?.name,
          price: finalPrice,
          date: new Date().toISOString(),
        }),
      )
    }
  }

  const handleAddToCart = () => {
    if (product) {
      addItem({
        id: product.id,
        name: product.name,
        price: finalPrice,
        quantity: quantity,
        image: product.image,
      })
      alert(`${quantity} x ${product.name} added to cart!`)
    }
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <SiteHeader itemCount={itemCount} />
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading product...</p>
        </div>
      </div>
    )
  }

  const images = product.images || [product.image, product.image, product.image]

  const tabs = [
    { id: "overview", label: "Overview", icon: Icons.FileText },
    { id: "fitment", label: "Fitment Check", icon: Icons.Car },
    { id: "pricing", label: "Pricing Options", icon: Icons.Tag },
    { id: "specs", label: "Specifications", icon: Icons.Settings },
    { id: "warranty", label: "Warranty", icon: Icons.Shield },
    { id: "reviews", label: "Reviews", icon: Icons.Star },
    { id: "videos", label: "Videos", icon: Icons.Video },
    { id: "faq", label: "FAQ", icon: Icons.HelpCircle },
    { id: "quote", label: "Get Quote", icon: Icons.MessageSquare },
    { id: "mechanic", label: "Find Mechanic", icon: Icons.Wrench },
  ]

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader itemCount={itemCount} />

      {/* Urgency Banner */}
      <div className="bg-gradient-to-r from-red-600 via-red-500 to-orange-500 text-white py-2 px-4">
        <div className="container mx-auto flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <Icons.Eye className="h-4 w-4" />
            <span>{product.views || 127} people viewing now</span>
          </div>
          <div className="h-4 w-px bg-white/30" />
          <div className="flex items-center gap-2">
            <Icons.Flame className="h-4 w-4" />
            <span>{product.salesLast24h || 5} bought in last 24 hours</span>
          </div>
          <div className="h-4 w-px bg-white/30" />
          <div className="flex items-center gap-2">
            <Icons.Package className="h-4 w-4" />
            <span>Only {product.stockLevel || 3} left in stock!</span>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <Icons.ChevronRight className="h-4 w-4" />
          <Link href="/shop" className="hover:text-white transition-colors">
            Shop
          </Link>
          <Icons.ChevronRight className="h-4 w-4" />
          <Link href={`/shop?category=${product.category}`} className="hover:text-white transition-colors">
            {product.category}
          </Link>
          <Icons.ChevronRight className="h-4 w-4" />
          <span className="text-white">{product.name}</span>
        </nav>

        {/* Main Product Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Left - Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-slate-800/50 rounded-2xl border border-slate-700/50 overflow-hidden group">
              <Image
                src={images[selectedImage] || "/placeholder.svg?height=600&width=600&query=auto part"}
                alt={product.name}
                fill
                className="object-cover"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.warranty && (
                  <Badge className="bg-emerald-500/90 text-white border-0">
                    <Icons.Shield className="h-3 w-3 mr-1" />
                    {selectedTier?.warranty} Warranty
                  </Badge>
                )}
                {(product.stockLevel || 3) <= 5 && (
                  <Badge className="bg-red-500/90 text-white border-0 animate-pulse">
                    <Icons.AlertCircle className="h-3 w-3 mr-1" />
                    Low Stock
                  </Badge>
                )}
              </div>

              {/* Action Buttons */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={cn(
                    "p-3 rounded-full backdrop-blur-sm transition-all",
                    isWishlisted ? "bg-red-500 text-white" : "bg-white/10 text-white hover:bg-white/20",
                  )}
                >
                  <Icons.Heart className={cn("h-5 w-5", isWishlisted && "fill-current")} />
                </button>
                <button
                  type="button"
                  onClick={() => alert("Link copied to clipboard!")}
                  className="p-3 rounded-full bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm transition-all"
                >
                  <Icons.Share className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setShowCompare(true)}
                  className="p-3 rounded-full bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm transition-all"
                >
                  <Icons.Layers className="h-5 w-5" />
                </button>
              </div>

              {/* 360 View Badge */}
              <div className="absolute bottom-4 left-4">
                <Badge className="bg-blue-500/90 text-white border-0">
                  <Icons.RotateCcw className="h-3 w-3 mr-1" />
                  360° View Available
                </Badge>
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-5 gap-2">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImage(idx)}
                  className={cn(
                    "aspect-square rounded-lg border-2 overflow-hidden transition-all",
                    selectedImage === idx ? "border-red-500" : "border-slate-700 hover:border-slate-500",
                  )}
                >
                  <Image
                    src={_ || "/placeholder.svg?height=100&width=100&query=auto part thumbnail"}
                    alt={`View ${idx + 1}`}
                    width={100}
                    height={100}
                    className="object-cover w-full h-full"
                  />
                </button>
              ))}
            </div>

            {/* Quick Tools */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setShowVinDecoder(true)}
                className="flex items-center justify-center gap-2 p-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 rounded-xl text-white font-medium transition-all"
              >
                <Icons.QrCode className="h-5 w-5" />
                VIN Decoder
              </button>
              <button
                type="button"
                onClick={() => setShowShippingCalc(true)}
                className="flex items-center justify-center gap-2 p-4 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 rounded-xl text-white font-medium transition-all"
              >
                <Icons.Truck className="h-5 w-5" />
                Shipping Calculator
              </button>
            </div>
          </div>

          {/* Right - Product Info */}
          <div className="space-y-6">
            {/* Title & Rating */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="text-red-400 border-red-400/30">
                  {product.category}
                </Badge>
                <Badge variant="outline" className="text-blue-400 border-blue-400/30">
                  SKU: {product.sku || `AUW-${product.id}`}
                </Badge>
              </div>
              <h1 className="text-3xl font-bold text-white mb-3">{product.name}</h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Icons.Star
                      key={star}
                      className={cn("h-5 w-5", star <= 4 ? "text-yellow-400 fill-yellow-400" : "text-slate-600")}
                    />
                  ))}
                  <span className="text-white font-medium ml-2">{product.rating}</span>
                  <span className="text-muted-foreground">({product.reviews} reviews)</span>
                </div>
                <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-400/30">
                  <Icons.BadgeCheck className="h-3 w-3 mr-1" />
                  Verified Seller
                </Badge>
              </div>
            </div>

            {/* Mileage Pricing Tiers */}
            <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Icons.Gauge className="h-5 w-5 text-red-400" />
                  Select Mileage Tier
                </h3>
                <button
                  type="button"
                  onClick={() => setShowPriceAlert(true)}
                  className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1"
                >
                  <Icons.Bell className="h-4 w-4" />
                  Price Alert
                </button>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-4">
                {mileageTiers.map((tier, idx) => (
                  <button
                    key={tier.label}
                    type="button"
                    onClick={() => setSelectedMileageIndex(idx)}
                    className={cn(
                      "relative p-4 rounded-xl border-2 text-left transition-all",
                      selectedMileageIndex === idx
                        ? tier.color === "emerald"
                          ? "border-emerald-500 bg-emerald-500/10"
                          : tier.color === "blue"
                            ? "border-blue-500 bg-blue-500/10"
                            : "border-amber-500 bg-amber-500/10"
                        : "border-slate-600 hover:border-slate-500 bg-slate-700/30",
                    )}
                  >
                    {tier.badge && (
                      <Badge
                        className={cn(
                          "absolute -top-2 left-1/2 -translate-x-1/2 text-xs",
                          tier.color === "emerald"
                            ? "bg-emerald-500"
                            : tier.color === "blue"
                              ? "bg-blue-500"
                              : "bg-amber-500",
                        )}
                      >
                        {tier.badge}
                      </Badge>
                    )}
                    <div className="text-center">
                      <p className="text-white font-bold text-xl">${tier.price.toLocaleString()}</p>
                      <p className="text-muted-foreground text-sm">{tier.miles}</p>
                      <p
                        className={cn(
                          "text-xs mt-1",
                          tier.color === "emerald"
                            ? "text-emerald-400"
                            : tier.color === "blue"
                              ? "text-blue-400"
                              : "text-amber-400",
                        )}
                      >
                        {tier.warranty} Warranty
                      </p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Selected Tier Details */}
              <div className="bg-slate-900/50 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Condition</span>
                  <span className="text-white font-medium">{selectedTier?.condition}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Availability</span>
                  <Badge
                    className={cn(
                      selectedTier?.availability === "In Stock"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-amber-500/20 text-amber-400",
                    )}
                  >
                    {selectedTier?.availability}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Warranty Coverage</span>
                  <span className="text-white font-medium">{selectedTier?.warranty}</span>
                </div>
              </div>
            </div>

            {/* Core Exchange */}
            {(product.category?.includes("Engine") || product.category?.includes("Transmission")) && (
              <div className="bg-gradient-to-r from-amber-900/30 to-amber-800/20 rounded-xl border border-amber-500/30 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-500/20 rounded-lg">
                      <Icons.RefreshCw className="h-5 w-5 text-amber-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Core Exchange Available</p>
                      <p className="text-sm text-amber-200/70">Save ${coreValue} by returning your old part</p>
                    </div>
                  </div>
                  <Switch checked={hasCoreToReturn} onCheckedChange={setHasCoreToReturn} />
                </div>
              </div>
            )}

            {/* Price Summary */}
            <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-6">
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Base Price ({selectedTier?.label})</span>
                  <span className="text-white">${selectedTier?.price.toLocaleString()}</span>
                </div>
                {hasCoreToReturn && (
                  <div className="flex items-center justify-between text-emerald-400">
                    <span>Core Exchange Credit</span>
                    <span>-${coreValue}</span>
                  </div>
                )}
                <div className="h-px bg-slate-700" />
                <div className="flex items-center justify-between">
                  <span className="text-white font-semibold text-lg">Total</span>
                  <div className="text-right">
                    <span className="text-3xl font-bold text-white">${finalPrice?.toLocaleString()}</span>
                    <p className="text-sm text-muted-foreground">or ${monthlyPayment}mo with financing</p>
                  </div>
                </div>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center border border-slate-600 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 text-white hover:bg-slate-700 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-3 text-white font-medium min-w-[50px] text-center">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-3 text-white hover:bg-slate-700 transition-colors"
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-[1.02]"
                >
                  <Icons.ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </button>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setShowQuoteForm(true)}
                  className="flex items-center justify-center gap-2 p-3 bg-slate-700 hover:bg-slate-600 rounded-xl text-white font-medium transition-all"
                >
                  <Icons.FileText className="h-4 w-4" />
                  Get Quote
                </button>
                <button
                  type="button"
                  onClick={() => setShowFinancing(true)}
                  className="flex items-center justify-center gap-2 p-3 bg-slate-700 hover:bg-slate-600 rounded-xl text-white font-medium transition-all"
                >
                  <Icons.Calculator className="h-4 w-4" />
                  Financing
                </button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-4 gap-3">
              {[
                { icon: Icons.Shield, label: "Warranty", value: selectedTier?.warranty },
                { icon: Icons.Truck, label: "Shipping", value: "Free 500+" },
                { icon: Icons.RotateCcw, label: "Returns", value: "30 Days" },
                { icon: Icons.Lock, label: "Secure", value: "Checkout" },
              ].map((item) => (
                <div key={item.label} className="text-center p-3 bg-slate-800/30 rounded-xl border border-slate-700/50">
                  <item.icon className="h-5 w-5 text-red-400 mx-auto mb-1" />
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="text-sm text-white font-medium">{item.value}</p>
                </div>
              ))}
            </div>

            {/* Contact Quick Actions */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowLiveChat(true)}
                className="flex-1 flex items-center justify-center gap-2 p-3 bg-blue-600 hover:bg-blue-500 rounded-xl text-white font-medium transition-all"
              >
                <Icons.MessageSquare className="h-4 w-4" />
                Live Chat
              </button>
              <a
                href="tel:1-800-528-9978"
                className="flex-1 flex items-center justify-center gap-2 p-3 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-white font-medium transition-all"
              >
                <Icons.Phone className="h-4 w-4" />
                Call Now
              </a>
              <a
                href="mailto:sales@allusedautoparts.world"
                className="flex-1 flex items-center justify-center gap-2 p-3 bg-purple-600 hover:bg-purple-500 rounded-xl text-white font-medium transition-all"
              >
                <Icons.Mail className="h-4 w-4" />
                Email
              </a>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700/50 -mx-4 px-4 mb-8">
          <div className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-3 rounded-lg font-medium whitespace-nowrap transition-all",
                  activeTab === tab.id
                    ? "bg-red-600 text-white"
                    : "text-muted-foreground hover:text-white hover:bg-slate-800",
                )}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-6">
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Icons.FileText className="h-5 w-5 text-red-400" />
                    Product Description
                  </h2>
                  <p className="text-slate-300 leading-relaxed">
                    This {product.name} is a high-quality OEM replacement part sourced from certified salvage yards
                    across the United States. Each part undergoes a rigorous 21-point inspection process to ensure
                    optimal performance and reliability. Perfect for your {product.make} {product.model}, this part
                    comes with our comprehensive warranty and satisfaction guarantee.
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-900/50 rounded-xl">
                      <p className="text-muted-foreground text-sm">Part Number</p>
                      <p className="text-white font-medium">{product.sku || `AUW-${product.id}-OEM`}</p>
                    </div>
                    <div className="p-4 bg-slate-900/50 rounded-xl">
                      <p className="text-muted-foreground text-sm">Condition</p>
                      <p className="text-white font-medium">{selectedTier?.condition}</p>
                    </div>
                    <div className="p-4 bg-slate-900/50 rounded-xl">
                      <p className="text-muted-foreground text-sm">Mileage</p>
                      <p className="text-white font-medium">{selectedTier?.miles}</p>
                    </div>
                    <div className="p-4 bg-slate-900/50 rounded-xl">
                      <p className="text-muted-foreground text-sm">Warranty</p>
                      <p className="text-white font-medium">{selectedTier?.warranty}</p>
                    </div>
                  </div>
                </div>

                {/* Key Features */}
                <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-6">
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Icons.Sparkles className="h-5 w-5 text-red-400" />
                    Key Features
                  </h2>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      "OEM Quality Guaranteed",
                      "Tested & Inspected",
                      "Fast Nationwide Shipping",
                      "30-Day Returns",
                      "Core Exchange Available",
                      "Expert Support",
                      "Fitment Guarantee",
                      "Secure Packaging",
                    ].map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <Icons.CheckCircle2 className="h-5 w-5 text-emerald-400" />
                        <span className="text-slate-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Fits Vehicles */}
                <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-6">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Icons.Car className="h-5 w-5 text-red-400" />
                    Fits Vehicles
                  </h3>
                  <div className="space-y-3">
                    {fitments.map((fit, idx) => (
                      <div key={idx} className="p-3 bg-slate-900/50 rounded-xl">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-medium">{fit.make}</span>
                          <Badge variant="outline" className="text-blue-400 border-blue-400/30">
                            {fit.yearRange}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {fit.models.map((model) => (
                            <Badge key={model} className="bg-slate-700 text-slate-300 text-xs">
                              {model}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price History */}
                <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-6">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Icons.TrendingDown className="h-5 w-5 text-emerald-400" />
                    Price History
                  </h3>
                  <div className="h-24 flex items-end gap-1">
                    {priceHistory.map((price, idx) => (
                      <div
                        key={idx}
                        className="flex-1 bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t"
                        style={{ height: `${(price / Math.max(...priceHistory)) * 100}%` }}
                      />
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-2 text-sm">
                    <span className="text-muted-foreground">12 months ago</span>
                    <span className="text-emerald-400 font-medium">Current: Best Price</span>
                  </div>
                </div>

                {/* Need Help */}
                <div className="bg-gradient-to-br from-red-900/30 to-red-800/20 rounded-2xl border border-red-500/30 p-6">
                  <h3 className="text-lg font-bold text-white mb-2">Need Help?</h3>
                  <p className="text-sm text-slate-300 mb-4">
                    Our auto parts experts are available 24/7 to help you find the right part.
                  </p>
                  <div className="space-y-2">
                    <a
                      href="tel:1-800-528-9978"
                      className="flex items-center gap-2 p-3 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-all"
                    >
                      <Icons.Phone className="h-4 w-4" />
                      <span>1-800-528-9978</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => setShowLiveChat(true)}
                      className="w-full flex items-center gap-2 p-3 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-all"
                    >
                      <Icons.MessageSquare className="h-4 w-4" />
                      <span>Start Live Chat</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Fitment Check Tab */}
          {activeTab === "fitment" && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-8">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">Check Fitment for Your Vehicle</h2>

                {/* VIN Decoder */}
                <div className="bg-gradient-to-r from-blue-900/30 to-blue-800/20 rounded-xl border border-blue-500/30 p-6 mb-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Icons.QrCode className="h-5 w-5 text-blue-400" />
                    Instant VIN Lookup
                  </h3>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={vinNumber}
                      onChange={(e) => setVinNumber(e.target.value.toUpperCase())}
                      placeholder="Enter 17-character VIN"
                      className="bg-slate-900/50 border-slate-600 text-white px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      maxLength={17}
                    />
                    <button
                      type="button"
                      onClick={decodeVin}
                      disabled={isDecodingVin}
                      className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-all disabled:opacity-50"
                    >
                      {isDecodingVin ? "Checking..." : "Check VIN"}
                    </button>
                  </div>
                  {vinResult && (
                    <div className="mt-4 p-4 bg-slate-900/50 rounded-xl">
                      <div className="flex items-center gap-2 mb-3">
                        {vinResult.compatible ? (
                          <Icons.CheckCircle2 className="h-6 w-6 text-emerald-400" />
                        ) : (
                          <Icons.X className="h-6 w-6 text-red-400" />
                        )}
                        <span
                          className={cn(
                            "font-bold text-lg",
                            vinResult.compatible ? "text-emerald-400" : "text-red-400",
                          )}
                        >
                          {vinResult.compatible ? "Compatible!" : "Not Compatible"}
                        </span>
                        <Badge className="bg-blue-500/20 text-blue-400 ml-auto">
                          {vinResult.confidence}% Confidence
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-3 text-sm">
                        <div>
                          <p className="text-muted-foreground">Year</p>
                          <p className="text-white font-medium">{vinResult.year}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Make</p>
                          <p className="text-white font-medium">{vinResult.make}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Model</p>
                          <p className="text-white font-medium">{vinResult.model}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Engine</p>
                          <p className="text-white font-medium">{vinResult.engine}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Transmission</p>
                          <p className="text-white font-medium">{vinResult.transmission}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Drivetrain</p>
                          <p className="text-white font-medium">{vinResult.drivetrain}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Compatible Vehicles Table */}
                <h3 className="text-lg font-semibold text-white mb-4">All Compatible Vehicles</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-700">
                        <th className="text-left py-3 px-4 text-muted-foreground font-medium">Years</th>
                        <th className="text-left py-3 px-4 text-muted-foreground font-medium">Make</th>
                        <th className="text-left py-3 px-4 text-muted-foreground font-medium">Models</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fitments.map((fit, idx) => (
                        <tr key={idx} className="border-b border-slate-700/50">
                          <td className="py-3 px-4 text-white">{fit.yearRange}</td>
                          <td className="py-3 px-4 text-white font-medium">{fit.make}</td>
                          <td className="py-3 px-4">
                            <div className="flex flex-wrap gap-1">
                              {fit.models.map((model) => (
                                <Badge key={model} className="bg-slate-700 text-slate-300">
                                  {model}
                                </Badge>
                              ))}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Pricing Options Tab */}
          {activeTab === "pricing" && (
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">Choose Your Pricing Tier</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {mileageTiers.map((tier, idx) => (
                  <div
                    key={tier.label}
                    className={cn(
                      "relative bg-slate-800/50 rounded-2xl border-2 p-6 transition-all",
                      selectedMileageIndex === idx
                        ? tier.color === "emerald"
                          ? "border-emerald-500"
                          : tier.color === "blue"
                            ? "border-blue-500"
                            : "border-amber-500"
                        : "border-slate-700 hover:border-slate-600",
                    )}
                  >
                    {tier.badge && (
                      <Badge
                        className={cn(
                          "absolute -top-3 left-1/2 -translate-x-1/2",
                          tier.color === "emerald"
                            ? "bg-emerald-500"
                            : tier.color === "blue"
                              ? "bg-blue-500"
                              : "bg-amber-500",
                        )}
                      >
                        {tier.badge}
                      </Badge>
                    )}
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-bold text-white mb-1">{tier.label}</h3>
                      <p className="text-muted-foreground">{tier.miles}</p>
                    </div>
                    <div className="text-center mb-6">
                      <span className="text-4xl font-bold text-white">${tier.price.toLocaleString()}</span>
                    </div>
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-2">
                        <Icons.Check
                          className={cn(
                            "h-5 w-5",
                            tier.color === "emerald"
                              ? "text-emerald-400"
                              : tier.color === "blue"
                                ? "text-blue-400"
                                : "text-amber-400",
                          )}
                        />
                        <span className="text-slate-300">{tier.warranty} Warranty</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icons.Check
                          className={cn(
                            "h-5 w-5",
                            tier.color === "emerald"
                              ? "text-emerald-400"
                              : tier.color === "blue"
                                ? "text-blue-400"
                                : "text-amber-400",
                          )}
                        />
                        <span className="text-slate-300">{tier.condition} Condition</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icons.Check
                          className={cn(
                            "h-5 w-5",
                            tier.color === "emerald"
                              ? "text-emerald-400"
                              : tier.color === "blue"
                                ? "text-blue-400"
                                : "text-amber-400",
                          )}
                        />
                        <span className="text-slate-300">{tier.availability}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icons.Check
                          className={cn(
                            "h-5 w-5",
                            tier.color === "emerald"
                              ? "text-emerald-400"
                              : tier.color === "blue"
                                ? "text-blue-400"
                                : "text-amber-400",
                          )}
                        />
                        <span className="text-slate-300">Free Tech Support</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedMileageIndex(idx)
                        handleAddToCart()
                      }}
                      className={cn(
                        "w-full py-3 rounded-xl font-bold transition-all",
                        tier.color === "emerald"
                          ? "bg-emerald-600 hover:bg-emerald-500 text-white"
                          : tier.color === "blue"
                            ? "bg-blue-600 hover:bg-blue-500 text-white"
                            : "bg-amber-600 hover:bg-amber-500 text-white",
                      )}
                    >
                      Select & Add to Cart
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Specs Tab */}
          {activeTab === "specs" && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-6">
                <h2 className="text-xl font-bold text-white mb-6">Technical Specifications</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { label: "Part Number", value: product.sku || `AUW-${product.id}-OEM` },
                    { label: "OEM Number", value: `OEM-${Math.random().toString(36).substr(2, 9).toUpperCase()}` },
                    { label: "Category", value: product.category },
                    { label: "Make", value: product.make },
                    { label: "Model", value: product.model },
                    { label: "Year Range", value: fitments[0]?.yearRange || "2018-2023" },
                    { label: "Condition", value: selectedTier?.condition },
                    { label: "Mileage", value: selectedTier?.miles },
                    { label: "Warranty", value: selectedTier?.warranty },
                    { label: "Weight", value: product.category?.includes("Engine") ? "350-450 lbs" : "45-85 lbs" },
                    { label: "Shipping", value: "Freight / Standard" },
                    {
                      label: "Core Required",
                      value:
                        product.category?.includes("Engine") || product.category?.includes("Transmission")
                          ? "Yes"
                          : "No",
                    },
                  ].map((spec) => (
                    <div key={spec.label} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-xl">
                      <span className="text-muted-foreground">{spec.label}</span>
                      <span className="text-white font-medium">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Warranty Tab */}
          {activeTab === "warranty" && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-6">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Icons.Shield className="h-6 w-6 text-emerald-400" />
                  AUW Warranty Coverage
                </h2>
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  {mileageTiers.map((tier) => (
                    <div
                      key={tier.label}
                      className={cn(
                        "p-4 rounded-xl border",
                        tier.color === "emerald"
                          ? "bg-emerald-500/10 border-emerald-500/30"
                          : tier.color === "blue"
                            ? "bg-blue-500/10 border-blue-500/30"
                            : "bg-amber-500/10 border-amber-500/30",
                      )}
                    >
                      <h3 className="font-bold text-white mb-2">{tier.label} Tier</h3>
                      <p
                        className={cn(
                          "text-2xl font-bold",
                          tier.color === "emerald"
                            ? "text-emerald-400"
                            : tier.color === "blue"
                              ? "text-blue-400"
                              : "text-amber-400",
                        )}
                      >
                        {tier.warranty}
                      </p>
                      <p className="text-sm text-muted-foreground">Full coverage warranty</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold text-white">What's Covered:</h3>
                  <ul className="space-y-2">
                    {[
                      "Defects in materials and workmanship",
                      "Internal mechanical failures",
                      "Electrical component failures",
                      "Free replacement or full refund",
                      "No deductibles or hidden fees",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-slate-300">
                        <Icons.CheckCircle2 className="h-5 w-5 text-emerald-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === "reviews" && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white">Customer Reviews</h2>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Icons.Star key={star} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <span className="text-white font-bold">4.8</span>
                    <span className="text-muted-foreground">(127 reviews)</span>
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    {
                      name: "Mike R.",
                      rating: 5,
                      date: "2 days ago",
                      text: "Perfect fit for my 2020 Camry. Shipped fast and works great!",
                    },
                    {
                      name: "Sarah L.",
                      rating: 5,
                      date: "1 week ago",
                      text: "Excellent quality, saved hundreds compared to dealer prices.",
                    },
                    {
                      name: "John D.",
                      rating: 4,
                      date: "2 weeks ago",
                      text: "Good part, shipping was a bit slow but worth the wait.",
                    },
                  ].map((review, idx) => (
                    <div key={idx} className="p-4 bg-slate-900/50 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center text-white font-bold">
                            {review.name[0]}
                          </div>
                          <div>
                            <p className="text-white font-medium">{review.name}</p>
                            <p className="text-xs text-muted-foreground">{review.date}</p>
                          </div>
                        </div>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Icons.Star
                              key={star}
                              className={cn(
                                "h-4 w-4",
                                star <= review.rating ? "text-yellow-400 fill-yellow-400" : "text-slate-600",
                              )}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-slate-300">{review.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Videos Tab */}
          {activeTab === "videos" && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-6">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Icons.Video className="h-5 w-5 text-red-400" />
                  Installation Videos
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { title: "Installation Guide", duration: "12:34" },
                    { title: "Removal Tutorial", duration: "8:45" },
                    { title: "Tips & Tricks", duration: "5:20" },
                    { title: "Troubleshooting", duration: "10:15" },
                  ].map((video, idx) => (
                    <div
                      key={idx}
                      className="relative aspect-video bg-slate-900 rounded-xl overflow-hidden group cursor-pointer"
                    >
                      <Image
                        src={`/.jpg?height=200&width=350&query=${product.category} installation video`}
                        alt={video.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                        <Icons.PlayCircle className="h-16 w-16 text-white" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80">
                        <p className="text-white font-medium">{video.title}</p>
                        <p className="text-sm text-muted-foreground">{video.duration}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* FAQ Tab */}
          {activeTab === "faq" && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-6">
                <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
                <Accordion type="single" collapsible className="space-y-2">
                  {[
                    {
                      q: "How do I know if this part fits my vehicle?",
                      a: "Use our VIN decoder tool or check the compatible vehicles list. If you're still unsure, contact our team for verification.",
                    },
                    {
                      q: "What is the warranty coverage?",
                      a: "Warranty varies by mileage tier: Economy (60 days), Standard (90 days), Premium (6 months). All cover defects and mechanical failures.",
                    },
                    {
                      q: "Do you offer core exchange?",
                      a: "Yes! Return your old part within 30 days for a credit. Core values vary by part type.",
                    },
                    {
                      q: "How long does shipping take?",
                      a: "Standard shipping is 5-7 business days. Express (2-3 days) and freight options available.",
                    },
                    {
                      q: "Can I return the part if it doesn't fit?",
                      a: "Yes, we offer 30-day returns for any reason. Part must be in original condition.",
                    },
                  ].map((faq, idx) => (
                    <AccordionItem key={idx} value={`faq-${idx}`} className="border border-slate-700 rounded-xl px-4">
                      <AccordionTrigger className="text-white hover:no-underline">{faq.q}</AccordionTrigger>
                      <AccordionContent className="text-slate-300">{faq.a}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          )}

          {/* Quote Tab */}
          {activeTab === "quote" && (
            <div className="max-w-2xl mx-auto">
              <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-6">
                <h2 className="text-xl font-bold text-white mb-6 text-center">Request a Quote</h2>
                {quoteSubmitted ? (
                  <div className="text-center py-8">
                    <Icons.CheckCircle2 className="h-16 w-16 text-emerald-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Quote Request Submitted!</h3>
                    <p className="text-muted-foreground">We'll get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleQuoteSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-white">Name *</Label>
                        <input
                          value={quoteForm.name}
                          onChange={(e) => setQuoteForm({ ...quoteForm, name: e.target.value })}
                          required
                          className="bg-slate-900/50 border-slate-600 text-white mt-1 px-3 py-2 rounded-lg"
                        />
                      </div>
                      <div>
                        <Label className="text-white">Email *</Label>
                        <input
                          type="email"
                          value={quoteForm.email}
                          onChange={(e) => setQuoteForm({ ...quoteForm, email: e.target.value })}
                          required
                          className="bg-slate-900/50 border-slate-600 text-white mt-1 px-3 py-2 rounded-lg"
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-white">Phone</Label>
                        <input
                          value={quoteForm.phone}
                          onChange={(e) => setQuoteForm({ ...quoteForm, phone: e.target.value })}
                          className="bg-slate-900/50 border-slate-600 text-white mt-1 px-3 py-2 rounded-lg"
                        />
                      </div>
                      <div>
                        <Label className="text-white">Vehicle (Year Make Model)</Label>
                        <input
                          value={quoteForm.vehicle}
                          onChange={(e) => setQuoteForm({ ...quoteForm, vehicle: e.target.value })}
                          placeholder="e.g., 2020 Toyota Camry"
                          className="bg-slate-900/50 border-slate-600 text-white mt-1 px-3 py-2 rounded-lg"
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-white">Message</Label>
                      <textarea
                        value={quoteForm.message}
                        onChange={(e) => setQuoteForm({ ...quoteForm, message: e.target.value })}
                        rows={4}
                        className="bg-slate-900/50 border-slate-600 text-white mt-1 px-3 py-2 rounded-lg resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl transition-all"
                    >
                      Submit Quote Request
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}

          {/* Mechanic Tab */}
          {activeTab === "mechanic" && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-6">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Icons.Wrench className="h-5 w-5 text-red-400" />
                  Find a Mechanic Near You
                </h2>
                <div className="flex gap-3 mb-6">
                  <input
                    value={mechanicZip}
                    onChange={(e) => setMechanicZip(e.target.value)}
                    placeholder="Enter ZIP code"
                    className="bg-slate-900/50 border-slate-600 text-white px-3 py-2 rounded-lg flex-1"
                  />
                  <button
                    type="button"
                    onClick={() => setShowMechanics(true)}
                    className="px-6 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg font-medium transition-all"
                  >
                    Search
                  </button>
                </div>
                {showMechanics && (
                  <div className="space-y-3">
                    {[
                      { name: "AutoCare Pro", distance: "2.3 mi", rating: 4.8, reviews: 234 },
                      { name: "Quick Fix Auto", distance: "3.1 mi", rating: 4.6, reviews: 189 },
                      { name: "Master Mechanics", distance: "4.5 mi", rating: 4.9, reviews: 312 },
                    ].map((shop, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl">
                        <div>
                          <p className="text-white font-medium">{shop.name}</p>
                          <p className="text-sm text-muted-foreground">{shop.distance} away</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="flex items-center gap-1">
                              <Icons.Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                              <span className="text-white">{shop.rating}</span>
                            </div>
                            <p className="text-xs text-muted-foreground">{shop.reviews} reviews</p>
                          </div>
                          <button
                            type="button"
                            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm transition-all"
                          >
                            Contact
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* VIN Decoder Dialog */}
      <Dialog open={showVinDecoder} onOpenChange={setShowVinDecoder}>
        <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Icons.QrCode className="h-5 w-5 text-blue-400" />
              VIN Decoder
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              Enter your 17-character VIN to verify fitment
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <input
              value={vinNumber}
              onChange={(e) => setVinNumber(e.target.value.toUpperCase())}
              placeholder="Enter VIN (e.g., 1HGBH41JXMN109186)"
              className="bg-slate-800 border-slate-600 text-white px-3 py-2 rounded-lg w-full"
              maxLength={17}
            />
            <p className="text-xs text-muted-foreground">
              VIN is located on your dashboard (driver's side) or door jamb sticker
            </p>
          </div>
          <DialogFooter>
            <button
              type="button"
              onClick={() => {
                decodeVin()
                setShowVinDecoder(false)
              }}
              className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-all"
            >
              Check Compatibility
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Shipping Calculator Dialog */}
      <Dialog open={showShippingCalc} onOpenChange={setShowShippingCalc}>
        <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Icons.Truck className="h-5 w-5 text-emerald-400" />
              Shipping Calculator
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="text-white">Delivery ZIP Code</Label>
              <input
                value={shippingZip}
                onChange={(e) => setShippingZip(e.target.value)}
                placeholder="Enter ZIP code"
                className="bg-slate-800 border-slate-600 text-white mt-1 px-3 py-2 rounded-lg w-full"
              />
            </div>
            <button
              type="button"
              onClick={calculateShipping}
              className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium transition-all"
            >
              Calculate Shipping
            </button>
            {shippingRate && (
              <div className="space-y-2 pt-4 border-t border-slate-700">
                <div className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                  <div>
                    <p className="text-white font-medium">Standard Shipping</p>
                    <p className="text-xs text-muted-foreground">{shippingRate.standard.days}</p>
                  </div>
                  <span className="text-white font-bold">${shippingRate.standard.price}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                  <div>
                    <p className="text-white font-medium">Express Shipping</p>
                    <p className="text-xs text-muted-foreground">{shippingRate.express.days}</p>
                  </div>
                  <span className="text-white font-bold">${shippingRate.express.price}</span>
                </div>
                {shippingRate.freight && (
                  <div className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                    <div>
                      <p className="text-white font-medium">Freight Shipping</p>
                      <p className="text-xs text-muted-foreground">{shippingRate.freight.days}</p>
                    </div>
                    <span className="text-white font-bold">${shippingRate.freight.price}</span>
                  </div>
                )}
                <p className="text-sm text-emerald-400 text-center">
                  Free shipping on orders over ${shippingRate.freeThreshold}!
                </p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Financing Dialog */}
      <Dialog open={showFinancing} onOpenChange={setShowFinancing}>
        <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Icons.Calculator className="h-5 w-5 text-purple-400" />
              Financing Calculator
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-slate-800 rounded-xl text-center">
              <p className="text-muted-foreground text-sm">Monthly Payment</p>
              <p className="text-4xl font-bold text-white">${monthlyPayment}</p>
              <p className="text-sm text-muted-foreground">for {financingMonths} months @ 12% APR</p>
            </div>
            <div>
              <Label className="text-white">Select Term</Label>
              <div className="grid grid-cols-4 gap-2 mt-2">
                {[6, 12, 18, 24].map((months) => (
                  <button
                    key={months}
                    type="button"
                    onClick={() => setFinancingMonths(months)}
                    className={cn(
                      "py-2 rounded-lg font-medium transition-all",
                      financingMonths === months
                        ? "bg-purple-600 text-white"
                        : "bg-slate-800 text-slate-300 hover:bg-slate-700",
                    )}
                  >
                    {months}mo
                  </button>
                ))}
              </div>
            </div>
            <div className="p-3 bg-slate-800 rounded-lg space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Part Price</span>
                <span className="text-white">${selectedTier?.price.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Interest</span>
                <span className="text-white">
                  ${(monthlyPayment * financingMonths - (selectedTier?.price || 0)).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between font-bold">
                <span className="text-white">Total Cost</span>
                <span className="text-white">${(monthlyPayment * financingMonths).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Price Alert Dialog */}
      <Dialog open={showPriceAlert} onOpenChange={setShowPriceAlert}>
        <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Icons.Bell className="h-5 w-5 text-yellow-400" />
              Set Price Alert
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="text-white">Your Email</Label>
              <input
                type="email"
                value={alertEmail} // Changed from priceAlertEmail to alertEmail
                onChange={(e) => setAlertEmail(e.target.value)}
                placeholder="email@example.com"
                className="bg-slate-800 border-slate-600 text-white mt-1 px-3 py-2 rounded-lg w-full"
              />
            </div>
            <div>
              <Label className="text-white">Notify me when price drops to: ${targetPrice}</Label>
              <input
                type="range"
                value={targetPrice}
                onChange={(e) => setTargetPrice(e.target.value)}
                min={Math.round((selectedTier?.price || 0) * 0.5)}
                max={selectedTier?.price || 0}
                step={10}
                className="w-full mt-2"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>50% off</span>
                <span>Current: ${selectedTier?.price}</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                alert("Price alert set!")
                setShowPriceAlert(false)
              }}
              className="w-full py-2 bg-yellow-600 hover:bg-yellow-500 text-white rounded-lg font-medium transition-all"
            >
              Set Alert
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Live Chat Widget */}
      {showLiveChat && (
        <div className="fixed bottom-4 right-4 w-96 h-[500px] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col z-50">
          <div className="p-4 bg-gradient-to-r from-red-600 to-red-500 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Icons.Headphones className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-white font-bold">AUW Support</p>
                <p className="text-xs text-white/70">Typically replies in minutes</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowLiveChat(false)}
              className="p-1 hover:bg-white/20 rounded-full transition-colors"
            >
              <Icons.X className="h-5 w-5 text-white" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {chatMessages.length === 0 && (
              <div className="text-center py-8">
                <Icons.MessageSquare className="h-12 w-12 text-slate-600 mx-auto mb-3" />
                <p className="text-muted-foreground">Start a conversation</p>
              </div>
            )}
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={cn(
                  "max-w-[80%] p-3 rounded-xl",
                  msg.role === "user" ? "ml-auto bg-red-600 text-white" : "bg-slate-800 text-white",
                )}
              >
                <p>{msg.content}</p>
                <p className="text-xs opacity-70 mt-1">{msg.time}</p>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-slate-700">
            <div className="flex gap-2">
              <input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Type a message..."
                className="bg-slate-800 border-slate-600 text-white px-3 py-2 rounded-lg flex-1"
                onKeyDown={(e) => e.key === "Enter" && handleChatSubmit()}
              />
              <button
                type="button"
                onClick={handleChatSubmit}
                className="p-2 bg-red-600 hover:bg-red-500 rounded-lg transition-all"
              >
                <Icons.Send className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
