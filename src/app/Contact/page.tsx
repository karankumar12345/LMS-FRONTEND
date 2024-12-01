/* eslint-disable prefer-const */
"use client"
import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import Heading from '@/utils/Heading';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let formErrors = { ...errors };
    let isValid = true;

    // Validate name
    if (!formData.name) {
      formErrors.name = 'Name is required.';
      isValid = false;
    } else {
      formErrors.name = '';
    }

    // Validate email
    if (!formData.email) {
      formErrors.email = 'Email is required.';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = 'Please enter a valid email address.';
      isValid = false;
    } else {
      formErrors.email = '';
    }

    // Validate subject
    if (!formData.subject) {
      formErrors.subject = 'Subject is required.';
      isValid = false;
    } else {
      formErrors.subject = '';
    }

    // Validate message
    if (!formData.message) {
      formErrors.message = 'Message is required.';
      isValid = false;
    } else {
      formErrors.message = '';
    }

    setErrors(formErrors);
    return isValid;
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    if (validateForm()) {
      // Create the payload with the form data
      const emailData = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
      };
  
      // Send email using EmailJS with the correct user ID
      emailjs
        .send(
          'service_mx6mt27',  // Replace with your service ID
          'template_zdstawg',  // Replace with your template ID
          emailData,           // Ensure data structure matches your EmailJS template
          'MKJgX-RCb1nC2kg9a'    // Replace with your Public Key (User ID)
        )
        .then(
          (response) => {
            console.log('Email sent successfully', response);
            setIsSubmitted(true);
            setFormData({
              name: '',
              email: '',
              subject: '',
              message: '',
            });
          },
          (error) => {
            console.error('Failed to send email', error);
            alert('Something went wrong. Please try again later.');
          }
        );
    }
  };
  
  
  return (
    <div className="container mx-auto p-6">
        <Heading title='Contact Form ' description={''} keywords={''} />
      <h1 className="text-3xl font-bold text-center mb-6">Contact Us</h1>

      {isSubmitted && (
        <div className="bg-green-200 text-green-800 p-4 rounded-lg mb-6">
          Thank you for your message! We will get back to you shortly.
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 mt-1 border border-gray-300 rounded-lg"
            placeholder="Your Name"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 mt-1 border border-gray-300 rounded-lg"
            placeholder="Your Email"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full p-3 mt-1 border border-gray-300 rounded-lg"
            placeholder="Subject"
          />
          {errors.subject && <p className="text-red-500 text-sm">{errors.subject}</p>}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-3 mt-1 border border-gray-300 rounded-lg"
            placeholder="Your Message"
            rows={4}
          />
          {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
