"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, Clock } from "lucide-react"
import { useState } from "react"
import { toast } from "react-toastify"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // In production, this would call an API endpoint
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast.success("Your inquiry has been sent to invoice@allusedautoparts.world. We'll respond within 24 hours!")

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    })
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <div className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-extrabold mb-4">Contact Us</h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Have questions about a part? Our specialists are here to help.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Get In Touch</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-orange-100 p-3 rounded-full">
                    <Phone className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Phone Support</h3>
                    <p className="text-slate-600 mb-1">Speak directly with a parts specialist</p>
                    <a href="tel:+1-888-818-5001" className="text-lg font-bold text-orange-600">
                      +1-888-818-5001
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-orange-100 p-3 rounded-full">
                    <Mail className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Email Us</h3>
                    <p className="text-slate-600 mb-1">We usually reply within 24 hours</p>
                    <a href="mailto:support@allusedautoparts.world" className="font-medium text-orange-600">
                      support@allusedautoparts.world
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-orange-100 p-3 rounded-full">
                    <Clock className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Business Hours</h3>
                    <p className="text-slate-600">Monday - Friday: 9:00am - 6:00pm EST</p>
                    <p className="text-slate-600">Saturday: Closed</p>
                    <p className="text-slate-600">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Send us a Message</h2>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">First Name</label>
                    <Input
                      placeholder="John"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Last Name</label>
                    <Input
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Email Address</label>
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Phone Number</label>
                    <Input
                      type="tel"
                      placeholder="(555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Subject</label>
                  <Input
                    placeholder="Inquiry about a part..."
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Message</label>
                  <Textarea
                    placeholder="Tell us what you need help with..."
                    className="min-h-[150px]"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold h-12"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>

                <p className="text-xs text-center text-slate-500">
                  Quote requests will be sent to invoice@allusedautoparts.world
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
