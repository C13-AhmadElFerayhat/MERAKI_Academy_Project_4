import React, { useState, useRef }  from "react";
import emailjs from '@emailjs/browser';

const Contact = () => {
    const form = useRef();

    const sendEmail = (e) => {
      e.preventDefault();
  
      emailjs
        .sendForm('service_f78ae9q', 'template_tnfow1b', form.current, {
          publicKey: 'CSaSObiJO2PnRFSnf',
        })
        .then(
          () => {
            console.log('SUCCESS!');
          },
          (error) => {
            console.log('FAILED...', error.text);
          },
        );
    };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-cyan-500 dark:bg-gradient-to-br dark:from-sky-600 dark:to-teal-900 bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text p-6 sm:p-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">Contact Us</h1>
        <form  ref={form} onSubmit={sendEmail} className="space-y-4">
          <input
            type="text"
            name="user_name"
            placeholder="Your Name"
            className="w-full px-4 py-2 border rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
            required
          />
          <input
            type="email"
            name="user_email"
            placeholder="Your Email"
            className="w-full px-4 py-2 border rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            className="w-full px-4 py-2 border rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
            rows="6"
            required
          ></textarea>
          <button
            type="submit"
            value="Send"
            className="bg-light-primary dark:bg-dark-primary text-light-text dark:text-dark-text hover:bg-dark-primary dark:hover:bg-light-primary px-6 py-2 rounded-lg"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
