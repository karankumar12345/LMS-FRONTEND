/* eslint-disable prefer-const */
"use client";
import React, { useState } from "react";
import emailjs from "emailjs-com";
import Heading from "@/utils/Heading";

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // Handle Input Change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Form Validation
  const validateForm = () => {
    let formErrors = { ...errors };
    let isValid = true;

    if (!formData.name) {
      formErrors.name = "Name is required.";
      isValid = false;
    } else formErrors.name = "";

    if (!formData.email) {
      formErrors.email = "Email is required.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = "Please enter a valid email address.";
      isValid = false;
    } else formErrors.email = "";

    if (!formData.subject) {
      formErrors.subject = "Subject is required.";
      isValid = false;
    } else formErrors.subject = "";

    if (!formData.message) {
      formErrors.message = "Message is required.";
      isValid = false;
    } else formErrors.message = "";

    setErrors(formErrors);
    return isValid;
  };

  // Handle Form Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setLoading(true);
      const emailData = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
      };

      emailjs
        .send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
          emailData,
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ""
        )
        .then(() => {
          setIsSubmitted(true);
          setLoading(false);
          setFormData({ name: "", email: "", subject: "", message: "" });
        })
        .catch(() => {
          setLoading(false);
          alert("Failed to send the message. Please try again later.");
        });
    }
  };

  return (
    <>
    <div className="container mx-auto px-4 py-8">
      <Heading title="Contact Form" description="" keywords="" />
      <h1 className="text-3xl font-bold text-center mb-6">Contact Us</h1>

      {isSubmitted && (
        <div className="bg-green-200 text-green-800 p-4 rounded-lg mb-6 text-center">
          Thank you for your message! We will get back to you shortly.
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6 max-w-2xl mx-auto space-y-4"
      >
        {/* Name Input */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full p-3 mt-1 border rounded-lg ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Your Name"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        {/* Email Input */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-3 mt-1 border rounded-lg ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Your Email"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        {/* Subject Input */}
        <div>
          <label
            htmlFor="subject"
            className="block text-sm font-medium text-gray-700"
          >
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className={`w-full p-3 mt-1 border rounded-lg ${
              errors.subject ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Subject"
          />
          {errors.subject && (
            <p className="text-red-500 text-sm">{errors.subject}</p>
          )}
        </div>

        {/* Message Input */}
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className={`w-full p-3 mt-1 border rounded-lg ${
              errors.message ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Your Message"
            rows={4}
          />
          {errors.message && (
            <p className="text-red-500 text-sm">{errors.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </div>
      </form>
    </div>
    </>
  );
};

export default ContactForm;
