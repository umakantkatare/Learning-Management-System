import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { Mail, Phone, MapPin, Clock3, MessageSquare } from "lucide-react";
import MainLayout from "@/layouts/MainLayout";
import FAQSection from "@/components/HomePage/FAQSection";

export default function ContactPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-950 text-slate-50">
        {/* Hero */}
        <section className="border-b border-slate-800">
          <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              We're Here to Help
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-slate-400">
              Have questions about courses, enrollments, payments, or technical
              issues? Reach out to our support team and we'll get back to you as
              soon as possible.
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Contact Info */}
            <div className="space-y-6">
              <Card className="bg-slate-900/50 border-slate-800 text-slate-100 backdrop-blur-sm">
                <CardContent className="flex items-start gap-4 p-6">
                  <Mail className="mt-1 h-5 w-5 text-orange-500" />
                  <div>
                    <h3 className="font-semibold text-slate-200">
                      Email Support
                    </h3>
                    <p className="text-sm text-slate-400">support@lms.com</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-slate-800 text-slate-100 backdrop-blur-sm">
                <CardContent className="flex items-start gap-4 p-6">
                  <Phone className="mt-1 h-5 w-5 text-orange-500" />
                  <div>
                    <h3 className="font-semibold text-slate-200">Phone</h3>
                    <p className="text-sm text-slate-400">+91 98765 43210</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-slate-800 text-slate-100 backdrop-blur-sm">
                <CardContent className="flex items-start gap-4 p-6">
                  <MapPin className="mt-1 h-5 w-5 text-orange-500" />
                  <div>
                    <h3 className="font-semibold text-slate-200">Office</h3>
                    <p className="text-sm text-slate-400">
                      Gurgaon, Haryana, India
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-slate-800 text-slate-100 backdrop-blur-sm">
                <CardContent className="flex items-start gap-4 p-6">
                  <Clock3 className="mt-1 h-5 w-5 text-orange-500" />
                  <div>
                    <h3 className="font-semibold text-slate-200">
                      Support Hours
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      Monday - Saturday
                      <br />
                      9:00 AM - 7:00 PM
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="bg-slate-900/40 border-slate-800 text-slate-100 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-slate-100">
                    Send us a Message
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    Fill out the form below and our team will contact you
                    shortly.
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <form className="space-y-5">
                    <div className="grid gap-5 md:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-slate-300">
                          Full Name
                        </label>
                        <Input
                          placeholder="John Doe"
                          className="bg-slate-950 border-slate-800 text-slate-100 placeholder:text-slate-600 focus-visible:ring-orange-500"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-slate-300">
                          Email Address
                        </label>
                        <Input
                          type="email"
                          placeholder="john@example.com"
                          className="bg-slate-950 border-slate-800 text-slate-100 placeholder:text-slate-600 focus-visible:ring-orange-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-300">
                        Subject
                      </label>
                      <Input
                        placeholder="How can we help?"
                        className="bg-slate-950 border-slate-800 text-slate-100 placeholder:text-slate-600 focus-visible:ring-orange-500"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-300">
                        Message
                      </label>
                      <Textarea
                        placeholder="Write your message here..."
                        rows={6}
                        className="bg-slate-950 border-slate-800 text-slate-100 placeholder:text-slate-600 focus-visible:ring-orange-500 resize-none"
                      />
                    </div>

                    <Button className="w-full md:w-auto bg-orange-600 hover:bg-orange-700 text-white font-medium transition-colors">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* FAQ Section */}
          <section className="mt-16">
            <FAQSection />
          </section>
        </div>
      </div>
    </MainLayout>
  );
}
