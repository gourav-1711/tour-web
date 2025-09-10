"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send } from "lucide-react";
import { useState } from "react";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Add form submission logic here
    console.log("Form submitted:", formData);
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      // Reset form
      setFormData({ name: "", email: "", message: "" });
    }, 1500);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <div className=" p-6 md:p-12 rounded-3xl shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-gray-700 font-medium">
            Your Name
            <span className="text-red-500 ml-1">*</span>
          </Label>
          <Input
            id="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            className="border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl px-4 py-3 transition-all duration-300"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-gray-700 font-medium">
            Your Email
            <span className="text-red-500 ml-1">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your.email@example.com"
            className="border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 rounded-xl px-4 py-3 transition-all duration-300"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message" className="text-gray-700 font-medium">
            Your Message
            <span className="text-red-500 ml-1">*</span>
          </Label>
          <Textarea
            id="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="How can we help you today?"
            rows={5}
            className="border-2 border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 rounded-xl px-4 py-3 resize-y transition-all duration-300"
            required
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-6 text-lg font-medium rounded-xl shadow-lg transition-all duration-300 transform ${
            isSubmitting
              ? "bg-gradient-to-r from-blue-400 to-purple-400"
              : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 hover:shadow-xl hover:-translate-y-0.5"
          }`}
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Sending...
            </>
          ) : (
            <>
              Send Message
              <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </>
          )}
        </Button>

        <p className="text-sm text-gray-500 text-center mt-4">
          We'll get back to you within 24 hours
        </p>
      </form>
    </div>
  );
}
